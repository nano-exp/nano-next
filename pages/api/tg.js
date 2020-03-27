import { handle } from '../../tg'

export default async (req, res) => {
    const request = req || ({})
    const reply = await handle(request)

    res.send(reply)
}
