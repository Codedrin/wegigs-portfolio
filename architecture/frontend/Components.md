# Components

Index of the meaningful React components in `src/components/`. Trivial presentational wrappers aren't given their own page — see [[Architecture Legend]] for the inclusion rule.

| Component | File | Role |
|---|---|---|
| [[App]] | `src/App.jsx` | Root — mounts background, header, hero |
| [[Header]] | `src/components/Header.jsx` | Fixed nav bar, "WeGigs" logo only |
| [[Hero]] | `src/components/Hero.jsx` | Main section layout: name, role, socials, chat |
| [[AmbientBackground]] | `src/components/AmbientBackground.jsx` | Fixed viewport wrapper, lazy-loads the 3D canvas |
| [[ParticleRing]] | `src/components/ParticleRing/ParticleRing.jsx` | The actual `<Canvas>` + particle field + `OrbitControls` |
| [[AnimatedRole]] | `src/components/AnimatedRole.jsx` | Rotating role text with scatter-assemble entrance |
| [[SocialLinks]] | `src/components/SocialLinks.jsx` | LinkedIn/Facebook/GitHub/TikTok icon links |
| [[AIChat]] | `src/components/AIChat.jsx` | Chat UI, streaming fetch to `/api/chat` |
| [[ChatMessage]] | `src/components/ChatMessage.jsx` | Renders one user or AI message bubble |

Full tree relationship: see [[Frontend]].

## Not documented as separate nodes

- `src/components/ParticleRing/utils.js` — pure point-generation math, not a component. Covered in [[Particle System]].
- `src/data/content.js` — static data (social links, role list, suggestion chips) imported by [[SocialLinks]], [[AnimatedRole]], and [[AIChat]]. Not architecturally significant enough for its own node; see [[Source-Code-Map]] for its file entry.
