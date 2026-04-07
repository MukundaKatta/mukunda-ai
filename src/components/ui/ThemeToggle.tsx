import { Moon, Sun } from 'lucide-react'

export function ThemeToggle({ dark, toggle }: { dark: boolean; toggle: () => void }) {
  return (
    <button
      onClick={toggle}
      className="fixed top-6 right-6 z-50 p-2.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md hover:shadow-lg transition-all cursor-pointer"
      aria-label="Toggle theme"
    >
      {dark ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-slate-600" />}
    </button>
  )
}
