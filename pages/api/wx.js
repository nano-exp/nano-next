import { parseStringPromise, Builder } from 'xml2js'
import { hi, handle, verify } from '../../wx'

const xmlBuilder = new Builder({ cdata: true })

function isProduction() {
    return process.env.NODE_ENV === 'production'
}

export default async (req, res) => {
    try {
        switch (req.method) {
            case 'GET':
                res.send(hi(req.query))
                break
            case 'POST':
                if (isProduction() && !verify(req.query)) {
                    break
                }
                const request = await parseStringPromise(req.body)
                const reply = await handle(request)
                res.setHeader('Content-Type', 'text/xml')
                res.send(xmlBuilder.buildObject(reply))
                break
            default:
                res.send('')
        }
    } catch (error) {
        console.error(error)
        res.status(400).send('')
    }
}
