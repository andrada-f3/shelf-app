const CACHE = "shelf-v2";
const SHELL = [
  "./index.html",
  "./manifest.json",
  "./icon.svg",
  "https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js",
  "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth-compat.js",
  "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore-compat.js"
];

self.addEventListener('install', e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).catch(()=>{}));
  self.skipWaiting();
});

self.addEventListener('activate', e=>{
  e.waitUntil(
    caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
  );
  self.clients.claim();
});

// Network-first, so live data and fresh code always win when online.
// Falls back to whatever's cached when offline, and to the app shell
// for page navigations so the interface still opens without a connection.
self.addEventListener('fetch', e=>{
  if(e.request.method !== 'GET') return;
  const isNavigation = e.request.mode === 'navigate';

  e.respondWith(
    fetch(e.request).then(res=>{
      if(res && res.status === 200){
        const copy = res.clone();
        caches.open(CACHE).then(c=>c.put(e.request, copy)).catch(()=>{});
      }
      return res;
    }).catch(()=>
      caches.match(e.request).then(cached=>{
        if(cached) return cached;
        if(isNavigation) return caches.match('./index.html');
        return new Response('', {status: 504, statusText: 'Offline'});
      })
    )
  );
});
