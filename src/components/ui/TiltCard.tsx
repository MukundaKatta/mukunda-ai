import { useRef, type ReactNode, type PointerEvent } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

/**
 * 3D tilt-on-hover container. Rotates subtly toward the pointer with a soft
 * spring and lifts on the z-axis for depth. Also publishes pointer-relative
 * CSS vars (--mx / --my) so a child can render a spotlight glow.
 * Mouse pointers only; flattens completely under prefers-reduced-motion.
 */
export function TiltCard({
  children,
  className = '',
  max = 8,
  glow = true,
}: {
  children: ReactNode
  className?: string
  max?: number
  glow?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 250, damping: 20, mass: 0.4 })
  const sry = useSpring(ry, { stiffness: 250, damping: 20, mass: 0.4 })

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== 'mouse') return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    ry.set((px - 0.5) * (max * 2))
    rx.set((0.5 - py) * (max * 2))
    if (glow) {
      el.style.setProperty('--mx', `${px * 100}%`)
      el.style.setProperty('--my', `${py * 100}%`)
    }
  }

  const reset = () => {
    rx.set(0)
    ry.set(0)
  }

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{
        rotateX: srx,
        rotateY: sry,
        transformPerspective: 900,
        transformStyle: 'preserve-3d',
      }}
    >
      {children}
    </motion.div>
  )
}
