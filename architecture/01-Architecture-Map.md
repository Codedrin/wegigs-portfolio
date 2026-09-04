# Architecture Map

The real system, traced from source. Every node below corresponds to an actual file or actual external service — see [[Source-Code-Map]] for the file mapping.

## High-level

```mermaid
flowchart TD
    User((Visitor's Browser))

    User --> App

    subgraph CLIENT["CLIENT — src/"]
        App["App.jsx"]
        Header["Header.jsx"]
        Hero["Hero.jsx"]
        AmbientBackground["AmbientBackground.jsx"]
        ParticleRing["ParticleRing.jsx"]
        AnimatedRole["AnimatedRole.jsx"]
        SocialLinks["SocialLinks.jsx"]
        AIChat["AIChat.jsx"]
        ChatMessage["ChatMessage.jsx"]

        App --> Header
        App --> AmbientBackground
        App --> Hero
        AmbientBackground -. lazy import .-> ParticleRing
        Hero --> AnimatedRole
        Hero --> SocialLinks
        Hero --> AIChat
        AIChat --> ChatMessage
    end

    AIChat -- "POST /api/chat (fetch, streamed)" --> Vercel

    subgraph VERCEL["VERCEL PLATFORM"]
        Vercel["vercel.json rewrite\n/api/:path* -> /api"]
        ApiFn["api/index.js\n(serverless function)"]
        Vercel --> ApiFn
    end

    subgraph SERVER["SERVER — server/"]
        ExpressApp["server/index.js\n(Express app)"]
        ChatRoute["server/routes/chat.js"]
        SystemPrompt["server/ai/systemPrompt.js"]
        PortfolioContext["server/ai/portfolioContext.js"]

        ApiFn -- "export { default }" --> ExpressApp
        ExpressApp -- "app.use('/api/chat', ...)" --> ChatRoute
        ChatRoute --> SystemPrompt
        SystemPrompt --> PortfolioContext
    end

    ChatRoute -- "@google/genai\nGoogleGenAI.models.generateContentStream" --> Gemini[("Gemini API\n(external)")]

    Vercel -. "static dist/** served by\nVercel CDN, not Express" .-> App
```

## Client / Server / External boundary

See [[Security]] for the full trust-boundary writeup. Summary:

- **CLIENT** (runs in the visitor's browser): React, Tailwind CSS, Framer Motion, Three.js / React Three Fiber. No secrets, no direct external API calls — the only network call it makes is same-origin `fetch("/api/chat")`.
- **SERVER** (runs only inside the Vercel function / local Node process): Express, `express-rate-limit`, `@google/genai`. Holds `GEMINI_API_KEY`.
- **EXTERNAL**: Gemini API (called from the server only). GitHub and Vercel are development/deployment infrastructure, not runtime dependencies of the deployed app itself — see [[External Services]].

## Technology dependency chain

```mermaid
flowchart LR
    React --> ReactDOM["react-dom"]
    React --> R3F["@react-three/fiber"]
    R3F --> Drei["@react-three/drei"]
    R3F --> Three["three"]
    React --> FramerMotion["framer-motion"]
    React --> ReactMarkdown["react-markdown"]
    React --> ReactIcons["react-icons"]
    React --> LucideReact["lucide-react"]

    NodeJS["Node.js"] --> Express["express"]
    Express --> ExpressRateLimit["express-rate-limit"]
    NodeJS --> GoogleGenAI["@google/genai"]
    GoogleGenAI --> GeminiExternal[("Gemini API")]
```

Only edges confirmed by an actual `import` in the source are drawn — no relationship here is assumed from `package.json` alone.

## What's deliberately absent from this map

- No router / pages — single hero section, single route.
- No state-management library — all state is local `useState`/`useRef` inside individual components.
- No database — see [[Database]].
- No auth — no login, session, or token handling anywhere in the app.
- No Contact/Gmail flow — removed; see [[00-System-Overview]] and [[Environment Variables]].
