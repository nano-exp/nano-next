const cacheStorageKey = 'nano-pwa'

const cacheList = [
    '/',
    'pwa.html',
    "icon.png"
]

self.addEventListener('install', ev => {
    ev.waitUntil(
        caches.open(cacheStorageKey)
            .then(cache => cache.addAll(cacheList))
            .then(() => self.skipWaiting())
    )
})

self.addEventListener('fetch', function (ev) {
    ev.respondWith(
        caches.match(ev.request).then(function (response) {
            if (response != null) {
                return response
            }
            return fetch(ev.request.url)
        })
    )
})

self.addEventListener('activate', function (ev) {
    ev.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(cacheNames.map(name => {
                if (name !== cacheStorageKey) {
                    return caches.delete(name)
                }
            }))
        }).then(() => {
            return self.clients.claim()
        })
    )
})
