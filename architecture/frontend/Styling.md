# Styling

## What is it?

Tailwind CSS v4, using its CSS-first configuration model — there is no `tailwind.config.js` in this project.

## Where is it?

- `src/index.css` — `@import "tailwindcss";` followed by an `@theme` block defining custom tokens: `--font-display` (Space Grotesk), `--font-sans` (Inter), `--color-ink` (`#050509`), `--color-ink-raised` (`#0a0a12`).
- `vite.config.js` — the `@tailwindcss/vite` plugin (not PostCSS) integrates Tailwind into the Vite build.
- Utility classes applied directly in every component's `className`.

## What does it do?

Provides the entire visual design: the dark-ink background, the `#8b5cf6` violet accent used throughout (headings, focus states, hover glows, chat send button), responsive breakpoints (`sm`/`md`/`lg`/`xl`), and a few hand-written `@keyframes` (`drift-a`, `drift-b`, `float-particle`) plus a `prefers-reduced-motion` block that collapses all animation durations to near-zero.

## What does it depend on?

Nothing internal — it's a build-time CSS layer.

## What depends on it?

Every component in [[Components]] — all visual styling in this project is Tailwind utility classes, no CSS Modules or styled-components.
