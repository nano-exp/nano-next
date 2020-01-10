function e(key) {
    return process.env[key] || ''
}

// wx
export const WX_TOKEN = e('NANO_WX_TOKEN')

// baidu
export const BAIDU_ACCESS_TOKEN = e('NANO_BAIDU_ACCESS_TOKEN')

export const BAIDU_API_KEY = e('NANO_BAIDU_API_KEY')
export const BAIDU_SECRET_KEY = e('NANO_BAIDU_SECRET_KEY')

// now.sh
export const NOW_TOKEN = e('NANO_NOW_TOKEN')
