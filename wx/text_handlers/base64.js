export const help = 'base64 Base64编码'

function isBase64String(s) {
    return /^[a-zA-Z0-9+\/]+={0,2}$/.test(s)
}

const handlers = []

handlers.push(async (ctx, next) => {
    const context = ctx.payload.content || ''
    if (!/^base64/i.test(context)) {
        return next()
    }
    const content = context.substring('base64'.length, context.length).trim()

    if (!content) {
        ctx.text('编码内容缺失')
        return
    }

    let result
    if (isBase64String(content)) {
        result = Buffer.from(content, 'base64').toString('utf8')
    } else {
        result = Buffer.from(content, 'utf8').toString('base64')
    }
    ctx.text(result || '编码内容缺失')
})

export default handlers
