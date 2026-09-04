# Animations

## What is it?

Framer Motion (`framer-motion@^13.1.1`) — the only animation library in the project. Three.js's own frame loop (separate concern) is covered in [[3D Interaction]].

## Where is it used?

| Component | What's animated |
|---|---|
| [[Hero]] | Staggered fade+rise entrance for the name/role block and the chat/socials block (`container`/`item` variants, `staggerChildren`) |
| [[AnimatedRole]] | Character-by-character "scatter then assemble" entrance for the rotating role text, plus a blur+fade exit |
| [[AIChat]] | Height/opacity transitions for the message log and error banner (`AnimatePresence`) |
| [[ChatMessage]] | Fade+rise entrance for each new chat bubble |

## AnimatedRole in detail (the most involved animation in the project)

Confirmed from `src/components/AnimatedRole.jsx`:

- Role text rotates every 2800ms (`ROTATE_MS`) via `setInterval`, cycling through `ROLES` from `src/data/content.js`.
- Each role string is split into words (`inline-block whitespace-nowrap`, so animation never breaks mid-word) and each word into characters, each wrapped in its own `motion.span`.
- `charVariants.hidden` gives each character a **random** offset/rotation/scale (`x`, `y`, `rotate` are functions, re-evaluated by Framer Motion on every entrance) — this is what produces the "reassembling from scattered chaos" effect rather than a uniform slide-in.
- Exit is a simple fade+blur+lift on the whole block (`containerVariants.exit`), not a reverse-scatter — deliberately simpler for a cleaner read.
- `useReducedMotion()` swaps in `reducedContainerVariants`/`reducedCharVariants` (plain opacity fade, no stagger/scatter) when the visitor has `prefers-reduced-motion` set.
- The visible span has `aria-hidden="true"` and an explicit inline `style={{ pointerEvents: "none" }}` (not just a Tailwind class) — Framer Motion's `motion.span` can set its own inline `pointer-events`, so the inline style is what reliably keeps this decorative text from intercepting drags meant for the 3D canvas behind it. See [[3D Interaction]] and [[Security]] for the pointer-events chain this is part of.
- A separate `<p className="sr-only">` lists all roles statically for assistive technology.

## What does it depend on?

[[React]]. `useReducedMotion` is Framer Motion's own hook, reading the OS-level media query.

## What depends on it?

[[Hero]], [[AnimatedRole]], [[AIChat]], [[ChatMessage]] — see table above.
