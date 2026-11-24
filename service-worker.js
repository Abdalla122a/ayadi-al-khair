const CACHE='ayadi-khair-v15';
const ASSETS=['./','./index.html','./manifest.webmanifest','./assets/committee-logo.png','./assets/school-logo.png','./assets/signature.png','./assets/icon-192.png','./assets/icon-512.png','./assets/icon-maskable-512.png','./assets/apple-touch-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>Promise.all(ASSETS.map(a=>c.add(a).catch(()=>null)))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const req=e.request,url=new URL(req.url);
  if(req.method!=='GET'||url.origin!==self.location.origin)return; // Supabase and other origins go straight to the network
  const isPage=req.mode==='navigate'||url.pathname.endsWith('.html')||url.pathname.endsWith('/');
  if(isPage){ // network first so updates always arrive; cache only as offline fallback
    e.respondWith(fetch(req).then(r=>{if(r.ok){const c=r.clone();caches.open(CACHE).then(x=>x.put(req,c))}return r}).catch(()=>caches.match(req).then(h=>h||caches.match('./index.html'))));
    return;
  }
  e.respondWith(caches.match(req).then(hit=>{const net=fetch(req).then(r=>{if(r.ok){const c=r.clone();caches.open(CACHE).then(x=>x.put(req,c))}return r}).catch(()=>hit);return hit||net}));
});
