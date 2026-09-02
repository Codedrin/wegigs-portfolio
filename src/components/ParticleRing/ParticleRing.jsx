import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import * as THREE from "three"
import { generateRingPoints, DESKTOP_POINTS, MOBILE_POINTS } from "./utils"

const ROTATION_SPEED = 0.05 // rad/sec — unchanged from the original implementation
const RESUME_DELAY_MS = 1000 // idle time after a drag/zoom before auto-rotation resumes
const MOBILE_BREAKPOINT = 768

function useResponsivePointCount() {
  const [count, setCount] = useState(() =>
    typeof window !== "undefined" && window.innerWidth < MOBILE_BREAKPOINT ? MOBILE_POINTS : DESKTOP_POINTS,
  )

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${MOBILE_BREAKPOINT}px)`)
    const onChange = (e) => setCount(e.matches ? DESKTOP_POINTS : MOBILE_POINTS)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  return count
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  )

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const onChange = (e) => setReduced(e.matches)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  return reduced
}

// A soft circular sprite (radial alpha falloff) drawn once to a canvas and
// reused for every point, so particles read as glowing dots rather than the
// hard-edged squares THREE.Points renders by default.
function useGlowSprite() {
  return useMemo(() => {
    const size = 64
    const canvas = document.createElement("canvas")
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext("2d")
    const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
    gradient.addColorStop(0, "rgba(255,255,255,1)")
    gradient.addColorStop(0.4, "rgba(255,255,255,0.65)")
    gradient.addColorStop(1, "rgba(255,255,255,0)")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, size, size)
    return new THREE.CanvasTexture(canvas)
  }, [])
}

// Single THREE.Points draw call for the whole field (inner ring + outer
// halo combined) — keeps the frame rate smooth regardless of point count.
function ParticleField({ numPoints, interactingRef, resumeAtRef, reduceMotion }) {
  const ref = useRef(null)
  const rotationRef = useRef(0)
  const glowSprite = useGlowSprite()

  const { positions, colors } = useMemo(() => {
    const { inner, outer } = generateRingPoints(numPoints)
    const all = [...inner, ...outer]
    const positions = new Float32Array(all.length * 3)
    const colors = new Float32Array(all.length * 3)
    const c = new THREE.Color()

    all.forEach((point, i) => {
      positions[i * 3] = point.position[0]
      positions[i * 3 + 1] = point.position[1]
      positions[i * 3 + 2] = point.position[2]
      c.set(point.color)
      colors[i * 3] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
    })

    return { positions, colors }
  }, [numPoints])

  // Auto-rotation is a delta-accumulated value (not clock.getElapsedTime()),
  // so pausing it during user interaction never causes a jump — it just
  // stops accumulating, then continues from exactly where it left off.
  useFrame((_state, delta) => {
    if (reduceMotion) return
    if (interactingRef.current) return
    if (Date.now() < resumeAtRef.current) return

    rotationRef.current += delta * ROTATION_SPEED
    if (ref.current) ref.current.rotation.z = rotationRef.current
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.45}
        map={glowSprite}
        vertexColors
        transparent
        alphaTest={0.01}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  )
}

export default function ParticleRing() {
  const numPoints = useResponsivePointCount()
  const reduceMotion = usePrefersReducedMotion()
  const interactingRef = useRef(false)
  const resumeAtRef = useRef(0)

  const canvasElRef = useRef(null)

  const handleStart = useCallback(() => {
    interactingRef.current = true
    resumeAtRef.current = Infinity
    if (canvasElRef.current) canvasElRef.current.style.cursor = "grabbing"
  }, [])

  const handleEnd = useCallback(() => {
    interactingRef.current = false
    resumeAtRef.current = Date.now() + RESUME_DELAY_MS
    if (canvasElRef.current) canvasElRef.current.style.cursor = "grab"
  }, [])

  // R3F applies `className`/inherited CSS to the wrapper div it creates, not
  // the <canvas> element itself — so set cursor directly on gl.domElement.
  const handleCreated = useCallback(({ camera, gl }) => {
    camera.lookAt(0, 0, 0)
    canvasElRef.current = gl.domElement
    gl.domElement.style.cursor = "grab"
  }, [])

  // OrbitControls manages touch-action on the canvas itself (it needs to,
  // for its own gesture recognition), which stomps a one-time assignment
  // regardless of effect ordering. Reassert pan-y for a beat after mount so
  // it wins the last word — this is what keeps vertical single-finger
  // swipes scrolling the page natively while OrbitControls still gets
  // horizontal drag and pinch.
  useEffect(() => {
    const assertTouchAction = () => {
      if (canvasElRef.current) canvasElRef.current.style.touchAction = "pan-y"
    }
    assertTouchAction()
    const id = window.setInterval(assertTouchAction, 100)
    const stop = window.setTimeout(() => window.clearInterval(id), 1000)
    return () => {
      window.clearInterval(id)
      window.clearTimeout(stop)
    }
  }, [])

  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [12, -9, 24], fov: 50 }}
      onCreated={handleCreated}
    >
      <ParticleField
        numPoints={numPoints}
        interactingRef={interactingRef}
        resumeAtRef={resumeAtRef}
        reduceMotion={reduceMotion}
      />
      {/* Ambient interaction, not a 3D viewer: no pan (keeps the ring from
          being dragged off-screen), gentle speeds, damped release, and a
          polar-angle clamp so it can't be flipped upside down. */}
      <OrbitControls
        makeDefault
        enablePan={false}
        enableDamping={!reduceMotion}
        dampingFactor={0.08}
        rotateSpeed={0.45}
        zoomSpeed={0.6}
        minDistance={16}
        maxDistance={42}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI - Math.PI / 6}
        onStart={handleStart}
        onEnd={handleEnd}
      />
    </Canvas>
  )
}
