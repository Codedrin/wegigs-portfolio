# External Services

Overview of every third-party service this project actually touches, split into **runtime** (called by the deployed application itself) and **infrastructure** (used to build/host/deploy it, but not called by the running app's own code).

## Runtime

| Service | Purpose | Called From | Auth | Data Exchanged |
|---|---|---|---|---|
| [[Gemini AI]] | AI chat responses | [[Chat API]] (server-side only) | `GEMINI_API_KEY` | Visitor message + capped conversation history out; streamed text response in |

That's the only external service the deployed application calls at runtime.

## Infrastructure (development / deployment only)

| Service | Purpose | Connection Point |
|---|---|---|
| [[GitHub]] | Source hosting, triggers Vercel deployments | Repo `Codedrin/wegigs-portfolio`, connected via Vercel's Git integration |
| [[Vercel]] | Hosting: static frontend (CDN) + the `/api/chat` serverless function | Deploys from the GitHub repo; also deployable via `vercel deploy --prod` CLI |

## Explicitly not integrated

- Gmail / SMTP / Nodemailer — removed feature, see [[00-System-Overview]].
- Any analytics, error-tracking, or monitoring service — none found in `package.json` or source (no Sentry, no GA, no Vercel Analytics package).
- Any auth provider (Auth0, Clerk, Firebase Auth, NextAuth, etc.) — none found.
