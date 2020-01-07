import { channels } from './channels'

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
}, {
    pattern: /^nano?$/i,
    reply(ctx) {
        const content = []
        content.push('输入下列关键词让nano帮助你吧：')
        content.push(channels.map(c => c.name).join('\n'))
        const currentChannel = ctx.channel.get(ctx.payload.fromUserName)
        if (currentChannel) {
            content.push('\n当前频道：' + currentChannel)
        }
        return content.join('\n')
    }
}, {
    pattern: /^重置频道$/,
    reply(ctx) {
        ctx.channel.delete(ctx.payload.fromUserName)
        return '已重置'
    }
}]

const handlers = []

handlers.push((ctx, next) => {
    for (const rule of rules) {
        if (rule.pattern.test(ctx.payload.content)) {
            if (typeof rule.reply === 'string') {
                ctx.text(rule.reply)
            } else if (typeof rule.reply === 'function') {
                ctx.text(rule.reply(ctx))
            }
            return
        }
    }
    return next()
})

export default handlers
