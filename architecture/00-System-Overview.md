# System Overview

**wegigs-portfolio** — a personal portfolio single-page application for Aldrin Rosales (brand: Wegigs), built with React + Vite, styled with Tailwind CSS, animated with Framer Motion, with an interactive Three.js particle background and a Gemini-powered AI chat assistant that answers visitor questions about Aldrin using a hardcoded knowledge base. Deployed on Vercel, source on GitHub.

There is exactly one page (the hero) and exactly one API endpoint (`/api/chat`). No routing library, no database, no user authentication.

## Major Systems

- [[Frontend]] — the React application: entry point, component tree, styling, animation.
- [[Backend]] — the single Express app, deployed as a Vercel serverless function, that serves `/api/chat`.
- [[Gemini AI]] — the external LLM the chat assistant calls, via the `@google/genai` SDK.
- [[Three.js]] / [[Particle System]] / [[3D Interaction]] — the interactive particle-ring background.
- [[Database]] — none. See that page for confirmation of what was checked.
- [[External Services]] — Gemini, GitHub, Vercel.
- [[Deployment]] — GitHub → Vercel, static build + one serverless function.
- [[Environment Variables]] — the small set of variables the running code actually reads.
- [[Security]] — client/server trust boundary and where secrets live.

## What this system is NOT

Earlier in this project's history it had a Contact page and a Gmail/Nodemailer email-sending backend. Both were deliberately removed by the project owner. No component, route, or dependency for that feature exists in the current codebase — `nodemailer` isn't even in `package.json` anymore. Three environment variable names related to it (`GMAIL_USERNAME`, `GMAIL_PASSWORD`, `CONTACT_RECEIVER`) still sit in `.env.example` as leftovers; see [[Environment Variables]] for why they're documented but marked unused rather than silently deleted or silently treated as active.

## Entry points

| Layer | Entry file | Confirmed by |
|---|---|---|
| Browser / React | `src/main.jsx` → `src/App.jsx` | `createRoot(...).render(<App/>)` |
| Local dev API server | `server/index.js` (run via `node server/index.js`) | `package.json` → `dev:server`, `start` scripts |
| Vercel serverless function | `api/index.js` (re-exports `server/index.js`) | `vercel.json` rewrite + Vercel's `api/` convention |

## Major dependencies actually imported in source

Traced by grepping actual `import`/`require` statements, not just `package.json` presence (see [[Architecture Legend]] for why that distinction matters here).

- **react**, **react-dom** — UI runtime.
- **vite**, **@vitejs/plugin-react**, **@tailwindcss/vite** — build tooling.
- **tailwindcss** (v4, CSS-first `@theme` config in `src/index.css`, no `tailwind.config.js`).
- **framer-motion** — all entrance/exit animation.
- **@react-three/fiber**, **@react-three/drei**, **three** — the particle background.
- **react-icons** (`fa6` subset) — social icons.
- **lucide-react** — chat UI icons.
- **react-markdown** — renders the AI's markdown responses safely.
- **express**, **express-rate-limit** — the API server.
- **@google/genai** — Gemini SDK.
- **dotenv** — loads `.env` in local dev (`server/index.js` imports `dotenv/config`).

See [[01-Architecture-Map]] for how these connect, and [[Source-Code-Map]] for a file-by-file index.
