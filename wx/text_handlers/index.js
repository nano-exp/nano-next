import rules from './rules'
import wiki, { help as wikiHelp } from './wiki'
import baike, { help as baikeHelp } from './baike'
import google, { help as googleHelp } from './google'
import babel, { help as babelHelp } from './babel'
import plant, { help as plantHelp } from './plant'
import iot, { help as iotHelp } from './iot'
import base64, { help as base64Help } from './base64'
import evaluate, { help as evaluateHelp } from './evaluate'
import sql, { help as sqlHelp } from './sql'

/* text handlers */
const handlers = [
    ...rules,
    ...base64,
    ...wiki,
    ...baike,
    ...google,
    ...babel,
    ...plant,
    ...iot,
    ...evaluate,
    ...sql,
]

// eventually
handlers.push((ctx, next) => {
    const help = [
        '试试下列命令让nano帮你吧\n',
        base64Help,
        wikiHelp,
        baikeHelp,
        googleHelp,
        babelHelp,
        plantHelp,
        iotHelp,
        evaluateHelp,
        sqlHelp,
    ]
    ctx.text(help.join('\n'))
})

export default handlers
