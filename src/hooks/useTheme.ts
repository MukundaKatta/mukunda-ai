import { useState, useEffect } from 'react'

export function useTheme() {
  const [dark, setDark] = useState(() => {
    if (typeof window === 'undefined') return true
    const stored = localStorage.getItem('theme')
    if (stored) return stored === 'dark'
    return true // default: dark
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  const toggle = () => {
    // Briefly enable a global color cross-fade for a premium theme switch
    const root = document.documentElement
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!reduce) {
      root.classList.add('theme-anim')
      window.setTimeout(() => root.classList.remove('theme-anim'), 480)
    }
    setDark(d => !d)
  }

  return { dark, toggle }
}
