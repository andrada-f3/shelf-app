const CACHE = "shelf-v1";
const SHELL = ["./index.html", "./manifest.json", "./icon.svg"];

self.addEventListener('install', e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', e=>{
  e.waitUntil(
    caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
  );
  self.clients.claim();
});

// Network-first for everything (so live data always wins when online),
// falling back to the cached app shell when offline.
self.addEventListener('fetch', e=>{
  if(e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request).catch(()=> caches.match(e.request).then(r=> r || caches.match('./index.html')))
  );
});
