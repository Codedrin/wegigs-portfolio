# AmbientBackground

## File

`src/components/AmbientBackground.jsx`

## Purpose

Renders the particle background as a `fixed` (viewport-pinned, not section-scoped) layer behind the entire page, plus a dark overlay (`bg-ink/45`) on top of it for text contrast. Lazy-loads the actual 3D component.

## Depends On

- [[ParticleRing]] — loaded via `lazy(() => import("./ParticleRing/ParticleRing"))`, wrapped in `<Suspense fallback={null}>`.

## Why it's lazy

Three.js + `@react-three/fiber` + `@react-three/drei` are a meaningful chunk of JS (confirmed: `ParticleRing` is its own ~900KB chunk in the production build, `dist/assets/ParticleRing-*.js`). Lazy-loading means the page's text content paints immediately; the particle field pops in once the chunk is ready.

## Related Components

Rendered once by [[App]], as a sibling of [[Header]] and [[Hero]] — not nested inside Hero, so the same particle field stays visible behind every part of the page, not scoped to one section.

## Data received / emitted

None.
