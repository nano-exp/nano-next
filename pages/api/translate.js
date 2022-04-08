const API = 'https://nanometer.herokuapp.com/api/baidu/translate'

export default async function translate(req, res) {
    try {
        const q = new URLSearchParams(req.query)
        const response = await fetch(`${API}?${q.toString()}`, {
            method: req.method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body),
        })
        const result = await response.json()
        res.status(200).send(result)
    } catch (err) {
        res.status(400).send(err.message)
    }
}