# ChatMessage

## File

`src/components/ChatMessage.jsx`

## Purpose

Renders a single message bubble — right-aligned plain-text bubble for the user, left-aligned markdown-rendered bubble (with a sparkle avatar) for the AI.

## Depends On

- `react-markdown` — renders AI responses via custom component overrides (`p`, `strong`, `em`, `ul`, `ol`, `li`, `code`, `a`), never `dangerouslySetInnerHTML`.
- [[Animations]] — fade+rise entrance per message.
- `lucide-react` — `Sparkles` icon.

## Related Components

Rendered in a loop by [[AIChat]], one per entry in its `messages` array.

## Data received / emitted

Props: `role` (`"user"` | `"model"`), `content` (string, markdown for AI messages). No network calls, no state of its own.
