import qs from 'querystring'
import axios from 'axios'
import { BAIDU_API_KEY, BAIDU_SECRET_KEY } from '../../secrets'

/**
 * use api key and secret refresh access token
 */
export function refreshAccessTokenIfRequired(errorCode) {
    // https://ai.baidu.com/ai-doc/IMAGERECOGNITION/Lk3bcxeoc
    if (![110, 111].includes(errorCode)) {
        return
    }
    const options = {
        client_id: BAIDU_API_KEY,
        client_secret: BAIDU_SECRET_KEY,
    }
    const ACCESS_TOKEN_API = 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&'

    ;(async function () {
        const response = await axios.request({
            url: ACCESS_TOKEN_API + qs.stringify(options),
            method: 'POST'
        })
        if (!response.data) {
            console.error('Refresh access token error')
        }
        const accessToken = response.data.access_token
        // update now.sh secrets

    })()
}
