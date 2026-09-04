# Backend

## What is it?

A single Express 5 application with exactly one mounted route (`/api/chat`). No database layer, no auth middleware, no session handling.

## Where is it?

- `server/index.js` — builds the Express `app`, mounts `express.json()` and the chat router, conditionally serves `dist/` as static files, conditionally calls `app.listen()`, and `export default app`.
- `api/index.js` — `export { default } from "../server/index.js"` — the file Vercel's zero-config `api/` convention actually detects and wraps as a serverless function. See [[Vercel]] and [[Deployment]] for why this indirection exists.
- `server/routes/chat.js` — the one route. See [[Chat API]].

## What does it do?

```js
const app = express()
app.use(express.json({ limit: "64kb" }))
app.use("/api/chat", chatRouter)

if (fs.existsSync(distDir)) {
  app.use(express.static(distDir))
  app.get(/.*/, (_req, res) => res.sendFile(path.join(distDir, "index.html")))
}

if (!process.env.VERCEL) {
  app.listen(process.env.PORT || 3001, ...)
}

export default app
```

The `express.static(distDir)` + SPA-fallback block only matters for a local `npm start` (serving the built `dist/` directly through this same Express process, bypassing Vite). **It has no effect in production on Vercel** — Vercel's own CDN serves `dist/**` for static requests directly (Vite framework auto-detection), never routing those requests through this function at all. Confirmed against Vercel's official Express deployment docs during this project's deployment work.

`app.listen()` is guarded by `!process.env.VERCEL` — Vercel sets that variable in its function runtime automatically, so the app never tries to bind a port there; it's exported instead and Vercel wraps it as a request handler.

## What does it depend on?

- `express`, `express-rate-limit`, `dotenv` (dev-only, loads `.env`).
- [[Chat API]] — the one thing it routes to.

## What depends on it?

- [[AIChat]] (client) — the only caller, via same-origin `/api/chat`.
- [[Vercel]] — wraps `api/index.js` (which re-exports this app) as the deployed function.
- `vite.config.js`'s dev proxy — forwards `/api/*` to this process on `localhost:3001` during `npm run dev`.

## Environment variables read here

`PORT` (local dev only, default 3001), `VERCEL` (platform-set, not user-configured). See [[Environment Variables]] for the full list including [[Chat API]]'s.
