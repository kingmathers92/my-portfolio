const CACHE_NAME = "portfolio-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/static/js/main.chunk.js",
  "/static/js/0.chunk.js",
  "/static/js/bundle.js",
  "/static/css/main.chunk.css",
];

/* eslint-disable no-restricted-globals */
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch((error) => {
      console.error("Fetch failed, returning offline page", error);
      return caches.match("/offline.html"); // Fallback to an offline page or cached version
    })
  );
});
/* eslint-disable no-restricted-globals */
