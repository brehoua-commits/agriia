# AgriIA — Cultive juste

A mobile-first web app that helps a landholder assess a plot's agronomic
potential and keep track of the paperwork that comes with it: crop
compatibility scoring, environmental risk, a profitability estimate, land
title type, and certification progress (Bio, HVE, USDA).

> **Note on language:** code comments are in English for readability during
> due diligence / codebase review; UI copy, variable and function names are
> in French (the product's working language and target market — mainland
> France and French overseas territories).

---

## What it does

**Diagnostic** — set a location (search, GPS, or drawn/imported on the map),
enter basic soil data (pH, texture, depth), and the app scores all 41 crops
in its database against that plot's climate (via the Open-Meteo API) and
soil profile. Results show:
- A "hero" card for the best match, with its single most limiting factor
  (temperature, rainfall, pH, or texture) and a visual comparison against
  the ideal range.
- A ranked list for the rest — nothing is hidden, including low scores.
- An explicit warning for frost-sensitive "conditional acclimation" crops
  (e.g. avocado, kiwi) that require specific infrastructure in mainland
  France.

**My Fields** — a local record book for each plot: name, land title type
(with a France + Alsace-Moselle regional exception + generic international
fallback), declared irrigation/shelter infrastructure, an approximate
available water capacity indicator, and a certification tracker (Bio / HVE /
USDA) with a progress ring.

**Map & Import** — draw a polygon directly on the map or import a
GeoJSON/KML file to compute a plot's surface area.

**Subscription** — Standard (free) / Premium (19€/mo) / Max (39€/mo),
simulated locally (no payment processing yet). A short onboarding
personalizes the dashboard for one of four user profiles (new landholder,
family operation in structuring, quality/certification-focused, or
multi-plot manager).

**PDF report** — an in-app preview screen (light "paper" theme, deliberately
distinct from the app's dark UI) shows the report before it's generated,
then exports a real PDF via jsPDF + html2canvas. Content scales with tier:
Premium gets a summary, field sheet, compatibility diagnostic, risk score,
and technical report; Max adds a profitability estimate and a regional
market context section.

### Not yet built (already shown in-app as "in development")
AI-based disease diagnosis from a photo, satellite NDVI imagery, advanced
climate/regulatory-compliance/market parameters, and multi-device cloud
sync. These are visible in the UI (with a distinct "structurally
unavailable for this crop" state where relevant) rather than hidden, so
users know what's coming versus what will never apply to their case.

---

## Tech stack

- **No build step.** Everything — markup, styles, and logic — lives in a
  single `index.html` file (vanilla JS, CSS custom properties).
- **Font:** Manrope (Google Fonts).
- **Mapping:** Leaflet + Leaflet-draw, togeojson (GeoJSON/KML import),
  Turf.js (geometry/area calculations).
- **PDF export:** jsPDF + html2canvas (the latter only for capturing the
  map image; the rest of the PDF is native jsPDF text).
- **Data sources:** Open-Meteo (climate), soil inputs are user-declared.
  Agronomic thresholds for the 41-crop database, yield/price reference
  ranges, and a few other estimates are Lead Dev approximations pending
  validation by the Data/Agronomy team — each is flagged with a comment at
  its definition in `index.html`.
- **PWA:** `manifest.json` + `sw.js` for installability and an offline app
  shell.
- **Storage:** `localStorage` only. No backend, no user accounts — this is
  the deliberate Phase 1 MVP scope, not an oversight. It's disclosed to
  users in-app (FAQ, and as a roadmap item on the pricing screen), and data
  is tied to a single device/browser until a sync backend is built.

## Design system

Flat, monochrome-leaning v2 design language: a 7-token color palette
(`--fond`, `--carbone`, `--os`, `--gris-doux`, `--chlorophylle`, `--argile`,
`--brique`), Manrope as the single typeface, no glass-morphism / blur /
colored glow (a deliberate pivot from an earlier v1 dark-glass theme).
Tokens are defined in `:root` at the top of the `<style>` block in
`index.html`.

## Project structure

```
index.html              the entire app (styles + markup + logic)
manifest.json            PWA manifest (name, theme colors, icons)
sw.js                     service worker (offline shell)
apple-touch-icon.png      iOS home-screen icon
icon-192.png              PWA icon (192x192)
icon-512.png              PWA icon (512x512)
icon-512-maskable.png     PWA icon (512x512, maskable/adaptive)
LICENSE
README.md
```

## Running locally

Static files only — no install, no build:

```bash
npx serve .
```

Opening `index.html` directly via `file://` works for most of the UI, but
the service worker (and therefore full PWA/offline behavior) requires the
app to be served over `http://` or `https://`.

## Deployment

Currently deployed as a static site (e.g. GitHub Pages). Any static host
works — just publish the files as-is, no build pipeline required.
