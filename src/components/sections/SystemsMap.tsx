import { motion } from 'framer-motion'
import { BrainCircuit, DatabaseZap, Gauge, ShieldCheck, CloudCog } from 'lucide-react'
import { ScrollReveal } from '../ui/ScrollReveal'

const layers = [
  {
    icon: BrainCircuit,
    label: 'Agent Runtime',
    detail: 'Tools, memory, model routing, and orchestration',
  },
  {
    icon: DatabaseZap,
    label: 'Grounding Layer',
    detail: 'Hybrid retrieval, reranking, evals, and semantic cache',
  },
  {
    icon: ShieldCheck,
    label: 'Trust Controls',
    detail: 'PII checks, hallucination detection, governance gates',
  },
  {
    icon: CloudCog,
    label: 'Cloud Platform',
    detail: 'AWS, Bedrock, OpenSearch, FastAPI, Kubernetes',
  },
]

const proofPoints = [
  { label: 'Cost discipline', value: '78%', caption: 'infra cost reduction' },
  { label: 'Retrieval speed', value: '600x', caption: 'latency improvement' },
  { label: 'Knowledge scale', value: '30k+', caption: 'enterprise records' },
]

export function SystemsMap() {
  return (
    <section id="systems" className="relative overflow-hidden bg-black px-6 py-24 text-white">
      <div className="absolute inset-0 line-grid opacity-35" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.96),rgba(3,7,18,0.88)_42%,rgba(0,0,0,0.96))]" />

      <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <ScrollReveal>
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200/80">Production AI Architecture</p>
            <h2 className="font-display max-w-2xl text-4xl leading-tight text-white md:text-5xl">
              A portfolio built around systems, not screenshots.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300">
              The work centers on dependable AI: grounded retrieval, measurable quality, model risk controls, and cloud platforms that can move from prototype to production without losing their shape.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-3">
              {proofPoints.map((point) => (
                <div key={point.label} className="border-l border-cyan-200/25 pl-4">
                  <p className="text-3xl font-extrabold text-white">{point.value}</p>
                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">{point.label}</p>
                  <p className="mt-1 text-xs text-slate-300">{point.caption}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.12}>
          <div className="premium-panel relative p-5 md:p-6">
            <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="text-sm font-semibold text-white">AI Delivery Control Plane</p>
                <p className="mt-1 text-xs text-slate-400">Research → Build → Evaluate → Deploy</p>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-200">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                online
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {layers.map(({ icon: Icon, label, detail }, index) => (
                <motion.div
                  key={label}
                  whileHover={{ y: -3 }}
                  transition={{ type: 'spring', stiffness: 360, damping: 28 }}
                  className="rounded-lg border border-white/10 bg-white/[0.045] p-4"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-200/15 bg-cyan-300/10 text-cyan-100">
                      <Icon size={19} />
                    </div>
                    <span className="font-mono text-xs text-slate-500">0{index + 1}</span>
                  </div>
                  <h3 className="text-base font-bold text-white">{label}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{detail}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-3 rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-sm text-slate-300">
              <Gauge size={16} className="text-indigo-200" />
              <span>Quality loops stay visible: evals, observability, governance, and rollback paths.</span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
