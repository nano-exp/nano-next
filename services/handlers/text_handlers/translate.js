const handlers = []

handlers.push(async (ctx, next) => {
    const context = ctx.payload.content || ''
    if (!/^translate/i.test(context)) {
        return next()
    }
    const content = context.substring('translate'.length, context.length).trim()
    if (!content) {
        ctx.text('翻译内容缺失')
        return
    }
    ctx.text('nano看不懂：' + content)
})

export const help = 'translate\t[关键词]\t翻译文本'
export default handlers
