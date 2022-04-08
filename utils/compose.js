export default function compose(middlewares) {
    if (!middlewares || !middlewares.length) {
        return () => undefined
    }
    return ctx => middlewares[0](ctx, () => compose(middlewares.slice(1))(ctx))
}
