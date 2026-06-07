import { useState, useEffect } from 'react'

/**
 * React hook for the site-wide light/dark theme.
 *
 * On first render it reads the persisted preference from `localStorage` (key
 * `"theme"`), falling back to dark mode when nothing is stored or when rendered
 * without a DOM (`typeof window === 'undefined'`). Whenever the value changes it
 * toggles the `dark` class on `<html>` and writes the new preference back to
 * `localStorage`, so the choice survives reloads.
 *
 * The matching inline script in `index.html` applies the same preference before
 * hydration to prevent a flash of the wrong theme.
 *
 * @returns An object with the current `dark` flag and a `toggle` function that flips it.
 *
 * @example
 * ```tsx
 * const { dark, toggle } = useTheme()
 * return <ThemeToggle dark={dark} toggle={toggle} />
 * ```
 */
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

  return { dark, toggle: () => setDark(d => !d) }
}
