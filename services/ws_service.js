import crypto from 'crypto'

import { buildContext } from './context'
import compose from '../utils/compose'
import textMessageHandlers from './handlers/text_handlers'
import imageMessageHandlers from './handlers/image_handlers'

const token = 'nano'

export function hi(request) {
    const { signature, echostr, timestamp, nonce } = request

    const joined = [token, timestamp, nonce].sort().join('')
    const digest = crypto.createHash('sha1')
        .update(joined)
        .digest('hex')

    if (digest === signature) {
        return echostr
    }
    return ''
}

export async function handle(request) {
    const ctx = buildContext(request)
    switch (ctx.payload.messageType) {
        // 文本
        case 'text':
            return compose(textMessageHandlers)(ctx)
        // 图片
        case 'image':
            return compose(imageMessageHandlers)(ctx)
        default:
            ctx.text('怎么办呢？')
    }
    return ctx.reply()
}
