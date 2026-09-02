import "dotenv/config"
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import express from "express"
import chatRouter from "./routes/chat.js"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.join(__dirname, "..", "dist")

const app = express()

app.use(express.json({ limit: "64kb" })) // chat payloads (message + capped history) stay small

app.use("/api/chat", chatRouter)

// Serve the built frontend when it exists (production) — no NODE_ENV
// branching needed, so `npm start` is a plain cross-platform command.
if (fs.existsSync(distDir)) {
  app.use(express.static(distDir))
  app.get(/.*/, (_req, res) => res.sendFile(path.join(distDir, "index.html")))
}

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`API server listening on http://localhost:${PORT}`)
})
