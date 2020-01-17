import qs from 'querystring'
import axios from 'axios'
import { IMAGE_API_KEY, IMAGE_SECRET_KEY } from '../../secrets'

const ACCESS_TOKEN_API = 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&'

export async function issueAccessToken({ clientId, clientSecret }) {
    const options = {
        client_id: clientId,
        client_secret: clientSecret,
    }
    const response = await axios.request({
        url: ACCESS_TOKEN_API + qs.stringify(options),
        method: 'POST'
    })
    if (!response.data) {
        console.error('Issue access token error')
    }
    return response.data.access_token
}

/**
 * use api key and secret refresh access token
 */
export function refreshAccessTokenIfRequired(errorCode) {
    // https://ai.baidu.com/ai-doc/IMAGERECOGNITION/Lk3bcxeoc
    if (![110, 111].includes(errorCode)) {
        return
    }

    ;(async function () {
        const accessToken = await issueAccessToken({
            clientId: IMAGE_API_KEY,
            clientSecret: IMAGE_SECRET_KEY,
        })
        // update now.sh secrets

    })()
}
