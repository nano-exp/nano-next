import channels from './channels'
import rules from './rules'

import wikiExtracts from '../../../utils/wiki_extracts'

/* text handlers */
const handlers  = []

handlers.push(...channels)
handlers.push(...rules)

// wiki
handlers.push(async (ctx, next) => {
    if (ctx.channel.get(ctx.payload.fromUserName) === '维基百科') {
        const wiki = await wikiExtracts(ctx.payload.content)
        ctx.text(wiki)
        return
    }
    return next()
})

// Google
handlers.push(async (ctx, next) => {
    if (ctx.channel.get(ctx.payload.fromUserName) === '谷歌搜索') {
        const keywords = ctx.payload.content
        let result = 'nano生成了搜索链接：' + keywords
        result += '\n' + 'https://www.google.com/search?q=' + encodeURIComponent(keywords)
        ctx.text(result)
        return
    }
    return next()
})

// echo eventually
handlers.push((ctx, next) => {
    ctx.text(ctx.payload.content)
})

export default handlers