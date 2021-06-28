import qs from 'querystring'

const IMAGE_ACCESS_TOKEN = ''

const PLANT_API = 'https://aip.baidubce.com/rest/2.0/image-classify/v1/plant?access_token='

export async function plantClient(image) {
    const response = await fetch(PLANT_API + IMAGE_ACCESS_TOKEN, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: qs.stringify({
            image, baike_num: 1
        }),
    })
    return await response.json()
}
