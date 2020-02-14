export const help = 'base64 Base64编码'

function isBase64String(s) {
    return /^[a-zA-Z0-9+\/]+={0,2}$/.test(s)
}

function hasInvalidCharacter(s = '') {
    const regex = /[\0-\x08\x0B\f\x0E-\x1F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/
    return !!s.match(regex)
}

const handlers = []

handlers.push(async (ctx, next) => {
    const context = ctx.payload.content || ''
    if (!/^base64/i.test(context)) {
        return next()
    }
    let content = context.substring('base64'.length, context.length).trim()
    let decodeFlag = false
    if (content.startsWith('-d')) {
        decodeFlag = true
        content = content.substring('-d'.length, context.length).trim()
    }

    if (!content) {
        ctx.text('编码内容缺失')
        return
    }

    if (decodeFlag) {
        if (!isBase64String(content)) {
            ctx.text('非法Base64编码')
            return
        }
        const result = Buffer.from(content, 'base64').toString('utf8')
        if (hasInvalidCharacter(result)) {
            ctx.text('解码Base64编码失败')
            return
        }
        ctx.text(result || '编码内容缺失')
        return
    }

    const result = Buffer.from(content, 'utf8').toString('base64')
    ctx.text(result || '编码内容缺失')
})

export default handlers
