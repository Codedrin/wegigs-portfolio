import { motion } from "framer-motion"
import ReactMarkdown from "react-markdown"
import { Sparkles } from "lucide-react"

const markdownComponents = {
  p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
  strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
  em: ({ children }) => <em className="italic">{children}</em>,
  ul: ({ children }) => <ul className="mb-2 ml-4 list-disc space-y-1 last:mb-0">{children}</ul>,
  ol: ({ children }) => <ol className="mb-2 ml-4 list-decimal space-y-1 last:mb-0">{children}</ol>,
  li: ({ children }) => <li>{children}</li>,
  code: ({ children }) => (
    <code className="rounded bg-white/10 px-1.5 py-0.5 text-[0.85em] text-indigo-200">{children}</code>
  ),
  a: ({ children, href }) => (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className="text-[#8b5cf6] underline decoration-[#8b5cf6]/40 underline-offset-2 transition-colors hover:text-white"
    >
      {children}
    </a>
  ),
}

export default function ChatMessage({ role, content }) {
  const isUser = role === "user"

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}
    >
      {isUser ? (
        <div className="max-w-[85%] rounded-2xl rounded-br-sm border border-[#8b5cf6]/20 bg-[#8b5cf6]/[0.12] px-4 py-2.5 text-sm text-white/90 sm:text-base">
          {content}
        </div>
      ) : (
        <div className="flex max-w-[90%] items-start gap-2.5">
          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-indigo-500 to-[#8b5cf6]">
            <Sparkles className="h-3.5 w-3.5 text-white" aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1 text-sm text-white/85 sm:text-base [&_p]:leading-relaxed">
            <ReactMarkdown components={markdownComponents}>{content}</ReactMarkdown>
          </div>
        </div>
      )}
    </motion.div>
  )
}
