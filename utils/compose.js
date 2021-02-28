function noop() {
}

export default function compose(middlewares) {
    if (!middlewares || !middlewares.length) {
        return noop
    }
    return ctx => middlewares[0](ctx, () => compose(middlewares.slice(1))(ctx))
}
