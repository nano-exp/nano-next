import crypto from 'crypto'

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

export function handle(request) {
    console.table(request)
    return request
}
