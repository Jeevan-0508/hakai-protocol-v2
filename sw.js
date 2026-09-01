/* ============================================================
   HAKAI PROTOCOL — Service Worker
   Caches all assets for full offline play
   ============================================================ */
const CACHE = 'hakai-v2.0';
const ASSETS = [
  './',
  './index.html',
  './engine.js',
  './style.css',
  './dev_panel.js',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './favicon.ico',
  /* creatures */
  './goblin_scout.png','./pack_wolf.png','./hobgoblin_chief.png',
  './direwolf_alpha.png','./lizardman_shaman.png','./cryptid_stalker.png',
  './insectoid_general.png','./elven_shadowblade.png','./vampire_lord.png',
  './demon_knight.png','./archangel.png','./primordial_demon.png',
  './elder_direwolf.png','./void_cryptid.png',
  /* bosses */
  './boss_rift_crawler.png','./boss_kragath.png','./boss_nyx.png',
  './boss_void_titan.png','./boss_protocol.png',
  /* weapons */
  './mjolnir.png','./excalibur.png','./void_sword.png',
  './staff_of_wisdom.png','./demon_staff.png','./neil_bow.png',
  './trishul.png','./gauntlets.png','./cloak_of_shadow.png',
  /* characters + bg */
  './striker_jk.png','./cath_gems.png','./hakai_world.png','./Hakaiworld-2.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(res => {
        if (!res || res.status !== 200 || res.type === 'opaque') return res;
        const clone = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
        return res;
      }).catch(() => caches.match('./index.html'));
    })
  );
});
