const handlers = []

handlers.push(async (ctx, next) => {
    const context = ctx.payload.content || ''
    if (!/^iot/i.test(context)) {
        return next()
    }
    const command = context.substring('iot'.length, context.length).trim()
    if (!command) {
        ctx.text('指令缺失')
        return
    }
    const expression = command.split('.')
    if (!expression[0] || !expression[1]) {
        ctx.text('非法指令')
        return
    }
    ctx.text('nano没有找到该设备：' + expression[0])
})

export const help = 'iot\t[指令]\t控制智能设备'
export default handlers
