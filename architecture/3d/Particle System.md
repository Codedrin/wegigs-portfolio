# Particle System

## What is it?

The point-cloud generation math that produces the particle positions and per-particle colors.

## Where is it?

`src/components/ParticleRing/utils.js`, consumed by `ParticleField` inside [[ParticleRing]].

## What does it do?

`generateRingPoints(numPoints)` produces two point sets:

- **inner** — `numPoints` points, radius randomly between `MIN_RADIUS` (7.5) and `MAX_RADIUS` (15), random angle around a full circle, shallow depth (`±2` on `z`).
- **outer** — `numPoints / 4` points, wider radius range (`MIN_RADIUS/2` to `MAX_RADIUS*2`), much deeper `z` spread (`±20`) — this is the diffuse halo around the tighter ring.

Each point's color is computed by `calculateColor(x)` → `getGradientStop(ratio)`, a left-to-right linear interpolation between two hex colors based on the point's `x` position:

- Left color: `#6366f1` (indigo)
- Right color: `#8b5cf6` (violet)

Point counts: `DESKTOP_POINTS = 2500`, `MOBILE_POINTS = 700`, selected by [[ParticleRing]] based on viewport width.

## Depends on

Nothing — pure math, no imports beyond what's in the file itself.

## What depends on it

[[ParticleRing]] calls `generateRingPoints()` once per point-count change (memoized with `useMemo`), then packs the result into `Float32Array` position/color buffers for [[Three.js]]'s `BufferGeometry`.
