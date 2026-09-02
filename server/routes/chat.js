import { Router } from "express"
import rateLimit from "express-rate-limit"
import { GoogleGenAI } from "@google/genai"
import { SYSTEM_INSTRUCTION } from "../ai/systemPrompt.js"

const router = Router()

const MAX_MESSAGE_LENGTH = 2000
const MAX_HISTORY_MESSAGES = 12 // most-recent messages kept, not sent unbounded

const chatLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 30, // generous enough for a real back-and-forth conversation
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "You've sent a lot of messages — please wait a bit before continuing." },
})

// Lazily constructed so a missing API key surfaces as a normal 500 on first
// use (with a clear server-log message) rather than crashing the server at
// boot — same pattern as the mailer had.
let cachedClient = null
function getClient() {
  if (cachedClient) return cachedClient
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    throw new Error("AI is not configured: GEMINI_API_KEY is missing from the environment (.env).")
  }
  cachedClient = new GoogleGenAI({ apiKey })
  return cachedClient
}

function validate(body) {
  const message = typeof body?.message === "string" ? body.message.trim() : ""
  const historyRaw = Array.isArray(body?.history) ? body.history : []

  if (!message) return { error: "Please enter a message." }
  if (message.length > MAX_MESSAGE_LENGTH) return { error: "That message is too long." }

  // Never trust client-supplied history blindly — filter to well-formed
  // entries, cap length per entry and the number of turns sent to Gemini.
  const history = historyRaw
    .filter((h) => h && (h.role === "user" || h.role === "model") && typeof h.content === "string" && h.content.trim())
    .slice(-MAX_HISTORY_MESSAGES)
    .map((h) => ({
      role: h.role,
      parts: [{ text: h.content.trim().slice(0, MAX_MESSAGE_LENGTH) }],
    }))

  return { message, history }
}

router.post("/", chatLimiter, async (req, res) => {
  const { error, message, history } = validate(req.body)
  if (error) {
    return res.status(400).json({ success: false, message: error })
  }

  let ai
  try {
    ai = getClient()
  } catch (err) {
    console.error("[chat] client init failed:", err.message)
    return res.status(500).json({
      success: false,
      message: "Sorry, I couldn't process that request right now. Please try again.",
    })
  }

  const contents = [...history, { role: "user", parts: [{ text: message }] }]

  try {
    const stream = await ai.models.generateContentStream({
      model: process.env.GEMINI_MODEL || "gemini-flash-lite-latest",
      contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        maxOutputTokens: 1024,
        temperature: 0.6,
      },
    })

    res.setHeader("Content-Type", "text/plain; charset=utf-8")
    res.setHeader("Cache-Control", "no-cache")
    res.flushHeaders()

    for await (const chunk of stream) {
      const text = chunk.text
      if (text) res.write(text)
    }
    res.end()
  } catch (err) {
    console.error("[chat] Gemini request failed:", err.message)
    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        message: "Sorry, I couldn't process that request right now. Please try again.",
      })
    } else {
      // Already streaming a response body — can't switch to a JSON error at
      // this point. End the connection; the client treats an incomplete
      // stream as a failure.
      res.end()
    }
  }
})

export default router
