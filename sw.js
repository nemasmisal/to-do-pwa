const staticCashName = "to-do-static-v2";
const dynamicCacheName = "to-do-dynamic-v1";
const cacheSizeLimit = 20;
const assets = [
  "/",
  "/index.html",
  "/pages/fallback.html",
  "/js/app.js",
  "/js/ui.js",
  "/js/materialize.min.js",
  "/css/styles.css",
  "/css/materialize.min.css",
  "/img/task.png",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "https://fonts.gstatic.com/s/materialicons/v70/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2",
];

const limitCacheSize = (cacheName, maxSize) => {
  caches.open(cacheName).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.length > maxSize) {
        cache.delete(keys[0]).then(() => limitCacheSize(cacheName, maxSize)); //in case we are still over the size
      }
    });
  });
};

self.addEventListener("install", (evt) => {
  evt.waitUntil(
    caches.open(staticCashName).then((cache) => {
      cache.addAll(assets);
    })
  );
});
self.addEventListener("activate", (evt) => {
  evt.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== staticCashName && key !== dynamicCacheName)
          .map((key) => caches.delete(key))
      );
    })
  );
});
self.addEventListener("fetch", (evt) => {
  evt.respondWith(
    caches
      .match(evt.request)
      .then((cacheRes) => {
        return (
          cacheRes ||
          fetch(evt.request).then((res) => {
           return caches.open(dynamicCacheName).then((cache) => {
              cache.put(evt.request.url, res.clone());
              limitCacheSize(dynamicCacheName, cacheSizeLimit);
              return res;
            });
          })
        );
      })
      .catch(() => {
        if (evt.request.url.indexOf(".html") > -1) {
          return caches.match("/pages/fallback.html");
        }
      })
  );
});
