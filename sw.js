// sw.js (raíz)
// Service Worker simple para cache estático con scope en la raíz del proyecto

const CACHE_NAME = 'redimensionar-icono-v1';
const ASSETS = [
  'index.php',
  'css/styles.css',
  'js/darkmode.js',
  'js/lang.js',
  'js/resize.js',
  'js/manifest.js',
  'js/pwa.js',
  'manifest.json',
  'img/favicon-16x16.png',
  'img/favicon-32x32.png',
  'img/apple-touch-icon.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      for (const url of ASSETS) {
        try {
          const response = await fetch(url, { cache: 'no-cache' });
          if (response && response.ok) {
            await cache.put(url, response.clone());
          } else {
            console.warn('[SW] Recurso no cacheado (respuesta no OK):', url);
          }
        } catch (err) {
          console.warn('[SW] Recurso no cacheado (error al fetch):', url, err);
        }
      }
      return true;
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    ))
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  event.respondWith(
    caches.match(request).then(cached =>
      cached || fetch(request).then(response => {
        const respClone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(request, respClone));
        return response;
      }).catch(() => cached)
    )
  );
});
