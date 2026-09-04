# Header

## File

`src/components/Header.jsx`

## Purpose

Fixed top navigation bar. Currently just a text logo link ("WeGigs") — no nav menu, no mobile hamburger, no "Projects"/"Contact" links. These were removed at an earlier stage of the project; this component has never had them back.

## Depends On

- [[React]] (`useState`, `useEffect` for scroll detection)
- [[Styling]] — background/blur transitions on scroll via Tailwind classes.

## Behavior

Tracks `window.scrollY` and toggles a blurred dark background once scrolled past 8px (`scrolled` state). The logo `<a href="#home">` is explicitly `pointer-events-auto` since its ancestors (including [[App]]'s root div) are `pointer-events-none`.

## Related Components

Sibling of [[AmbientBackground]] and [[Hero]] under [[App]].

## Data received / emitted

None — no props, no external data.
