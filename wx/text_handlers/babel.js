export const help = 'babel 文本翻译'

const handlers = []

handlers.push(async (ctx, next) => {
    const context = ctx.payload.content || ''
    if (!/^babel/i.test(context)) {
        return next()
    }
    const content = context.substring('babel'.length, context.length).trim()
    if (!content) {
        ctx.text('翻译内容缺失')
        return
    }
    ctx.text('nano看不懂：' + content)
})

export default handlers