import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/**
 * Premium rotating word — cross-fades with a gentle vertical slide + blur.
 * No caret, no typing. Designed to sit inside a line of body/supporting text.
 * Wraps naturally on small screens (no nowrap).
 */
export function TypeWriter({ words, className = '' }: { words: string[]; className?: string }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIndex(i => (i + 1) % words.length), 2800)
    return () => clearInterval(id)
  }, [words.length])

  return (
    <span className="relative inline-block">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          className={className}
          initial={{ y: '0.4em', opacity: 0, filter: 'blur(8px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: '-0.4em', opacity: 0, filter: 'blur(8px)' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'inline-block' }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
