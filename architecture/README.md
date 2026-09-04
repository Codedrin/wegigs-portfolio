# Architecture Vault — How to Use This in Obsidian

This `architecture/` folder documents the real, current architecture of the `wegigs-portfolio` codebase (the folder it lives inside) as an interconnected Obsidian/Foam knowledge graph.

## Opening it

1. In Obsidian, **Open folder as vault** and select the project root (`c:\trojan9869\portfolioV3` — the folder containing `src/`, `server/`, and this `architecture/` folder), not just `architecture/` itself. This lets you cross-reference the docs against the real source files side by side.
2. Open [[00-MOC]] — the dashboard, with every note grouped by subsystem.
3. Open [[01-Architecture-Map]] — the main visual page, with Mermaid diagrams of the real system.
4. Switch to **Graph View** (the icon in the left ribbon, or `Ctrl/Cmd+G`). You should see the system form naturally from the `[[wikilinks]]` in every note — System → Frontend/Backend/AI/3D/External, each branching into its own components and files.
5. Click any node to jump to its note. Use **Local Graph** (open a note, then the graph icon in that note's context) to see just that node's immediate neighborhood — e.g. open [[AIChat]] and its local graph shows [[React]], [[ChatMessage]], [[Chat API]], [[Animations]].

## How the links work

Every double-bracketed link (e.g. `[[AIChat]]`) is a standard Obsidian wikilink — Foam (if you're also using VS Code on this same folder) reads the identical syntax, so both tools stay in sync automatically; nothing here is Obsidian-specific syntax.

## Reading order (suggested, not required)

[[00-System-Overview]] → [[01-Architecture-Map]] → [[02-Data-Flow]] → then branch into whichever subsystem you're curious about via [[00-MOC]].

## Keeping this vault accurate

When the codebase changes, update the corresponding note(s) — this vault is meant to track real architecture, not freeze a snapshot. [[Source-Code-Map]] is the fastest way to find which note(s) a given file maps to. If you add a genuinely new subsystem (a database, an auth system, a new integration), give it its own note and link it in from [[00-MOC]] and [[01-Architecture-Map]] rather than burying it as a paragraph inside an unrelated page — that's what keeps the graph view meaningful instead of a pile of dangling text.
