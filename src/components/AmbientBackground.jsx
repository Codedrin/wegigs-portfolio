import { lazy, Suspense } from "react"

// Code-split: Three.js/fiber/drei are a meaningful chunk of JS. Loading them
// lazily means page content paints immediately and the particle background
// pops in once ready, instead of blocking the whole page on a 3D bundle.
const ParticleRing = lazy(() => import("./ParticleRing/ParticleRing"))

// Fixed to the viewport (not scoped to one section) so the same particle
// field and dark overlay stay visible behind every section as the page
// scrolls — one continuous environment rather than a per-section background.
export default function AmbientBackground() {
  return (
    <>
      <div
        aria-hidden="true"
        className="fixed inset-0 z-0 lg:inset-y-0 lg:inset-x-auto lg:left-[22%] lg:right-[-12%]"
      >
        <Suspense fallback={null}>
          <ParticleRing />
        </Suspense>
      </div>
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 bg-ink/45" />
    </>
  )
}
