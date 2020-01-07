/* image handlers */
const handlers = []

// picture url
handlers.push(async (ctx, next) => {
    ctx.text(ctx.payload.pictureUrl)

})

export default handlers
