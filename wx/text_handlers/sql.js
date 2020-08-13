import { sqlKeywordsToUpperCase } from '../../utils/sql'

export const help = 'sql SQL格式化'

const handlers = []

handlers.push(async (ctx, next) => {
    const context = ctx.payload.content || ''
    if (!(/^sql /i).test(context)) {
        return next()
    }
    const content = context.substring('sql'.length, context.length).trim()

    if (!content) {
        ctx.text('格式化内容缺失')
        return
    }

    const result = await sqlKeywordsToUpperCase(content)
    ctx.text(result || '格式化失败：' + content)
})

export default handlers
