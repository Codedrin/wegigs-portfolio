# AnimatedRole

## File

`src/components/AnimatedRole.jsx`

## Purpose

Displays the rotating "Creative ___" role text under the visitor's name, cycling through `ROLES` every 2800ms with a scatter-then-assemble character entrance.

## Depends On

- `src/data/content.js` — `ROLES` array: `Full Stack Web Developer`, `AI Automation Specialist`, `QA Analyst`, `Internet of Things Fabrication`, `Claims Checker`.
- [[Animations]] — full Framer Motion implementation detail documented there.

## Related Components

Child of [[Hero]].

## Data received / emitted

No props. No network calls.

## Notable implementation detail

Reserves `min-h-[3.6em]` (measured directly against the longest role, "Internet of Things Fabrication", which wraps to 3 lines at some breakpoints) so the rotating text never shifts the layout below it.
