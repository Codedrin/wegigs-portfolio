# React

## What is it?

The UI library the whole client is built on. Version `^19.2.8` (`react`, `react-dom` in `package.json`).

## Where is it?

Entry: `src/main.jsx` — `createRoot(document.getElementById('root')).render(<StrictMode><App/></StrictMode>)`.

## What does it do?

Owns the entire component tree under [[App]]. No routing library is installed — this is a single static tree, not a router-driven multi-page app.

## State management

There is no external state-management library (no Redux, Zustand, Context-based global store, etc.). Every piece of state found in the codebase is local `useState`/`useRef` inside the component that owns it:

| State | Component | Purpose |
|---|---|---|
| `scrolled` | [[Header]] | toggles header background on scroll |
| `messages`, `input`, `status`, `errorMessage` | [[AIChat]] | chat conversation + request lifecycle |
| `index` | [[AnimatedRole]] | which role is currently shown |
| `numPoints`, `reduceMotion` | [[ParticleRing]] | responsive point count, motion preference |
| `interactingRef`, `resumeAtRef`, `canvasElRef` | [[ParticleRing]] | drag/zoom interaction bookkeeping (refs, not re-rendered state) |

## What depends on it?

Every component in [[Components]]. [[Three.js]] (via `@react-three/fiber`, React's renderer binding for Three.js) and [[Animations]] (via `framer-motion`) are both React-specific libraries built on top of it.

## Depends on

Nothing internal — it's the base rendering layer.
