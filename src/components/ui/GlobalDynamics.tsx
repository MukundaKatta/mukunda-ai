import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function GlobalDynamics() {
  const [progress, setProgress] = useState(0)
  const pointerX = useMotionValue(-200)
  const pointerY = useMotionValue(-200)
  const smoothX = useSpring(pointerX, { stiffness: 80, damping: 24, mass: 0.3 })
  const smoothY = useSpring(pointerY, { stiffness: 80, damping: 24, mass: 0.3 })

  useEffect(() => {
    const onScroll = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight
      setProgress(height > 0 ? Math.min(100, (window.scrollY / height) * 100) : 0)
    }

    const onPointerMove = (event: PointerEvent) => {
      pointerX.set(event.clientX)
      pointerY.set(event.clientY)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('pointermove', onPointerMove)
    }
  }, [pointerX, pointerY])

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed z-[45] hidden h-72 w-72 rounded-full bg-cyan-200/[0.055] blur-3xl lg:block"
        style={{ x: smoothX, y: smoothY, translateX: '-50%', translateY: '-50%' }}
      />
      <div aria-hidden className="pointer-events-none fixed left-4 top-1/2 z-[46] hidden -translate-y-1/2 lg:block">
        <div className="h-48 w-px overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="w-full rounded-full bg-gradient-to-b from-cyan-200 via-indigo-300 to-violet-300"
            style={{ height: `${progress}%` }}
          />
        </div>
        <div className="mt-3 -translate-x-1/2 font-mono text-[10px] text-slate-500">{Math.round(progress)}%</div>
      </div>
    </>
  )
}
