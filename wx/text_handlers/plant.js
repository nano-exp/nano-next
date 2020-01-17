import url2base64 from '../../utils/url2base64'
import { plantClient } from '../../services/baidu/image'

export const help = 'plant 植物识别'

const handlers = []

async function snap(pictureUrl) {
    try {
        const image = await url2base64(pictureUrl)
        const result = await plantClient(image)
        if (result['error_code']) {
            // refreshAccessTokenIfRequired(result.error_code)
            return '识别植物失败了：' + result.error_msg
        }
        const primary = result.result[0]
        if (primary.name === '非植物') {
            return 'nano觉得这个不是植物哦'
        }
        const wikiInfo = primary.baike_info
        let info = primary.name
        if (wikiInfo.description) {
            info += '\n' + wikiInfo.description
        }
        if (wikiInfo.baike_url) {
            info += '\n' + wikiInfo.baike_url
        }
        return info
    } catch (error) {
        console.error(error)
        return 'nano遇到了一些问题：' + error.message
    }
}

handlers.push(async (ctx, next) => {
    const context = ctx.payload.content || ''
    if (!/^plant/i.test(context)) {
        return next()
    }
    const pictureUrl = context.substring('plant'.length, context.length).trim()
    if (!pictureUrl) {
        ctx.text('图片地址缺失')
        return
    }
    ctx.text(await snap(pictureUrl))
})

export default handlers
