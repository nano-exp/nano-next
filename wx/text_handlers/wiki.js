import { wikiExtracts } from '../../services/wiki'

export const help = 'wiki 查询维基百科词条'

const handlers = []

function parseOptions(parameters) {
    const options = {
        language: 'zh'
    }
    for (let i = 0; i < parameters.length; i++) {
        switch (parameters[i]) {
            case '-l':
            case '--language':
                options.language = parameters[++i]
                break
            default:
                options.keyword = parameters[i]
        }
    }
    return options
}

function checkOptions(options) {
    if (!options.keyword) {
        return '关键词缺失'
    }
    if (!['zh', 'en'].includes(options.language)) {
        return '非法语言选项'
    }
}

handlers.push(async (ctx, next) => {
    const context = ctx.payload.content || ''
    if (!/^wiki/i.test(context)) {
        return next()
    }
    const parameters = context.substring('wiki'.length, context.length)
        .split(' ').filter(it => it)
    const options = parseOptions(parameters)
    const message = checkOptions(options)
    if (message) {
        ctx.text(message)
        return
    }
    const wiki = await wikiExtracts(options.keyword)
    ctx.text(wiki)
})

export default handlers
