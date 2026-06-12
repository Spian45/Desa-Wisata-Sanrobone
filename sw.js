// Service worker sederhana untuk Desa Wisata Sanrobone (PWA installable + offline dasar)
const CACHE = "sanrobone-v3";
const ASET_INTI = [
  "index.html",
  "style.css",
  "javascript.js",
  "info-desa.html",
  "detail-potensi.html",
  "akomodasi-detail.html",
  "amenitas-detail.html",
  "souvenir-detail.html",
  "favicon.svg",
  "manifest.json",
];

// Pasang: simpan aset inti ke cache.
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ASET_INTI)).catch(() => {})
  );
  self.skipWaiting();
});

// Aktif: bersihkan cache versi lama.
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((kunci) =>
        Promise.all(kunci.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
      )
  );
  self.clients.claim();
});

// Ambil: jaringan dulu, jatuh ke cache bila offline (khusus permintaan GET).
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    fetch(event.request)
      .then((resp) => {
        const salinan = resp.clone();
        caches.open(CACHE).then((cache) => cache.put(event.request, salinan)).catch(() => {});
        return resp;
      })
      .catch(() => caches.match(event.request))
  );
});
