# Three.js

## What is it?

The 3D rendering stack behind the hero background: `three` (the core library) driven through React via `@react-three/fiber` (the `<Canvas>`/`useFrame` React bindings) and `@react-three/drei` (the `OrbitControls` helper).

## Where is it?

`src/components/ParticleRing/ParticleRing.jsx`, rendered by [[AmbientBackground]].

## Canvas configuration (confirmed from source)

```js
<Canvas
  dpr={[1, 2]}
  gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
  camera={{ position: [12, -9, 24], fov: 50 }}
  onCreated={handleCreated}   // camera.lookAt(0,0,0); stores gl.domElement ref
>
```

- No explicit `<ambientLight>`/`<directionalLight>` elements exist in the scene — the particle material (`pointsMaterial`) uses `vertexColors` and additive blending, which don't require scene lighting.
- `antialias: false` — deliberate, part of the performance work described below.

## Rendering technique

A **single `THREE.Points` draw call** for the entire field (both the inner ring and outer halo combined into one `BufferGeometry`), using a custom canvas-drawn radial-gradient sprite (`useGlowSprite()`) as the point texture, `THREE.AdditiveBlending`, `depthWrite: false`, `alphaTest: 0.01`.

This replaced an earlier implementation that rendered each particle as an individually-meshed `<Sphere>` — that version measured ~5fps; the `THREE.Points` approach measures 80–99fps (see project history; not re-derivable from the current source alone, noted here for context).

## Depends on

[[React]] (via `@react-three/fiber`).

## What depends on it

[[Particle System]] (point generation math) and [[3D Interaction]] (OrbitControls/drag/zoom) are both part of this same file — split into separate pages here only because they're conceptually distinct concerns, not separate files.
