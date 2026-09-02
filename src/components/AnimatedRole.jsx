import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { ROLES } from "../data/content"

const ROTATE_MS = 2800

// Container only orchestrates timing (stagger the characters in), then does
// a plain fade+blur+lift for the whole settled block on exit — a simple
// exit reads cleaner than un-assembling every character in reverse.
const containerVariants = {
  hidden: {
    transition: { staggerChildren: 0.018 },
  },
  visible: {
    transition: { staggerChildren: 0.018, delayChildren: 0.02 },
  },
  exit: {
    opacity: 0,
    y: -14,
    filter: "blur(6px)",
    transition: { duration: 0.35, ease: "easeIn" },
  },
}

// Each character starts scattered — offset, rotated, shrunk, invisible —
// then assembles into place. Random spread is per-character (Framer
// re-evaluates these on every entrance), which is what gives the
// "reassembling from chaos" read rather than a uniform slide-in.
const charVariants = {
  hidden: {
    opacity: 0,
    scale: 0.4,
    x: () => (Math.random() - 0.5) * 70,
    y: () => (Math.random() - 0.5) * 50,
    rotate: () => (Math.random() - 0.5) * 140,
  },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    y: 0,
    rotate: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
}

const reducedContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
}

const reducedCharVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.15 } },
}

export default function AnimatedRole() {
  const [index, setIndex] = useState(0)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % ROLES.length)
    }, ROTATE_MS)
    return () => clearInterval(id)
  }, [])

  const role = ROLES[index]

  return (
    <div className="w-full min-w-0">
      {/* min-h uses em units so the reserved space (~3 lines) scales with the
          font-size set per breakpoint below. "Internet of Things Fabrication"
          wraps to 3 lines at some breakpoints (e.g. the xl:text-6xl step) —
          measured directly rather than assumed — so this reserves for that
          worst case, not just 2 lines, so the role never visibly overflows
          into the content below it. Plain block + text-align (no flex) so
          wrapping is governed only by this box's own width. */}
      <div
        className="relative min-h-[3.6em] w-full min-w-0 text-[1.75rem] leading-[1.15] font-bold tracking-tight sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl"
        style={{ fontFamily: "var(--font-display)" }}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={role}
            variants={reduceMotion ? reducedContainerVariants : containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            aria-hidden="true"
            style={{ pointerEvents: "none" }}
            className="absolute inset-0 block w-full text-left text-white lg:text-right"
          >
            {role.split(" ").map((word, wi, words) => (
              <span
                key={wi}
                className={`inline-block whitespace-nowrap ${wi < words.length - 1 ? "mr-[0.25em]" : ""}`}
              >
                {word.split("").map((char, ci) => (
                  <motion.span
                    key={ci}
                    variants={reduceMotion ? reducedCharVariants : charVariants}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            ))}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Static list for assistive tech; the animated version above is decorative. */}
      <p className="sr-only">
        Creative {ROLES.join(", ")}
      </p>
    </div>
  )
}
