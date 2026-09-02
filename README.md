# Wegigs Portfolio — Aldrin Rosales

Personal portfolio homepage. React + Tailwind CSS + Framer Motion + React
Three Fiber, built with Vite.

## Run it

```bash
npm install
npm run dev
```

Then open the printed local URL (defaults to `http://localhost:5173`).

## Where things live

- `src/components/Hero.jsx` — the hero composition (name, animated role, social icons, prompt box)
- `src/components/AnimatedRole.jsx` — the rotating "Creative <role>" text
- `src/components/PromptBox.jsx` — the AI-style prompt box (simulated responses only, no live backend)
- `src/components/AmbientBackground.jsx` — the interactive 3D particle background
- `src/components/ParticleRing/` — the Three.js/R3F particle ring itself
- `src/data/content.js` — social URLs and the rotating role list; edit here first

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build to `dist/`
- `npm run preview` — preview the production build locally
- `npm run lint` — run oxlint
