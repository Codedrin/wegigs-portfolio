# ParticleRing

## File

`src/components/ParticleRing/ParticleRing.jsx`

## Purpose

The actual `<Canvas>` component: renders the particle field and configures interactive `OrbitControls`. Full technical detail (rendering technique, drag/zoom behavior) lives in [[Three.js]], [[Particle System]], and [[3D Interaction]] — this page is the component-relationship summary.

## Depends On

- `@react-three/fiber` (`Canvas`, `useFrame`)
- `@react-three/drei` (`OrbitControls`)
- `three` (`THREE.Points`, `BufferGeometry`, `CanvasTexture`, `AdditiveBlending`, `Color`)
- `src/components/ParticleRing/utils.js` — `generateRingPoints()`, `DESKTOP_POINTS`, `MOBILE_POINTS` — see [[Particle System]].

## Related Components

Loaded lazily by [[AmbientBackground]]. Has no child React components of its own — `ParticleField` is an internal (non-exported) sub-component in the same file.

## Data received / emitted

No props (rendered as `<ParticleRing />` with none). No network calls, no data sent anywhere — purely a client-side visual.

## Responsive / accessibility behavior

- Point count switches between `DESKTOP_POINTS` (2500) and `MOBILE_POINTS` (700) at a 768px breakpoint via `matchMedia`.
- Respects `prefers-reduced-motion`: auto-rotation and OrbitControls damping are both disabled when set.
