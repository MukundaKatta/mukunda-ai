import { Moon, Sun } from 'lucide-react'

/**
 * Fixed-position button for switching between light and dark themes.
 *
 * Renders a sun icon while in dark mode and a moon icon while in light mode, and
 * calls `toggle` on click. Pair it with {@link useTheme}, which owns the actual
 * theme state and persistence.
 *
 * @param props.dark - Whether dark mode is currently active (controls which icon shows).
 * @param props.toggle - Callback invoked when the button is pressed.
 */
export function ThemeToggle({ dark, toggle }: { dark: boolean; toggle: () => void }) {
  return (
    <button
      onClick={toggle}
      className="fixed top-6 right-6 z-50 w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer
        bg-white dark:bg-[#0a0a14]
        border border-slate-200 dark:border-indigo-400/25
        shadow-sm dark:shadow-[0_0_24px_-6px_rgba(99,102,241,0.45)]
        hover:border-indigo-400 dark:hover:border-indigo-400/60
        hover:shadow-md dark:hover:shadow-[0_0_32px_-4px_rgba(129,140,248,0.6)]
        transition-all duration-200"
      aria-label="Toggle theme"
    >
      {dark
        ? <Sun size={17} className="text-indigo-200" />
        : <Moon size={17} className="text-slate-600" />}
    </button>
  )
}
