import { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'

export function BackToTop() {
  const [show, setShow] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      setShow(window.scrollY > 500)
      const h = document.documentElement.scrollHeight - window.innerHeight
      setProgress(h > 0 ? Math.min(100, (window.scrollY / h) * 100) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const r = 18
  const circumference = 2 * Math.PI * r

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`neon-tile fixed bottom-6 right-6 z-40 w-11 h-11 rounded-xl flex items-center justify-center text-slate-600 dark:text-indigo-200 hover:text-indigo-600 dark:hover:text-white cursor-pointer transition-all duration-300 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
      aria-label="Back to top"
    >
      {/* Circular scroll-progress ring */}
      <svg className="pointer-events-none absolute inset-0 -rotate-90" viewBox="0 0 44 44" aria-hidden>
        <circle cx="22" cy="22" r={r} fill="none" strokeWidth="2" className="stroke-slate-200 dark:stroke-white/10" />
        <circle
          cx="22"
          cy="22"
          r={r}
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          className="stroke-indigo-500 transition-[stroke-dashoffset] duration-150 dark:stroke-cyan-300"
          style={{ strokeDasharray: circumference, strokeDashoffset: circumference - (progress / 100) * circumference }}
        />
      </svg>
      <ArrowUp size={17} className="relative" />
    </button>
  )
}
