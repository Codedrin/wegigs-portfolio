# Environment Variables

Confirmed by grepping `process.env` usage across `server/` and `api/` — not just listed from `.env.example`. Values are never included here or anywhere in this vault.

## Actually used by running code

| Variable | Used By | Purpose | Required? |
|---|---|---|---|
| `GEMINI_API_KEY` | [[Gemini AI]] (`server/routes/chat.js`) | Authenticates the `@google/genai` client | Yes — request fails cleanly with a logged server error if missing |
| `GEMINI_MODEL` | [[Gemini AI]] (`server/routes/chat.js`) | Selects the Gemini model | No — defaults to `gemini-flash-lite-latest` |
| `PORT` | [[Backend]] (`server/index.js`) | Local dev API server port | No — defaults to `3001` |
| `VERCEL` | [[Backend]] (`server/index.js`) | Set automatically by the Vercel platform; used to skip `app.listen()` in the serverless runtime | Not user-configured |

## Present in `.env.example` but NOT read by any current code

| Variable | Status |
|---|---|
| `GMAIL_USERNAME` | Vestigial. Was used by a Gmail/Nodemailer contact-form backend that has been fully removed from this codebase (`nodemailer` isn't even a dependency anymore). |
| `GMAIL_PASSWORD` | Same as above. |
| `CONTACT_RECEIVER` | Same as above. |

These three are documented here rather than silently deleted from this page, per this vault's rule of tracing actual usage rather than assuming every configured-looking variable is active — but they have no effect on the running application. See [[00-System-Overview]] and [[02-Data-Flow]] for the removed-feature context.

## Where variables are configured

- **Local dev**: `.env` (gitignored — never committed), loaded via `dotenv/config` imported at the top of `server/index.js`.
- **Production**: Vercel project environment variables (Production scope), configured via `vercel env add` — never `VITE_`-prefixed, so never bundled into client-side JS. Confirmed live: `GEMINI_API_KEY` and `GEMINI_MODEL` are the only two currently set on the Vercel project.

See [[Security]] for why none of these ever reach the browser.
