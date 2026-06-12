# Desa Wisata Sanrobone — Website

A promotional website for **Desa Wisata Sanrobone**, a cultural, historical, and
religious tourism village in **Kabupaten Takalar, South Sulawesi, Indonesia**.
The site introduces visitors to the village's heritage (the former Kingdom of
Sanrobone), its attractions, homestays, amenities, and local souvenirs — and
lets them reserve a visit.

> _Situs web promosi untuk Desa Wisata Sanrobone, sebuah desa wisata budaya,
> sejarah, dan religi di Kabupaten Takalar, Sulawesi Selatan._

## What it's for

- **Promote the destination** — present the village's history, the three pillars
  (history, culture, religion), and its 14–18 heritage sites.
- **Showcase attractions** — Balla Lompoa (royal traditional house), the
  pyramid-shaped royal tombs, and the Baitul Maqdis Old Mosque.
- **Help visitors plan & book** — accommodation (community homestays), amenities,
  souvenirs/culinary, an interactive location map, and a reservation form that
  sends bookings via **WhatsApp or email**.

## Pages

| Page | Description |
|------|-------------|
| `index.html` | Home — profile, history, stats, potential, accessibility + map, accommodation, amenities, souvenirs, gallery, reviews, reservation. |
| `info-desa.html` | Village profile, six pillar villages, social & cultural summary, official sources. |
| `detail-potensi.html` | In-depth tourism potential (historical sites, homestays, souvenirs/culinary). |
| `akomodasi-detail.html` | Homestay details, photo gallery, facilities, assessment, reservation. |
| `amenitas-detail.html` | Facilities & amenities (food stalls, health center, ATM, mosque, access). |
| `souvenir-detail.html` | Souvenirs & traditional culinary products with prices. |

## Features

- 🌐 **Bilingual** — Indonesian/English toggle (remembers your choice).
- 📱 **Responsive** + **PWA** — installable, works offline (service worker).
- 🗺️ **Interactive map** with directions, 🔍 **lightbox** photo galleries.
- 📝 **Reservation form** → WhatsApp or email; ⭐ visitor reviews.
- ✨ Modern UI — scroll animations, frosted-glass navbar, reading-progress bar.

## Tech

Plain **HTML + CSS + vanilla JavaScript** — no framework and no build step.
Shared styles in `style.css`, shared scripts in `javascript.js`, images and the
hero video in `asset/`. Hosted on **GitHub Pages**.

## Run locally

It's fully static — just open `index.html` in a browser. For the service worker
and the language toggle to work properly, serve it over HTTP, e.g.:

```bash
# VS Code: use the "Live Server" extension, or:
python -m http.server 5500
# then open http://127.0.0.1:5500/index.html
```

## Contact

**Desa Wisata Sanrobone** · Dusun Sanrobone, Kec. Sanrobone, Kab. Takalar,
Sulawesi Selatan
📞 / WhatsApp: **082347764426** · ✉️ desasanrobone22@gmail.com
