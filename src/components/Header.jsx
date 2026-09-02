import { useEffect, useState } from "react"

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-[#050509]/75 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center px-6 py-3 sm:px-8 lg:px-12">
        <a
          href="#home"
          className="pointer-events-auto shrink-0 text-xl font-bold tracking-tight text-white transition-colors duration-200 hover:text-[#8b5cf6] hover:[text-shadow:0_0_16px_rgba(139,92,246,0.5)] focus-visible:text-[#8b5cf6] sm:text-2xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          WeGigs
        </a>
      </nav>
    </header>
  )
}
