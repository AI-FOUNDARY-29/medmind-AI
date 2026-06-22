// MedMind AI — Service Worker (sw.js)
const CACHE_NAME = 'medmind-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/login.html',
  '/home.html',
  '/doctor.html',
  '/meds.html',
  '/mental.html',
  '/ai.html',
  '/profile.html',
  '/style.css',
  '/script.js',
  '/app.js',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  // Network first, fallback to cache
  e.respondWith(
    fetch(e.request)
      .then(res => {
        if (res && res.status === 200) {
          const clone = res.clone();
          caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
        }
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
