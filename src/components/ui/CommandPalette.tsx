import { useEffect, useMemo, useRef, useState, type ReactNode, type KeyboardEvent as ReactKeyboardEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, CornerDownLeft, ArrowUp, ArrowDown, Command as CommandIcon,
  Cpu, ShieldCheck, User, Layers, Briefcase, FolderGit2, Award,
  GraduationCap, Wrench, PenLine, Mail, Copy, Sun, Moon, Package, ExternalLink,
} from 'lucide-react'
import { GithubIcon, LinkedinIcon, TwitterIcon } from './SocialIcons'
import { personal } from '../../data/personal'

interface Cmd {
  id: string
  label: string
  group: string
  icon: ReactNode
  keywords?: string
  hint?: string
  run: () => void
}

const goto = (id: string) => () => { window.location.hash = id }
const openUrl = (url: string) => () => window.open(url, '_blank', 'noopener,noreferrer')

export function CommandPalette({ dark, toggle }: { dark: boolean; toggle: () => void }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const [copied, setCopied] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const restoreFocus = useRef<HTMLElement | null>(null)

  const commands = useMemo<Cmd[]>(() => [
    { id: 'systems', group: 'Navigate', label: 'Systems', icon: <Cpu size={16} />, keywords: 'architecture ai', run: goto('systems') },
    { id: 'proof', group: 'Navigate', label: 'Proof of Work', icon: <ShieldCheck size={16} />, keywords: 'impact metrics', run: goto('proof') },
    { id: 'about', group: 'Navigate', label: 'About', icon: <User size={16} />, run: goto('about') },
    { id: 'what-i-do', group: 'Navigate', label: 'What I Do', icon: <Layers size={16} />, keywords: 'services', run: goto('what-i-do') },
    { id: 'experience', group: 'Navigate', label: 'Experience', icon: <Briefcase size={16} />, keywords: 'work history jobs', run: goto('experience') },
    { id: 'projects', group: 'Navigate', label: 'Projects', icon: <FolderGit2 size={16} />, keywords: 'open source', run: goto('projects') },
    { id: 'certifications', group: 'Navigate', label: 'Certifications', icon: <Award size={16} />, keywords: 'aws anthropic', run: goto('certifications') },
    { id: 'education', group: 'Navigate', label: 'Education', icon: <GraduationCap size={16} />, run: goto('education') },
    { id: 'skills', group: 'Navigate', label: 'Tech Stack', icon: <Wrench size={16} />, keywords: 'skills tools', run: goto('skills') },
    { id: 'blog', group: 'Navigate', label: 'Writing', icon: <PenLine size={16} />, keywords: 'blog articles', run: goto('blog') },
    { id: 'contact', group: 'Navigate', label: 'Contact', icon: <Mail size={16} />, keywords: 'hire email', run: goto('contact') },

    { id: 'email', group: 'Actions', label: 'Email me', icon: <Mail size={16} />, hint: personal.email, run: () => { window.location.href = `mailto:${personal.email}?subject=Let's%20work%20together` } },
    { id: 'copy-email', group: 'Actions', label: 'Copy email address', icon: <Copy size={16} />, keywords: 'clipboard', run: () => { navigator.clipboard?.writeText(personal.email); setCopied(true) } },
    { id: 'theme', group: 'Actions', label: dark ? 'Switch to light mode' : 'Switch to dark mode', icon: dark ? <Sun size={16} /> : <Moon size={16} />, keywords: 'theme dark light toggle', run: toggle },
    { id: 'packages', group: 'Actions', label: 'View all open-source packages', icon: <Package size={16} />, hint: 'npm · PyPI · crates', run: () => { window.location.href = '/packages.html' } },
    { id: 'github', group: 'Links', label: 'GitHub', icon: <GithubIcon size={16} />, hint: '@MukundaKatta', run: openUrl(personal.github) },
    { id: 'linkedin', group: 'Links', label: 'LinkedIn', icon: <LinkedinIcon size={16} />, run: openUrl(personal.linkedin) },
    { id: 'x', group: 'Links', label: 'X / Twitter', icon: <TwitterIcon size={16} />, hint: '@katta_mukunda', run: openUrl(personal.twitter) },
  ], [dark, toggle])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return commands
    return commands.filter(c =>
      (c.label + ' ' + c.group + ' ' + (c.keywords ?? '')).toLowerCase().includes(q)
    )
  }, [query, commands])

  // Group preserving order of first appearance
  const groups = useMemo(() => {
    const map = new Map<string, Cmd[]>()
    for (const c of filtered) {
      const arr = map.get(c.group)
      if (arr) arr.push(c)
      else map.set(c.group, [c])
    }
    return Array.from(map.entries())
  }, [filtered])

  const openRef = useRef(false)
  openRef.current = open

  const openPalette = () => {
    restoreFocus.current = document.activeElement as HTMLElement
    setQuery('')
    setActive(0)
    setCopied(false)
    setOpen(true)
  }
  const closePalette = () => {
    setOpen(false)
    restoreFocus.current?.focus?.()
  }

  // Global hotkey: Cmd/Ctrl+K toggles; custom event opens (from header button)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        if (openRef.current) closePalette()
        else openPalette()
      }
    }
    const onOpen = () => openPalette()
    window.addEventListener('keydown', onKey)
    window.addEventListener('open-command-palette', onOpen)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('open-command-palette', onOpen)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (open) requestAnimationFrame(() => inputRef.current?.focus())
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])
  useEffect(() => { setActive(0) }, [query])

  // Keep active option in view
  useEffect(() => {
    if (!open) return
    const el = listRef.current?.querySelector<HTMLElement>(`[data-idx="${active}"]`)
    el?.scrollIntoView({ block: 'nearest' })
  }, [active, open])

  const onListKey = (e: ReactKeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive(a => Math.min(a + 1, filtered.length - 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(a => Math.max(a - 1, 0)) }
    else if (e.key === 'Enter') {
      e.preventDefault()
      const cmd = filtered[active]
      if (cmd) { const keepOpen = cmd.id === 'copy-email' || cmd.id === 'theme'; cmd.run(); if (!keepOpen) closePalette() }
    } else if (e.key === 'Escape') { e.preventDefault(); closePalette() }
  }

  // flat index lookup for rendering
  let flatIdx = -1

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-start justify-center px-4 pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <button
            aria-label="Close command palette"
            className="absolute inset-0 cursor-default bg-slate-900/40 backdrop-blur-sm dark:bg-black/60"
            onClick={closePalette}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-slate-200 bg-white/95 shadow-2xl backdrop-blur-2xl dark:border-indigo-400/20 dark:bg-[#0a0a14]/95 dark:shadow-[0_30px_120px_-40px_rgba(99,102,241,0.6)]"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.985 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            onKeyDown={onListKey}
          >
            <div className="flex items-center gap-3 border-b border-slate-200/80 px-4 dark:border-white/10">
              <Search size={18} className="text-slate-400 dark:text-slate-500" />
              <input
                ref={inputRef}
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search or jump to…"
                aria-label="Search commands"
                className="flex-1 bg-transparent py-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none dark:text-white"
              />
              <kbd className="hidden items-center gap-1 rounded border border-slate-200 px-1.5 py-0.5 text-[10px] font-medium text-slate-400 sm:flex dark:border-white/10 dark:text-slate-500">esc</kbd>
            </div>

            <div ref={listRef} className="max-h-[52vh] overflow-y-auto overscroll-contain p-2">
              {filtered.length === 0 && (
                <p className="px-3 py-8 text-center text-sm text-slate-400 dark:text-slate-500">No results for "{query}"</p>
              )}
              {groups.map(([group, items]) => (
                <div key={group} className="mb-1">
                  <p className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">{group}</p>
                  {items.map(cmd => {
                    flatIdx += 1
                    const idx = flatIdx
                    const isActive = idx === active
                    return (
                      <button
                        key={cmd.id}
                        data-idx={idx}
                        onMouseMove={() => setActive(idx)}
                        onClick={() => { const keepOpen = cmd.id === 'copy-email' || cmd.id === 'theme'; cmd.run(); if (!keepOpen) closePalette() }}
                        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                          isActive
                            ? 'bg-indigo-50 text-indigo-900 dark:bg-indigo-500/15 dark:text-white'
                            : 'text-slate-600 dark:text-slate-300'
                        }`}
                      >
                        <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${isActive ? 'text-indigo-600 dark:text-cyan-200' : 'text-slate-400 dark:text-slate-500'}`}>
                          {cmd.icon}
                        </span>
                        <span className="flex-1 font-medium">{cmd.label}</span>
                        {cmd.id === 'copy-email' && copied && <span className="text-xs font-semibold text-emerald-500">Copied!</span>}
                        {cmd.hint && !(cmd.id === 'copy-email' && copied) && (
                          <span className="hidden text-xs text-slate-400 sm:inline dark:text-slate-500">{cmd.hint}</span>
                        )}
                        {cmd.group === 'Links' ? <ExternalLink size={13} className="text-slate-300 dark:text-slate-600" /> : isActive && <CornerDownLeft size={13} className="text-slate-400 dark:text-slate-500" />}
                      </button>
                    )
                  })}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between border-t border-slate-200/80 px-4 py-2.5 text-[11px] text-slate-400 dark:border-white/10 dark:text-slate-500">
              <span className="flex items-center gap-2">
                <kbd className="flex items-center gap-0.5 rounded border border-slate-200 px-1.5 py-0.5 dark:border-white/10"><ArrowUp size={10} /><ArrowDown size={10} /></kbd>
                navigate
                <kbd className="flex items-center gap-1 rounded border border-slate-200 px-1.5 py-0.5 dark:border-white/10"><CornerDownLeft size={10} /></kbd>
                select
              </span>
              <span className="flex items-center gap-1.5"><CommandIcon size={11} /> Command palette</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
