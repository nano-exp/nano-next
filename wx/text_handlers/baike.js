export const help = 'baike 百度百科'

const handlers = []

handlers.push(async (ctx, next) => {
    const context = ctx.payload.content || ''
    if (!/^baike/i.test(context)) {
        return next()
    }
    const content = context.substring('baike'.length, context.length).trim()

    if (!content) {
        ctx.text('关键词缺失')
        return
    }
    const description = ''

    const result = description
        + 'https://baike.baidu.com/item/'
        + encodeURIComponent(content)
    ctx.text(result)
})

export default handlers
