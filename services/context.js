// 1 hour
const channel = new ExpiryMap(60 * 60 * 1000)

export function buildContext(request) {
    if (!request || !request.xml) {
        throw new Error('Illegal request')
    }

    function getValue(key) {
        const val = request.xml[key]
        return val && val[0]
    }

    const internalContext = { reply: '' }

    const payload = {
        messageId: getValue('MsgId'),
        messageType: getValue('MsgType'),
        fromUserName: getValue('FromUserName'),
        toUserName: getValue('ToUserName'),
        content: getValue('Content'),
        pictureUrl: getValue('PicUrl'),
        createTime: getValue('CreateTime'),
        mediaId: getValue('MediaId'),
    }

    return {
        payload,
        channel,
        text(content) {
            internalContext.reply = {
                xml: {
                    FromUserName: payload.toUserName,
                    ToUserName: payload.fromUserName,
                    CreateTime: Math.trunc(new Date().getTime() / 1000),
                    MsgType: 'text',
                    Content: content,
                },
            }
        },
        reply() {
            return internalContext.reply
        }
    }
}
