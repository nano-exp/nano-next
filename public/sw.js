const pwaVersion = '0.1.0'

const cacheStorageKey = `nano-pwa-${pwaVersion}`

const cacheList = [
    '/',
    'pwa.html',
    'icon.png',
    'favicon.ico',
]

self.addEventListener('install', ev => {
    ev.waitUntil((async () => {
        const cache = await caches.open(cacheStorageKey)
        await cache.addAll(cacheList)
        await self.skipWaiting()
    })())
})

self.addEventListener('fetch', function (ev) {
    ev.respondWith((async () => {
        const response = await caches.match(ev.request)
        if (response) {
            return response
        }
        return fetch(ev.request.url)
    })())
})

self.addEventListener('activate', function (ev) {
    ev.waitUntil((async () => {
        const cacheNames = await caches.keys()
        await Promise.all(cacheNames.map(name => {
            if (name !== cacheStorageKey) {
                return caches.delete(name)
            }
        }))
        await self.clients.claim()
    })())
})
