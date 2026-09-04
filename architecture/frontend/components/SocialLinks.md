# SocialLinks

## File

`src/components/SocialLinks.jsx`

## Purpose

Renders the LinkedIn / Facebook / GitHub / TikTok icon links, in either a vertical or horizontal layout depending on the `orientation` prop.

## Depends On

- `src/data/content.js` — `SOCIAL_LINKS` array (name, href, icon key). **Note:** the `href` values in the current codebase are placeholder root URLs (`https://linkedin.com/`, etc.), not Aldrin's actual profile URLs — confirmed by reading `content.js` directly; a comment in that file says as much.
- `react-icons/fa6` — `FaLinkedinIn`, `FaFacebookF`, `FaGithub`, `FaTiktok`.

## Related Components

Rendered twice by [[Hero]] (vertical, desktop-only column; horizontal, mobile-only row above the chat box).

## Data received / emitted

Props: `orientation` (`"vertical"` | `"horizontal"`), `className`. No network calls.
