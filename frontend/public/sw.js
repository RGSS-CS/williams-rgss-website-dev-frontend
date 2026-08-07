const CACHE = "v1";

const OFFLINE_URL = "/offline.html";

const ASSETS = [
    OFFLINE_URL,
    "/favicon.ico",
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE).then(cache => cache.addAll(ASSETS))
    );

    self.skipWaiting();
});

self.addEventListener("activate", event => {
    event.waitUntil(clients.claim());
});

self.addEventListener("fetch", event => {

    if (event.request.mode !== "navigate") {
        return;
    }

    event.respondWith(
        fetch(event.request).catch(async () => {
            const cache = await caches.open(CACHE);
            return cache.match(OFFLINE_URL);
        })
    );

});