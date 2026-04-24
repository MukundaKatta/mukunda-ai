import { motion } from 'framer-motion'
import { ArrowUpRight, BadgeCheck, CircuitBoard, Gauge, Landmark, ShieldCheck } from 'lucide-react'
import { ScrollReveal } from '../ui/ScrollReveal'

const impactRows = [
  {
    icon: Landmark,
    label: 'Enterprise AI',
    value: 'Fortune 100',
    detail: 'Production AI systems built for governed, high-scale environments.',
  },
  {
    icon: Gauge,
    label: 'Performance',
    value: '600x',
    detail: 'Retrieval latency improvement through cloud architecture redesign.',
  },
  {
    icon: ShieldCheck,
    label: 'Trust Layer',
    value: '23 tests',
    detail: 'Automated model-risk evaluation across privacy, bias, and grounding.',
  },
  {
    icon: CircuitBoard,
    label: 'Knowledge Ops',
    value: '30k+',
    detail: 'Enterprise records processed through ingestion and evaluation loops.',
  },
]

const operatingPrinciples = [
  'Systems over demos',
  'Evals before applause',
  'Security by default',
  'Cloud-native delivery',
]

export function ImpactBoard() {
  return (
    <section id="proof" className="relative overflow-hidden bg-[#05060d] px-6 py-20 text-white">
      <div className="absolute inset-0 line-grid opacity-25" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(34,211,238,0.11),transparent_44%),linear-gradient(180deg,rgba(0,0,0,0.18),rgba(0,0,0,0.76))]" />

      <div className="relative mx-auto max-w-6xl">
        <ScrollReveal>
          <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200/80">Proof Of Work</p>
              <h2 className="font-display mt-3 max-w-3xl text-4xl leading-tight md:text-5xl">
                The page should feel like the work: measurable, calm, and impossible to fake.
              </h2>
            </div>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.045] px-4 py-3 text-sm font-semibold text-slate-100 transition-colors hover:bg-white/[0.08]"
            >
              Inspect projects
              <ArrowUpRight size={15} />
            </a>
          </div>
        </ScrollReveal>

        <div className="grid gap-4 lg:grid-cols-[1fr_0.68fr]">
          <ScrollReveal delay={0.08}>
            <div className="premium-panel p-4">
              <div className="grid gap-3 md:grid-cols-2">
                {impactRows.map(({ icon: Icon, label, value, detail }, index) => (
                  <motion.div
                    key={label}
                    className="relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.045] p-5"
                    whileHover={{ y: -4 }}
                    transition={{ type: 'spring', stiffness: 360, damping: 28 }}
                  >
                    <motion.div
                      aria-hidden
                      className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/70 to-transparent"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 3.6, delay: index * 0.28, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <div className="mb-5 flex items-center justify-between gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-cyan-200/15 bg-cyan-300/10 text-cyan-100">
                        <Icon size={20} />
                      </div>
                      <span className="rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-200">
                        verified
                      </span>
                    </div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{label}</p>
                    <p className="mt-2 text-4xl font-extrabold text-white">{value}</p>
                    <p className="mt-3 text-sm leading-relaxed text-slate-400">{detail}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.16}>
            <div className="h-full rounded-lg border border-white/10 bg-black/40 p-5 backdrop-blur-xl">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-indigo-200/15 bg-indigo-300/10 text-indigo-100">
                  <BadgeCheck size={18} />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Operating Standard</p>
                  <p className="mt-1 text-xs text-slate-500">How the portfolio is positioned</p>
                </div>
              </div>

              <div className="space-y-3">
                {operatingPrinciples.map((principle, index) => (
                  <motion.div
                    key={principle}
                    className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3"
                    animate={{ opacity: [0.75, 1, 0.75] }}
                    transition={{ duration: 3.4, delay: index * 0.35, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <span className="text-sm font-semibold text-slate-200">{principle}</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-200 shadow-[0_0_18px_rgba(103,232,249,0.8)]" />
                  </motion.div>
                ))}
              </div>

              <div className="mt-5 rounded-lg border border-white/10 bg-white/[0.035] p-4">
                <p className="font-mono text-xs leading-relaxed text-slate-300">
                  Portfolio signal: senior AI/ML engineer who can design, ship, govern, and explain production systems.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
