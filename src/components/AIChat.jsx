import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { CircleAlert, Loader2, SendHorizontal, Sparkles, Trash2 } from "lucide-react"
import ChatMessage from "./ChatMessage"
import { SUGGESTED_QUESTIONS } from "../data/content"

const MAX_MESSAGE_LENGTH = 2000

export default function AIChat({ className = "" }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [status, setStatus] = useState("idle") // idle | streaming | error
  const [errorMessage, setErrorMessage] = useState("")
  const scrollRef = useRef(null)
  const textareaRef = useRef(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const sendMessage = async (question) => {
    const trimmed = question.trim()
    if (!trimmed || status === "streaming") return

    const historyForRequest = messages.map((m) => ({ role: m.role, content: m.content }))

    setMessages((prev) => [...prev, { role: "user", content: trimmed }, { role: "model", content: "" }])
    setInput("")
    setStatus("streaming")
    setErrorMessage("")

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, history: historyForRequest }),
      })

      if (!response.ok || !response.body) {
        const data = await response.json().catch(() => null)
        throw new Error(data?.message || "Something went wrong. Please try again.")
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let receivedAny = false

      while (true) {
        const { value, done } = await reader.read()
        if (done) break
        const chunkText = decoder.decode(value, { stream: true })
        if (!chunkText) continue
        receivedAny = true
        setMessages((prev) => {
          const next = [...prev]
          const last = next[next.length - 1]
          next[next.length - 1] = { ...last, content: last.content + chunkText }
          return next
        })
      }

      if (!receivedAny) {
        throw new Error("Sorry, I couldn't process that request right now. Please try again.")
      }
      setStatus("idle")
    } catch (err) {
      // Drop the empty/partial AI placeholder — the error banner covers it.
      setMessages((prev) => prev.slice(0, -1))
      setStatus("error")
      setErrorMessage(err.message || "Something went wrong. Please try again.")
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    sendMessage(input)
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  const handleClear = () => {
    setMessages([])
    setStatus("idle")
    setErrorMessage("")
    textareaRef.current?.focus()
  }

  const isStreamingEmpty = status === "streaming" && messages[messages.length - 1]?.content === ""
  const hasMessages = messages.length > 0

  return (
    <div className={`pointer-events-auto w-full ${className}`}>
      <AnimatePresence initial={false}>
        {hasMessages && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div
              ref={scrollRef}
              role="log"
              aria-live="polite"
              className="mb-3 max-h-72 space-y-4 overflow-y-auto rounded-3xl border border-white/10 bg-white/[0.02] p-4 backdrop-blur-xl sm:max-h-96"
            >
              {messages.map((m, i) => (
                <ChatMessage key={i} role={m.role} content={m.content} />
              ))}
              {isStreamingEmpty && (
                <div className="flex items-center gap-2 text-sm text-white/45">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-indigo-500 to-[#8b5cf6]">
                    <Loader2 className="h-3.5 w-3.5 animate-spin text-white" aria-hidden="true" />
                  </span>
                  Thinking...
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!hasMessages && (
        <div className="mb-3 flex flex-wrap gap-2">
          {SUGGESTED_QUESTIONS.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => sendMessage(q)}
              className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs text-white/60 transition-all duration-200 hover:border-[#8b5cf6]/40 hover:text-white sm:text-sm"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      <AnimatePresence>
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div
              role="alert"
              className="mb-3 flex items-start gap-2.5 rounded-2xl border border-red-400/20 bg-red-500/6 p-3.5 text-sm text-red-200"
            >
              <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <p>{errorMessage}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <form
        onSubmit={handleSubmit}
        className="group relative rounded-3xl border border-white/10 bg-white/[0.04] p-2 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur-xl transition-all duration-300 focus-within:border-[#8b5cf6]/50 focus-within:shadow-[0_0_0_1px_rgba(139,92,246,0.4),0_0_40px_-8px_rgba(139,92,246,0.55)] hover:border-white/20"
      >
        <div className="flex items-end gap-2 sm:gap-3">
          <Sparkles className="ml-3 mb-3 hidden h-5 w-5 shrink-0 text-indigo-300/70 sm:block" aria-hidden="true" />
          <label htmlFor="ask-aldrin" className="sr-only">
            Ask me anything about Aldrin's work
          </label>
          <textarea
            ref={textareaRef}
            id="ask-aldrin"
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            maxLength={MAX_MESSAGE_LENGTH}
            disabled={status === "streaming"}
            placeholder="Ask me anything about my work..."
            className="min-w-0 max-h-32 min-h-12 flex-1 resize-none bg-transparent px-2 py-3 text-sm text-white placeholder:text-white/35 focus:outline-none disabled:opacity-60 sm:text-base"
          />
          <button
            type="submit"
            disabled={!input.trim() || status === "streaming"}
            aria-label="Send message"
            className="mb-1.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-indigo-500 to-[#8b5cf6] text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(139,92,246,0.6)] focus-visible:scale-105 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:scale-100 disabled:hover:shadow-none"
          >
            {status === "streaming" ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            ) : (
              <SendHorizontal className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </form>

      <div className="mt-2 flex min-h-[1.25rem] items-center justify-between px-1">
        <p className="text-xs text-white/35">AI-powered — answers may not always be fully accurate.</p>
        {hasMessages && (
          <button
            type="button"
            onClick={handleClear}
            className="flex items-center gap-1 text-xs text-white/40 transition-colors duration-200 hover:text-white/80"
          >
            <Trash2 className="h-3 w-3" aria-hidden="true" />
            Clear
          </button>
        )}
      </div>
    </div>
  )
}
