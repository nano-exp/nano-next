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
    ctx.text('nano没有找到该设备：' + command[0])
})

export const help = 'iot [指令] 控制智能设备'
export default handlers
