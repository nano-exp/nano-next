function e(key) {
    return process.env[key] || ''
}

// wx token
export const WX_TOKEN = e('NANO_WX_TOKEN')
