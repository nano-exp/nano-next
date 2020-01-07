function e(key) {
    return process.env[key] || ''
}

// wx token
export const WX_TOKEN = e('NANO_WX_TOKEN')

// baidu access token
export const BAIDU_ACCESS_TOKEN = e('NANO_BAIDU_ACCESS_TOKEN')
