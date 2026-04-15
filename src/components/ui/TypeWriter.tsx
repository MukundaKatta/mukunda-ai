import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/**
 * Premium rotating display word — replaces the old typewriter.
 * Cross-fades with a gentle vertical slide + blur, no cursor.
 * Reserves layout width via an invisible copy of the longest word
 * so surrounding content never jumps.
 */
export function TypeWriter({ words, className = '' }: { words: string[]; className?: string }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIndex(i => (i + 1) % words.length), 2800)
    return () => clearInterval(id)
  }, [words.length])

  const longest = words.reduce((a, b) => (a.length > b.length ? a : b), '')

  return (
    <span className="relative inline-block align-top">
      {/* Invisible sizer — keeps layout width stable across word swaps */}
      <span className={`${className} invisible whitespace-nowrap`} aria-hidden>
        {longest}
      </span>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          className={`${className} absolute inset-0 whitespace-nowrap`}
          initial={{ y: '0.6em', opacity: 0, filter: 'blur(10px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: '-0.6em', opacity: 0, filter: 'blur(10px)' }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
