import wiki from '../../utils/wiki_extracts'

export default async (req, res) => {
    if (req.query['wiki']) {
        res.send(await wiki(req.query['wiki']))
        return
    }
    res.end('hi')
}
