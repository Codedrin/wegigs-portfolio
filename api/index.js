// Vercel auto-detects any file under api/ as a serverless function. This one
// re-exports the real Express app (server/index.js, which owns routing,
// middleware, etc.) so it can be wrapped as the function that handles all
// /api/* requests — see the rewrite in vercel.json that sends every /api/*
// path here while keeping the original URL intact for Express's own router.
export { default } from "../server/index.js"
