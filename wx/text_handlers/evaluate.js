export const help = 'eval 解释器'

const handlers = []

function isArithmeticExpression(s) {
    return /^[0-9.+\-*\/ ]+$/.test(s)
}

function doEval(expression) {
    try {
        return eval(expression)
    } catch (error) {
        return error.message || String(error)
    }
}

handlers.push(async (ctx, next) => {
    const context = ctx.payload.content || ''
    if (!/^eval/i.test(context)) {
        return next()
    }
    const content = context.substring('eval'.length, context.length).trim()

    if (!content) {
        ctx.text('表达式缺失')
        return
    }
    if (!isArithmeticExpression(content)) {
        ctx.text('非法表达式')
        return
    }
    const result = doEval(content)
    ctx.text(result)
})

export default handlers
