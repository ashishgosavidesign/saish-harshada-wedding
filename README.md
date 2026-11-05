# Saiish & Harshada — Wedding Invitation

## Phase 1 (current)

Minimal scroll invitation — **first view only**:

- **3D hero** — React Three Fiber + Three.js (`@react-three/drei` Sky/HDR environment, procedural water shader, 3D temple, palms, lotus on the lake). Lazy-loaded for faster first paint.
- **Fallback** — plain CSS gradient if WebGL fails
- English / मराठी language toggle (English default)
- Scroll hint + stub section below

**Stack:** `three`, `@react-three/fiber`, `@react-three/drei`

**Hero code:** [`src/invitation-v1/hero3d/`](src/invitation-v1/hero3d/)

**Not yet built:** groom/bride sections, date/venue, Maps, side RSVP (Phases 2–4).

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Content

Phase 1 strings: [`src/content/invitation.js`](src/content/invitation.js)

Classic print-card code remains in [`src/components/`](src/components/) (unused until archived in Phase 4).
