# GitHub

## What is it?

Source control host for this project. Repository: `Codedrin/wegigs-portfolio` (public), branch `main`.

## Purpose

- Canonical source history.
- Connected to [[Vercel]]'s Git integration, so pushes to `main` trigger production deployments automatically (in addition to manual `vercel deploy --prod`).

## Authentication method

Local Git operations use the `gh` CLI, authenticated separately from the app itself — this is developer/deployment tooling auth, not something the running application does at runtime.

## Data exchanged

Source code, commit history, `.gitignore`-respecting file tree. Verified during this project's deployment work that no `.env` file, no `Resources/` personal documents, and no secret values exist anywhere in the repository's history for this repo (a fresh repo was created specifically to avoid inheriting an older, unrelated repo's exposed-secret history).

## What depends on it

[[Vercel]] (Git-based deploys). Nothing in the running application depends on GitHub at runtime.
