import axios from 'axios'

export default async function url2base64(url) {
    const response = await axios.request({
        url: new URL(url).toString(),
        method: 'GET',
        responseType: 'arraybuffer'
    })
    return Buffer.from(response.data, 'binary').toString('base64')
}
