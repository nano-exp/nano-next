export default async function url2base64(url) {
    const response = await fetch({
        url: new URL(url).toString(),
        method: 'GET',
    })
    const data = await response.arrayBuffer()
    return Buffer.from(data, 'binary').toString('base64')
}
