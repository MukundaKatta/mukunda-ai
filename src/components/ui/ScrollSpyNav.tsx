import { useEffect, useState } from 'react'

const sections = [
  { id: 'systems', label: 'Systems' },
  { id: 'proof', label: 'Proof' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

/**
 * Premium vertical scroll-spy rail (desktop only). Tracks the section in view
 * and lets the user jump between them; labels reveal on hover.
 */
export function ScrollSpyNav() {
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => {
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id)
        if (el && el.getBoundingClientRect().top <= 140) {
          setActive(sections[i].id)
          return
        }
      }
      setActive('')
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      aria-label="Section navigation"
      className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-3 lg:flex"
    >
      {sections.map(({ id, label }) => {
        const isActive = active === id
        return (
          <a
            key={id}
            href={`#${id}`}
            aria-label={label}
            aria-current={isActive ? 'true' : undefined}
            className="group flex items-center justify-end gap-2.5"
          >
            <span
              className={`pointer-events-none rounded-md border border-slate-200/70 bg-white/80 px-2 py-1 text-[11px] font-semibold text-slate-600 opacity-0 shadow-sm backdrop-blur-md transition-all duration-300 group-hover:opacity-100 dark:border-white/10 dark:bg-black/70 dark:text-slate-200 ${
                isActive ? 'translate-x-0' : 'translate-x-1'
              }`}
            >
              {label}
            </span>
            <span className="relative flex h-2.5 w-2.5 items-center justify-center">
              <span
                className={`block rounded-full transition-all duration-300 ${
                  isActive
                    ? 'h-2.5 w-2.5 bg-indigo-500 shadow-[0_0_12px_rgba(99,102,241,0.8)] dark:bg-cyan-300 dark:shadow-[0_0_14px_rgba(34,211,238,0.85)]'
                    : 'h-1.5 w-1.5 bg-slate-300 group-hover:bg-indigo-400 dark:bg-slate-600 dark:group-hover:bg-cyan-300/70'
                }`}
              />
            </span>
          </a>
        )
      })}
    </nav>
  )
}
