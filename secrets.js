function e(key) {
    return process.env[key] || ''
}

// wx
export const WX_TOKEN = e('NANO_WX_TOKEN')

// baidu image
export const IMAGE_ACCESS_TOKEN = e('NANO_IMAGE_ACCESS_TOKEN')

export const IMAGE_API_KEY = e('NANO_IMAGE_API_KEY')
export const IMAGE_SECRET_KEY = e('NANO_IMAGE_API_KEY')

// baidu fanyi
export const FANYI_APP_ID = e('NANO_FANYI_APP_ID')
export const FANYI_SECRET_KEY = e('NANO_FANYI_SECRET_KEY')

// now.sh
export const NOW_TOKEN = e('NANO_NOW_TOKEN')
