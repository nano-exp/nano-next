import crypto from 'crypto'
import { containsChinese } from '../../utils/i18n'
import { FANYI_APP_ID, FANYI_SECRET_KEY } from '../../secrets'

const FANYI_API = 'https://fanyi-api.baidu.com/api/trans/vip/translate'

function assure(content) {
    if (containsChinese(content)) {
        return {
            from: 'zh',
            to: 'en',
        }
    }
    return {
        from: 'en',
        to: 'zh',
    }
}

export async function translate({ content, from, to }) {
    if (!from || !to) {
        const options = assure(content)
        from = options.from
        to = options.to
    }
    const salt = new Date().getTime()
    const sign = crypto.createHash('md5')
        .update(FANYI_APP_ID + content + salt + FANYI_SECRET_KEY, 'utf8')
        .digest('hex')

    const response = await fetch(FANYI_API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        data: new URLSearchParams({
            q: content,
            appid: FANYI_APP_ID,
            salt,
            from,
            to,
            sign,
        }),
    })
    const data = await response.json()
    if (!data) {
        return '翻译结果为空'
    }
    if (!data.trans_result) {
        console.error('翻译异常', data)
        return '翻译异常：' + data.error_msg || ''
    }
    if (!data.trans_result.length) {
        return ''
    }
    const results = data.trans_result
    return results.map(it => it.dst).join('\n')
}
