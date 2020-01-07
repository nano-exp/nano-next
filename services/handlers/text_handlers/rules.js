const rules = [{
    pattern: /^hi$/i,
    reply: 'hi，你好哇！'
}, {
    pattern: /^在吗？?$/,
    reply: 'nano在的',
}, {
    pattern: /^你是谁？?$/,
    reply: '我是nano呀',
}, {
    pattern: /^【收到不支持的消息类型，暂无法显示】$/,
    reply: 'nano不支持这个消息类型哦',
}]

const handlers = []

handlers.push((ctx, next) => {
    for (const rule of rules) {
        if (rule.pattern.test(ctx.payload.content)) {
            ctx.text(rule.reply)
            return
        }
    }
    return next()
})

export default handlers
