# 3D Interaction

## What is it?

The drag-to-rotate / wheel-to-zoom / auto-rotation behavior layered on top of [[Three.js]]'s rendering, via drei's `OrbitControls`.

## Where is it?

`src/components/ParticleRing/ParticleRing.jsx`.

## OrbitControls configuration (confirmed from source)

```js
<OrbitControls
  makeDefault
  enablePan={false}
  enableDamping={!reduceMotion}
  dampingFactor={0.08}
  rotateSpeed={0.45}
  zoomSpeed={0.6}
  minDistance={16}
  maxDistance={42}
  minPolarAngle={Math.PI / 6}
  maxPolarAngle={Math.PI - Math.PI / 6}
  onStart={handleStart}
  onEnd={handleEnd}
/>
```

Deliberately **not** a full 3D viewer: no panning (keeps the ring centered), gentle rotate/zoom speed, damped release, and a polar-angle clamp (±30° from horizontal) so it can never be flipped upside down.

## Auto-rotation

A delta-accumulated rotation value (`rotationRef`, advanced inside `useFrame` by `delta * ROTATION_SPEED` where `ROTATION_SPEED = 0.05` rad/sec) — not `clock.getElapsedTime()`, specifically so that pausing during interaction never causes a visible jump when it resumes; it just stops accumulating and continues from wherever it left off.

- Paused for as long as `interactingRef.current` is true (set by `onStart`/cleared by `onEnd`).
- After release, stays paused until `Date.now() >= resumeAtRef.current`, i.e. for `RESUME_DELAY_MS` (1000ms) after the gesture ends.
- Also fully disabled (no auto-rotation, no damping) when `prefers-reduced-motion` is set.

## Cursor and touch handling

- Cursor set directly on `gl.domElement` (`grab` / `grabbing`) — React Three Fiber applies `className`/CSS to its wrapper `<div>`, not the `<canvas>` itself, so this has to be done imperatively via a ref.
- `canvasElRef.current.style.touchAction` is reasserted to `"pan-y"` every 100ms for the first 1000ms after mount, because `OrbitControls` manages `touch-action` on the canvas for its own gesture recognition and overwrites a one-time assignment. This is what lets a single-finger vertical swipe still scroll the page natively while `OrbitControls` still handles horizontal drag and pinch-zoom.

## Click-through requirement

For drag gestures on "empty" hero space to actually reach this canvas, every ancestor element stacked above it must be `pointer-events-none` — not just the immediate wrapper. See [[Security]] for the full pointer-events chain across [[App]], [[Hero]], and [[AnimatedRole]].

## Depends on

[[Three.js]] (the canvas it controls), [[React]] (hooks: `useCallback`, `useEffect`, `useRef`, `useState`).
