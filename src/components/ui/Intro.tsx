import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const easeOut = [0.16, 1, 0.3, 1] as const

/**
 * Cinematic first-load reveal. Shows once per browser session (sessionStorage),
 * locks scroll while visible, then fades to reveal the page. Skipped entirely
 * when the user prefers reduced motion.
 */
export function Intro() {
  const reduce = useReducedMotion()
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (reduce) return
    let seen = false
    try {
      seen = Boolean(sessionStorage.getItem('intro-seen'))
    } catch { /* private mode — just show it */ }
    if (seen) return
    try { sessionStorage.setItem('intro-seen', '1') } catch { /* ignore */ }

    setShow(true)
    document.body.style.overflow = 'hidden'
    const t = setTimeout(() => setShow(false), 2000)
    return () => clearTimeout(t)
  }, [reduce])

  useEffect(() => {
    if (!show) document.body.style.overflow = ''
  }, [show])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          aria-hidden
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: easeOut } }}
        >
          {/* Ambient depth */}
          <div className="absolute inset-0 line-grid opacity-30" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(99,102,241,0.18),transparent_55%)]" />

          <motion.div
            className="relative flex flex-col items-center"
            exit={{ scale: 1.08, opacity: 0, transition: { duration: 0.6, ease: easeOut } }}
          >
            <motion.div
              className="font-display text-7xl font-bold gradient-text-premium md:text-8xl"
              initial={{ opacity: 0, scale: 0.82, filter: 'blur(14px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.9, ease: easeOut }}
            >
              MK
            </motion.div>

            <motion.div
              className="mt-5 h-px bg-gradient-to-r from-transparent via-indigo-400 to-transparent"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 200, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8, ease: easeOut }}
            />

            <motion.p
              className="mt-5 text-[11px] font-semibold uppercase tracking-[0.42em] text-slate-400"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.6, ease: easeOut }}
            >
              Mukunda Rao Katta
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
