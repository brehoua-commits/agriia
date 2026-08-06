const CACHE_NAME = 'agriia-v2';
const FICHIERS_A_METTRE_EN_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './icon-512-maskable.png',
  './apple-touch-icon.png'
];

// Installation : on met en cache la coquille de l'app
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FICHIERS_A_METTRE_EN_CACHE))
  );
  self.skipWaiting();
});

// Activation : on nettoie les anciens caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((noms) =>
      Promise.all(noms.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n)))
    )
  );
  self.clients.claim();
});

// Stratégie : cache d'abord pour la coquille de l'app, réseau pour le reste
// (les appels API météo/sol/carte ont besoin d'internet et ne sont pas mis en cache)
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  const estFichierApp = url.origin === self.location.origin;

  if (!estFichierApp) return; // laisse passer les appels vers les APIs externes normalement

  event.respondWith(
    caches.match(event.request).then((reponseEnCache) => {
      return reponseEnCache || fetch(event.request);
    })
  );
});
