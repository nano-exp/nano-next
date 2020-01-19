import crypto from 'crypto'

import { WX_TOKEN } from '../secrets'
import { buildContext } from './context'
import compose from '../utils/compose'
import textMessageHandlers from './text_handlers'
import imageMessageHandlers from './image_handlers'

export function verify(query) {
    const { signature, timestamp, nonce } = query
    const joined = [WX_TOKEN, timestamp, nonce].sort().join('')
    const digest = crypto.createHash('sha1')
        .update(joined)
        .digest('hex')
    return digest === signature
}

export function hi(request) {
    if(verify(request)){
        return request.echostr
    }
    return ''
}

export async function handle(request) {
    const ctx = buildContext(request)
    switch (ctx.payload.messageType) {
        // 文本
        case 'text':
            await compose(textMessageHandlers)(ctx)
            break
        // 图片
        case 'image':
            await compose(imageMessageHandlers)(ctx)
            break
        default:
            ctx.text('怎么办呢？')
    }
    return ctx.reply()
}
