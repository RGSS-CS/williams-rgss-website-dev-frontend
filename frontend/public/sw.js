const CACHE = "v1";

const OFFLINE_URL = "/offline.html";

const ASSETS = [OFFLINE_URL];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(ASSETS)));

  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener("fetch", (event) => {
  if (event.request.mode !== "navigate") {
    return;
  }

  const showOfflinePage = async () => {
    const cache = await caches.open(CACHE);
    return cache.match(OFFLINE_URL);
  };

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        return response.status >= 500 ? showOfflinePage() : response;
      })
      .catch(showOfflinePage)
  );
});
