# AIChat

## File

`src/components/AIChat.jsx`

## Purpose

The portfolio AI chat interface — suggestion chips, message log, streaming input/response, error handling, clear-conversation control.

## Depends On

- `src/data/content.js` — `SUGGESTED_QUESTIONS` (the 6 starter chips).
- [[ChatMessage]] — renders each message.
- [[Animations]] — `AnimatePresence` for the message log, error banner.
- `lucide-react` — `CircleAlert`, `Loader2`, `SendHorizontal`, `Sparkles`, `Trash2`.

## Sends Data To

[[Chat API]] — `fetch("/api/chat", { method: "POST", body: { message, history } })`, path is relative (no hardcoded host), read as a stream via `response.body.getReader()`.

## Related Components

Child of [[Hero]]. Renders one [[ChatMessage]] per turn.

## State (all local, `useState`/`useRef`)

`messages` (array of `{role, content}`), `input`, `status` (`idle`/`streaming`/`error`), `errorMessage`, plus `scrollRef`/`textareaRef`.

## Notable implementation detail

`history` sent to the API is built from the component's own `messages` state, not re-fetched from anywhere — this is the entire client-side conversation memory; nothing persists across a page reload (no `localStorage`, confirmed by absence in source).
