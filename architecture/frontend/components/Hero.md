# Hero

## File

`src/components/Hero.jsx`

## Purpose

The single content section of the site (`<section id="home">`). Lays out the name/role grid, the vertical social-links column (desktop), and the bottom row (horizontal socials on mobile + the AI chat box).

## Depends On

- [[AnimatedRole]]
- [[SocialLinks]] (rendered twice: `orientation="vertical"` pinned to the left edge on `lg+`, `orientation="horizontal"` above the chat box on mobile)
- [[AIChat]]
- [[Animations]] — Framer Motion `container`/`item` stagger variants for entrance, `useReducedMotion` to disable the `y` offset.

## Related Components

Child of [[App]]. Its `AmbientBackground`-rendered particle canvas (a sibling, not a child) sits visually behind it — see [[AmbientBackground]].

## Data received / emitted

No props. No API calls of its own — [[AIChat]] (a child) owns the `/api/chat` call.

## Notable implementation detail

The section and its two `motion.div` wrappers are `pointer-events-none`; only the actual interactive leaf elements (social links, chat box) are `pointer-events-auto`. This is the same "let clicks fall through to the 3D canvas" pattern documented in [[App]] and [[Security]].
