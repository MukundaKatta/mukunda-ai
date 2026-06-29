import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Search } from 'lucide-react'
import { ThemeToggle } from '../ui/ThemeToggle'

const openPalette = () => window.dispatchEvent(new Event('open-command-palette'))

const navItems = [
  { label: 'Systems', href: '#systems' },
  { label: 'Proof', href: '#proof' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

export function Header({ dark, toggle }: { dark: boolean; toggle: () => void }) {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const menuBtnRef = useRef<HTMLButtonElement>(null)

  const closeMenu = () => {
    setMobileOpen(false)
    menuBtnRef.current?.focus()
  }

  // Close the mobile menu on Escape and return focus to its trigger
  useEffect(() => {
    if (!mobileOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [mobileOpen])

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0)

      const sections = navItems.map(n => n.href.slice(1))
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && el.getBoundingClientRect().top <= 120) {
          setActive(sections[i])
          return
        }
      }
      setActive('')
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[#faf9f6]/80 dark:bg-black/70 backdrop-blur-xl border-b border-slate-200/50 dark:border-indigo-400/10 shadow-sm shadow-black/[0.02]' : 'bg-transparent'}`}>
      {/* Scroll progress bar */}
      <motion.div
        aria-hidden
        className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-indigo-500 via-violet-400 to-indigo-500 transition-opacity duration-300 ${scrolled ? 'opacity-100' : 'opacity-0'}`}
        style={{ width: `${scrollProgress}%` }}
      />

      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <motion.a
          href="#"
          className="text-lg font-extrabold gradient-text-premium"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          MK
        </motion.a>

        {/* Right cluster — nav, theme toggle, and mobile menu share one flex
            row so they can never overlap regardless of viewport width */}
        <div className="flex items-center gap-2">
          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              <a
                key={item.href}
                href={item.href}
                aria-current={active === item.href.slice(1) ? 'true' : undefined}
                className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  active === item.href.slice(1)
                    ? 'text-indigo-600 dark:text-indigo-300'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {active === item.href.slice(1) && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-indigo-50 dark:bg-indigo-500/10 rounded-full ring-1 ring-indigo-200/50 dark:ring-indigo-400/20"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </a>
            ))}
          </div>

          {/* Command palette launcher */}
          <button
            onClick={openPalette}
            aria-label="Open command palette"
            className="neon-tile hidden h-10 items-center gap-2 rounded-lg px-3 text-sm font-medium text-slate-500 dark:text-slate-400 sm:flex cursor-pointer"
          >
            <Search size={15} />
            <span className="hidden md:inline">Search</span>
            <kbd className="hidden items-center gap-0.5 rounded border border-slate-300/70 px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 dark:border-white/15 dark:text-slate-500 md:flex">⌘K</kbd>
          </button>
          <button
            onClick={openPalette}
            aria-label="Open command palette"
            className="neon-tile flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 dark:text-slate-300 sm:hidden cursor-pointer"
          >
            <Search size={18} />
          </button>

          {/* Theme toggle — inline so it sits beside the nav/menu, never on top */}
          <ThemeToggle dark={dark} toggle={toggle} />

          {/* Mobile menu toggle */}
          <button
            ref={menuBtnRef}
            onClick={() => setMobileOpen(o => !o)}
            className="md:hidden neon-tile w-10 h-10 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-300 cursor-pointer"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            role="navigation"
            aria-label="Mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden border-t border-slate-200/50 dark:border-indigo-400/10 bg-[#faf9f6]/95 dark:bg-black/95 backdrop-blur-xl"
          >
            <div className="px-6 py-4 space-y-1">
              {navItems.map(item => (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={active === item.href.slice(1) ? 'true' : undefined}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    active === item.href.slice(1)
                      ? 'text-indigo-600 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-500/10'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/[0.03]'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
