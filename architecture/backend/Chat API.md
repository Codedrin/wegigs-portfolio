# Chat API

## Endpoint

`POST /api/chat`

## File

`server/routes/chat.js`

## Called By

[[AIChat]] — `fetch("/api/chat", { method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify({ message, history }) })`.

## Request body

```json
{ "message": "string, required, max 2000 chars after trim",
  "history": [{ "role": "user" | "model", "content": "string" }] }
```

## Validation (`validate()` function, confirmed from source)

- `message` must be a non-empty trimmed string, ≤ 2000 characters, else `400 { success: false, message: "Please enter a message." }` (or the too-long variant).
- `history` entries are filtered to well-formed `{role: "user"|"model", content: non-empty string}`, capped to the **last 12 messages** (`MAX_HISTORY_MESSAGES`), each `content` capped to 2000 characters — client-supplied history is never trusted as-is.

## Rate limiting

`express-rate-limit`: 30 requests per 10-minute window per client, `standardHeaders: true`. Over-limit response: `429`-style JSON `{ success: false, message: "You've sent a lot of messages — please wait a bit before continuing." }` (confirmed live in production: response includes `Ratelimit-Limit`/`Ratelimit-Remaining`/`Ratelimit-Reset` headers).

## Sends Request To

[[Gemini AI]] — `ai.models.generateContentStream({ model, contents, config: { systemInstruction, maxOutputTokens: 1024, temperature: 0.6 } })`, where `contents` is `[...history, { role: "user", parts: [{ text: message }] }]` and `systemInstruction` comes from [[AI Portfolio Context]].

## Returns

A streamed `text/plain` response body — each Gemini chunk's `.text` is written to the response as it arrives (`res.write(chunk.text)`), no buffering, `Cache-Control: no-cache`.

## Error handling

- Client (`GoogleGenAI`) construction is lazy and cached (`getClient()`); a missing `GEMINI_API_KEY` throws a clear error caught and logged server-side (`console.error`), returned to the client as a generic `500` — the actual error text is never sent to the browser.
- A failure **before** any chunk is streamed returns a clean `500` JSON error.
- A failure **after** streaming has started (`res.headersSent`) can't switch to a JSON error response — the handler just calls `res.end()`; the client (`AIChat.jsx`) detects this via `!receivedAny` / an incomplete stream and shows its own error banner.

## Environment Variables

- `GEMINI_API_KEY` — required, Gemini SDK authentication.
- `GEMINI_MODEL` — optional, defaults to `"gemini-flash-lite-latest"` if unset.

See [[Environment Variables]] for the complete table.
