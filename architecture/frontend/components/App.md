# App

## File

`src/App.jsx`

## Purpose

Root component. Renders the fixed background, the header, and the hero section, in that order, inside a `pointer-events-none` root `<div>`.

## Depends On

- [[AmbientBackground]]
- [[Header]]
- [[Hero]]

## Related Components

None above it — [[React]] mounts this directly via `src/main.jsx`.

## Notable implementation detail

The root `<div>` and `<main>` wrapper are both `pointer-events-none`. This is deliberate, not an oversight: it's what allows drag/zoom gestures on "empty" hero space to reach the fixed 3D canvas rendered underneath by [[AmbientBackground]], while individual interactive elements (the logo link in [[Header]], the social icons, the chat box) opt back in with `pointer-events-auto`. See [[Security]] and [[3D Interaction]] for the full chain.
