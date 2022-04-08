import { parseStringPromise, Builder } from 'xml2js'
import { hi, handle, verify } from '../../wx'

const xmlBuilder = new Builder({ cdata: true })

function isProduction() {
    return process.env.NODE_ENV === 'production'
}

export default async function wx(req, res) {
    try {
        switch (req.method) {
            case 'GET':
                res.send(hi(req.query))
                return
            case 'POST':
                if (isProduction() && !verify(req.query)) {
                    res.status(400).send('Verified failed')
                    return
                }
                const request = await parseStringPromise(req.body)
                const reply = await handle(request)
                res.setHeader('Content-Type', 'text/xml')
                res.send(xmlBuilder.buildObject(reply))
                return
            default:
                res.send('')
        }
    } catch (error) {
        console.error(error)
        res.status(400).send(error && error.message || '')
    }
}
