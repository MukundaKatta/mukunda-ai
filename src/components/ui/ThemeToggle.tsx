import { Moon, Sun } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function ThemeToggle({ dark, toggle }: { dark: boolean; toggle: () => void }) {
  return (
    <button
      onClick={toggle}
      className="relative w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden cursor-pointer shrink-0
        bg-white dark:bg-[#0a0a14]
        border border-slate-200 dark:border-indigo-400/25
        shadow-sm dark:shadow-[0_0_24px_-6px_rgba(99,102,241,0.45)]
        hover:border-indigo-400 dark:hover:border-indigo-400/60
        hover:shadow-md dark:hover:shadow-[0_0_32px_-4px_rgba(129,140,248,0.6)]
        transition-all duration-200"
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={dark}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={dark ? 'sun' : 'moon'}
          initial={{ y: 14, opacity: 0, rotate: -90 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -14, opacity: 0, rotate: 90 }}
          transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center"
        >
          {dark
            ? <Sun size={17} className="text-indigo-200" />
            : <Moon size={17} className="text-slate-600" />}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
