export function containsChinese(text) {
    return /.*[\u4e00-\u9fa5]+.*$/.test(text)
}
