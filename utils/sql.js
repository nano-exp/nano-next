const COMMON_SQL_KEYWORDS = [
    'SELECT', 'FROM', 'USE', 'AS',
    'INNER', 'JOIN', 'ON', 'AND',
    'OR', 'WHERE', 'HAVING', 'ORDER',
    'BY', 'LEFT', 'GROUP'
]

/**
 * 常见SQL的关键词大写
 */
export function sqlKeywordsToUpperCase(sql) {
    if (!sql) {
        return ''
    }
    let wordStart = 0
    sql = sql.replace(/\s/g, ' ')
    while (sql.includes('  ')) {
        sql = sql.replace('  ', ' ')
    }
    const split = sql.split(' ')
    for (let i = 0; i < split.length; i++) {
        const token = split[i].toUpperCase()
        if (COMMON_SQL_KEYWORDS.includes(token)) {
            split[i] = token
        }
    }
    return split.join(' ')
}
