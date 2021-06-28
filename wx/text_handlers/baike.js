export const help = 'baike 百度百科'

const handlers = []

async function fetchDescription(url) {
    const response = await fetch(url)
    const data = await response.text()
    if (!data) {
        return ''
    }
    const matchResult = /<meta name="description" content="(.+)">/.exec(data)
    if (!matchResult) {
        return ''
    }
    return matchResult[1]
}


handlers.push(async (ctx, next) => {
    const context = ctx.payload.content || ''
    if (!(/^baike /i).test(context)) {
        return next()
    }
    const content = context.substring('baike'.length, context.length).trim()

    if (!content) {
        ctx.text('关键词缺失')
        return
    }

    const baikrUrl = 'https://baike.baidu.com/item/' + encodeURIComponent(content)
    const description = await fetchDescription(baikrUrl)
    if (!description) {
        ctx.text('nano没有找到：' + content)
        return
    }
    ctx.text(description + '\n' + baikrUrl)
})

export default handlers
