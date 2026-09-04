# Architecture Legend

What the categories in this vault mean, and the rules applied while writing it.

## Categories

| Category | Meaning |
|---|---|
| **Frontend** | Code that runs in the visitor's browser — React components, styling, client-side animation, the 3D canvas. |
| **Backend** | Code that runs only server-side — the Express app and its one route. |
| **AI** | The Gemini integration and the knowledge base it's grounded in. |
| **3D** | The Three.js particle background specifically — rendering, point generation, interaction. |
| **Database** | Persistent data storage — explicitly documented as absent in this project. |
| **Integration / External Service** | A third-party service the project connects to, either at runtime (Gemini) or for development/deployment (GitHub, Vercel). |
| **Infrastructure** | Deployment and environment configuration — Vercel, environment variables, the deployment pipeline. |
| **Component** | A specific React component with its own file. |
| **API** | A specific server route — there is exactly one, [[Chat API]]. |

## Inclusion rule (what got its own page vs. what didn't)

A source file or concept got a dedicated note if it represents a distinct architectural responsibility a reader would want to jump to directly — a component, a route, an external service, a subsystem. Small shared data files (`src/data/content.js`) and pure utility math (`ParticleRing/utils.js`'s role folded into [[Particle System]]) were referenced from the pages that use them instead of given their own node, to avoid diluting the graph with trivial leaves. See [[Source-Code-Map]] for exactly what maps where.

## Naming rule

One note per real concept, named after the project's own terminology — e.g. [[Chat API]] (not "Chat Endpoint" or "AI Route"), [[Gemini AI]] (not separately "Gemini" and "Google Gemini" and "Gemini API"), [[AIChat]] (matching the actual component/file name, not renamed to something friendlier). This is what keeps the Obsidian graph from splitting one real thing into multiple nodes.

## Accuracy rule

Every claim in this vault traces to something actually read in the source code during this vault's creation — `package.json`, every file under `src/` and `server/`, `vite.config.js`, `vercel.json`, `.env.example`, `.gitignore`, and the live Vercel/GitHub configuration. A package being listed in `package.json` was never treated as proof it's used — see [[Database]] for the clearest example (Firebase/MongoDB/etc. are mentioned in [[AI Portfolio Context]] as things Aldrin has used professionally, but none are dependencies of, or imported by, this project).
