import axios from 'axios'
import qs from "querystring"
import crypto from 'crypto'
import { containsChinese } from '../../utils/i18n'
import { FANYI_APP_ID, FANYI_SECRET_KEY } from '../../secrets'

const FANYI_API = 'https://fanyi-api.baidu.com/api/trans/vip/translate'

function assure(content) {
    if (containsChinese(content)) {
        return {
            from: 'zh',
            to: 'en',
        }
    }
    return {
        from: 'en',
        to: 'zh',
    }
}

export async function translate({ content, from, to }) {
    if (!from || !to) {
        const options = assure(content)
        from = options.from
        to = options.to
    }
    const salt = new Date().getTime()
    const sign = crypto.createHash('md5')
        .update(FANYI_APP_ID + content + salt + FANYI_SECRET_KEY, 'utf8')
        .digest('hex')

    const response = await axios.request({
        url: FANYI_API,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: qs.stringify({
            q: content,
            appid: FANYI_APP_ID,
            salt,
            from,
            to,
            sign,
        }),
    })
    if (!response.data) {
        return '翻译结果为空'
    }
    if (!response.data.trans_result) {
        console.error('翻译异常', response.data)
        return '翻译异常：' + response.data.error_msg || ''
    }
    if (!response.data.trans_result.length) {
        return ''
    }
    const t = response.data.trans_result[0]
    return t.dst
}
