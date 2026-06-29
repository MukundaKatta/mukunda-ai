import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

/**
 * Premium accent cursor for fine-pointer (desktop) devices: a precise dot plus
 * a spring-trailed ring that expands over interactive elements. Additive — it
 * does not hide the native cursor. No-op on touch and under reduced motion.
 */
export function CustomCursor() {
  const reduce = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [visible, setVisible] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 350, damping: 28, mass: 0.5 })
  const ringY = useSpring(y, { stiffness: 350, damping: 28, mass: 0.5 })

  useEffect(() => {
    if (reduce) return
    const fine = window.matchMedia('(pointer: fine)').matches
    if (!fine) return
    setEnabled(true)

    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
      const interactive = (e.target as HTMLElement)?.closest?.(
        'a, button, [role="button"], input, textarea, [data-cursor="hover"]'
      )
      setHovering(Boolean(interactive))
    }
    const leave = () => setVisible(false)

    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerleave', leave)
    return () => {
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerleave', leave)
    }
  }, [reduce, x, y])

  if (!enabled) return null

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[60] hidden lg:block">
      {/* Precise dot */}
      <motion.div
        className="absolute h-1.5 w-1.5 rounded-full bg-indigo-500 dark:bg-cyan-300"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        animate={{ opacity: visible ? (hovering ? 0 : 1) : 0 }}
        transition={{ duration: 0.15 }}
      />
      {/* Spring-trailed ring */}
      <motion.div
        className="absolute rounded-full border border-indigo-400/60 dark:border-cyan-300/60"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: hovering ? 44 : 26,
          height: hovering ? 44 : 26,
          opacity: visible ? 1 : 0,
          backgroundColor: hovering
            ? 'rgba(99,102,241,0.08)'
            : 'rgba(99,102,241,0)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      />
    </div>
  )
}
