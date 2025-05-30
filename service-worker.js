const CACHE_NAME = 'periodo-app-v1';
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/index1.html',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  // Añade aquí más archivos si tienes CSS, JS o imágenes extra
];

// Evento de instalación: cachea los recursos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Archivos cacheados');
        return cache.addAll(URLS_TO_CACHE);
      })
  );
});

// Evento de activación: limpieza de cachés antiguos (opcional)
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('Cache antigua eliminada:', cache);
            return caches.delete(cache);
          }
        })
      )
    )
  );
});

// Intercepta solicitudes y responde con caché o red
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
