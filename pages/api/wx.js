import { parseStringPromise, Builder } from 'xml2js'
import { hi, handle } from '../../services/ws_service'

const xmlBuilder = new Builder({ cdata: true })

export default async (req, res) => {
    try {
        switch (req.method) {
            case 'GET':
                res.send(hi(req.query))
                break
            case 'POST':
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
