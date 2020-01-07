import rules from './rules'
import wiki, { help as wikiHelp } from './wiki'
import google, { help as googleHelp } from './google'
import translate, { help as translateHelp } from './translate'
import plant, { help as plantHelp } from './plant'
import iot, { help as iotHelp } from './iot'

/* text handlers */
const handlers = []

handlers.push(...rules)
handlers.push(...wiki)
handlers.push(...google)
handlers.push(...plant)
handlers.push(...iot)

// eventually
handlers.push((ctx, next) => {
    const help = [
        '试试下列命令让nano帮你吧',
        wikiHelp,
        googleHelp,
        translateHelp,
        plantHelp,
        iotHelp,
    ]
    ctx.text(help.join('\n'))
})

export default handlers
