import rules from './rules'
import wiki, { help as wikiHelp } from './wiki'
import google, { help as googleHelp } from './google'
import babel, { help as babelHelp } from './babel'
import plant, { help as plantHelp } from './plant'
import iot, { help as iotHelp } from './iot'
import base64, { help as base64Help } from './base64'
import eval, { help as evalHelp } from './eval'

/* text handlers */
const handlers = [
    ...rules,
    ...base64,
    ...wiki,
    ...google,
    ...babel,
    ...plant,
    ...iot,
    ...eval,
]

// eventually
handlers.push((ctx, next) => {
    const help = [
        '试试下列命令让nano帮你吧\n',
        base64Help,
        wikiHelp,
        googleHelp,
        babelHelp,
        plantHelp,
        iotHelp,
        evalHelp,
    ]
    ctx.text(help.join('\n'))
})

export default handlers
