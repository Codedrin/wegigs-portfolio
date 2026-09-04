# Vercel

## What is it?

The hosting/deployment platform. Project name: `wegigs-portfolio`, live at `https://wegigs-portfolio.vercel.app`.

## Purpose

Hosts two distinct things from one repo:

1. **Static frontend** — `dist/**` (the Vite build output), served directly by Vercel's CDN. Framework auto-detected as Vite from `package.json`'s `build` script + `vite.config.js`.
2. **`/api/chat` serverless function** — see [[Deployment]] for exactly how this is wired (`api/index.js` + `vercel.json` rewrite).

## Connection point

Connected to the [[GitHub]] repo `Codedrin/wegigs-portfolio` via `vercel link`, which auto-detected and connected the Git repository. Deployed both by pushing to `main` and by running `vercel deploy --prod` from the CLI.

## Authentication method

Vercel CLI, authenticated via browser device-auth (`vercel login`), account `codedrin`.

## Data exchanged

Build inputs: full repo source (minus `.gitignore`d files) uploaded at deploy time. Runtime: HTTP requests from visitors' browsers; the function itself exchanges data with [[Gemini AI]] server-side.

## Configuration

- `vercel.json` — one rewrite rule: `/api/:path* → /api`.
- Environment variables (Production scope): `GEMINI_API_KEY`, `GEMINI_MODEL`. See [[Environment Variables]].
- No `NODE_VERSION`/custom build command overrides found — zero-config Vite + zero-config `api/` function detection.

## Failure behavior

If `GEMINI_API_KEY` is missing or invalid, the function itself doesn't crash — [[Chat API]]'s `getClient()` throws a caught, logged error and returns a generic `500` to the client. A failed static build would fail the deployment outright (standard Vercel behavior, not app-specific).

## What depends on it

Nothing in the source code — Vercel is purely deployment infrastructure. The app itself (`server/index.js`) is written to also run standalone via plain `node server/index.js`, independent of Vercel.
