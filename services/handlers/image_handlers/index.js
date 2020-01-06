import plant from './plant'

/* image handlers */
const handlers = []

handlers.push(...plant)

// eventually
handlers.push(async (ctx, next) => {
    ctx.text('很显然，这是一张图片')
})

export default handlers
