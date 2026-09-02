import { motion, useReducedMotion } from "framer-motion"
import AnimatedRole from "./AnimatedRole"
import SocialLinks from "./SocialLinks"
import AIChat from "./AIChat"

export default function Hero() {
  const reduceMotion = useReducedMotion()

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.14, delayChildren: 0.1 },
    },
  }

  const item = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <section
      id="home"
      className="pointer-events-none relative isolate flex min-h-screen flex-col overflow-hidden pt-24 sm:pt-28"
    >
      {/* The particle background + overlay now live in AmbientBackground
          (rendered once at the App level, fixed behind the page), so this
          section's large mostly-empty wrappers stay pointer-events-none —
          that's what lets drags on "empty" space reach that fixed canvas
          underneath. */}

      {/* Desktop vertical social column, pinned to the hero's left edge. */}
      <div className="pointer-events-none absolute inset-y-0 left-4 z-20 hidden lg:flex lg:w-16 lg:flex-col lg:items-center lg:justify-center xl:left-10">
        <div className="pointer-events-auto flex flex-col items-center gap-6">
          <SocialLinks orientation="vertical" />
          <span className="h-20 w-px bg-linear-to-b from-white/25 to-transparent" aria-hidden="true" />
        </div>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="pointer-events-none relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 sm:px-8 lg:px-24 xl:px-28"
      >
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-10">
          <motion.div variants={item} className="min-w-0">
            <p className="text-sm font-medium tracking-[0.3em] text-[#8b5cf6] uppercase sm:text-base">
              Hello, I&apos;m
            </p>
            <h1
              className="mt-4 text-[3rem] leading-[0.95] font-bold tracking-tight text-white sm:text-6xl md:text-7xl lg:text-6xl xl:text-7xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Aldrin
              <br />
              <span className="bg-linear-to-r from-indigo-300 via-violet-300 to-fuchsia-200 bg-clip-text text-transparent">
                Rosales
              </span>
            </h1>
          </motion.div>

          <motion.div variants={item} className="flex min-w-0 flex-col lg:items-end">
            <p className="text-sm font-medium tracking-[0.3em] text-[#8b5cf6] uppercase sm:text-base lg:text-right">
              Creative
            </p>
            <div className="mt-4 w-full">
              <AnimatedRole />
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="pointer-events-none relative z-10 mx-auto w-full max-w-7xl px-6 pb-10 sm:px-8 sm:pb-12 lg:px-24 lg:pb-16 xl:px-28"
      >
        <motion.div variants={item} className="flex flex-col gap-6">
          <SocialLinks orientation="horizontal" className="justify-center lg:hidden" />
          <AIChat className="mx-auto lg:mx-0 lg:max-w-2xl" />
        </motion.div>
      </motion.div>
    </section>
  )
}
