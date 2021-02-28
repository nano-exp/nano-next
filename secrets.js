function e(key) {
    return process.env[key] || ''
}

// wx
export const WX_TOKEN = e('NANO_WX_TOKEN')

// baidu fanyi
export const FANYI_APP_ID = e('NANO_FANYI_APP_ID')
export const FANYI_SECRET_KEY = e('NANO_FANYI_SECRET_KEY')
