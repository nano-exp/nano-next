import qs from 'querystring'
import axios from 'axios'

import { IMAGE_ACCESS_TOKEN } from '../../secrets'

const PLANT_API = 'https://aip.baidubce.com/rest/2.0/image-classify/v1/plant?access_token='

export async function plantClient(image) {
    const response = await axios.request({
        url: PLANT_API + IMAGE_ACCESS_TOKEN,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: qs.stringify({
            image, baike_num: 1
        }),
    })
    return response.data
}
