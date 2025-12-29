// Nama cache
const CACHE_NAME = "seatofu-v1";

// File yang dicache saat install
const ASSETS = [
  "./",
  "./index.html",
  "./css/style.css",
  "./js/app.js",
  "./images/seatofu-home.jpg"
];

// ===== INSTALL =====
self.addEventListener("install", (event) => {
  console.log("[SW] Installing...");
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log("[SW] Caching app shell");
        return cache.addAll(ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// ===== ACTIVATE =====
self.addEventListener("activate", (event) => {
  console.log("[SW] Activating...");
  event.waitUntil(
    caches.keys()
      .then((keys) => {
        return Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => {
              console.log("[SW] Removing old cache:", key);
              return caches.delete(key);
            })
        );
      })
      .then(() => self.clients.claim())
  );
});

// ===== FETCH =====
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((cached) => {
        if (cached) {
          return cached;
        }
        return fetch(event.request)
          .then((response) => {
            // Optional: cache new requests dynamically
            return caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, response.clone());
              return response;
            });
          })
          .catch(() => {
            // Optional: fallback kalau offline & request tidak ada di cache
            if (event.request.destination === "document") {
              return caches.match("./index.html");
            }
          });
      })
  );
});
