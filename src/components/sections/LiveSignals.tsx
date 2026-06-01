import { motion } from 'framer-motion'
import { Activity, GitBranch, PackageCheck, Radio, Rocket, ShieldCheck } from 'lucide-react'

const signals = [
  { icon: Radio, label: 'Availability', value: 'Open to AI platform roles', tone: 'emerald' },
  { icon: GitBranch, label: 'Build Stream', value: 'Agentic systems + RAG tooling', tone: 'cyan' },
  { icon: PackageCheck, label: 'Open Source', value: 'Karna · MCPForge · AgentRAG', tone: 'indigo' },
  { icon: ShieldCheck, label: 'Operating Mode', value: 'Production trust, evals, governance', tone: 'violet' },
  { icon: Rocket, label: 'Deployment', value: 'Vercel production ready', tone: 'blue' },
  { icon: Activity, label: 'Signal', value: 'Shipping practical AI infrastructure', tone: 'slate' },
]

const toneClasses: Record<string, string> = {
  emerald: 'text-emerald-200 bg-emerald-300/10 border-emerald-200/15',
  cyan: 'text-cyan-200 bg-cyan-300/10 border-cyan-200/15',
  indigo: 'text-indigo-200 bg-indigo-300/10 border-indigo-200/15',
  violet: 'text-violet-200 bg-violet-300/10 border-violet-200/15',
  blue: 'text-blue-200 bg-blue-300/10 border-blue-200/15',
  slate: 'text-slate-200 bg-slate-300/10 border-slate-200/15',
}

export function LiveSignals() {
  const tickerSignals = [...signals, ...signals]

  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-black py-8 text-white">
      <div className="absolute inset-0 line-grid opacity-25" />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200/80">Live Signals</p>
            <h2 className="mt-2 text-xl font-bold text-white">Current operating posture</h2>
          </div>
          <p className="text-sm text-slate-400">Updated from the live portfolio surface</p>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          {signals.map(({ icon: Icon, label, value, tone }) => (
            <div key={label} className="group rounded-lg border border-white/10 bg-white/[0.04] p-4 transition-colors hover:bg-white/[0.07]">
              <div className="flex items-start gap-3">
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${toneClasses[tone]}`}>
                  <Icon size={17} />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">{label}</p>
                  <p className="mt-1 text-sm font-medium leading-snug text-slate-100">{value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative mt-6 overflow-hidden border-y border-white/10 bg-white/[0.025] py-3">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-black to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-black to-transparent" />
        <motion.div
          className="flex w-max gap-3 px-6"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 34, repeat: Infinity, ease: 'linear' }}
        >
          {tickerSignals.map(({ label, value }, index) => (
            <div key={`${label}-${index}`} className="flex items-center gap-3 rounded-full border border-white/10 bg-black/35 px-4 py-2 text-xs text-slate-300">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-200 shadow-[0_0_18px_rgba(103,232,249,0.8)]" />
              <span className="font-semibold uppercase tracking-[0.16em] text-slate-500">{label}</span>
              <span className="text-slate-200">{value}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
