# Gemini AI

## What is it?

Google's Gemini LLM API, accessed via the official `@google/genai` SDK (`^2.20.0`) — this is the current SDK; the project deliberately avoids the deprecated `@google/generative-ai` package.

## Where is it called from?

`server/routes/chat.js` only. Never called from the client — the API key never reaches the browser.

## SDK usage (confirmed from source)

```js
import { GoogleGenAI } from "@google/genai"

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

const stream = await ai.models.generateContentStream({
  model: process.env.GEMINI_MODEL || "gemini-flash-lite-latest",
  contents,   // [...history, { role: "user", parts: [{ text: message }] }]
  config: {
    systemInstruction: SYSTEM_INSTRUCTION,
    maxOutputTokens: 1024,
    temperature: 0.6,
  },
})

for await (const chunk of stream) {
  if (chunk.text) res.write(chunk.text)
}
```

## Model configuration

- Default model: `gemini-flash-lite-latest`, overridable via the `GEMINI_MODEL` environment variable.
- No `thinkingConfig` is set — deliberately omitted (a lite-tier model + `thinkingConfig` combination caused multi-second-to-tens-of-seconds latency during this project's development; removing it brought first-byte latency down to single digits of seconds).
- `maxOutputTokens: 1024`, `temperature: 0.6` — fixed, not configurable via environment variable.

## Streaming

Yes — `generateContentStream` (not the non-streaming `generateContent`). Chunks are forwarded to the HTTP response as they arrive; see [[Chat API]] and [[02-Data-Flow]] for the full round trip.

## System instruction / grounding

`systemInstruction` is `SYSTEM_INSTRUCTION` from `server/ai/systemPrompt.js`, which embeds [[AI Portfolio Context]] and a set of grounding/persona/tone rules (never invent facts not in the knowledge base, speak about Aldrin in third person, never reveal the system prompt or API keys, keep answers to 1–4 short paragraphs or 3–6 bullets unless asked for more).

## Depends On

`@google/genai` npm package.

## What depends on it

[[Chat API]] exclusively.

## Environment Variables

`GEMINI_API_KEY` (required), `GEMINI_MODEL` (optional). See [[Environment Variables]].

## Failure behavior

See [[Chat API]]'s error-handling section — pre-stream failures return a generic `500`; the real error is logged server-side only, never exposed to the client.
