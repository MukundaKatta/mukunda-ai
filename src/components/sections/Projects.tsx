import { motion } from 'framer-motion'
import { ExternalLink, ArrowUpRight, Gauge } from 'lucide-react'
import { GithubIcon } from '../ui/SocialIcons'
import { SectionHeading } from '../ui/SectionHeading'
import { ScrollReveal } from '../ui/ScrollReveal'
import { MatrixRain } from '../ui/MatrixRain'
import { projects } from '../../data/projects'

const statusStyles: Record<string, string> = {
  'open-source': 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800/50',
  live: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800/50',
  private: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700',
  building: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800/50',
}

const statusLabels: Record<string, string> = {
  'open-source': 'Open Source',
  live: 'Live',
  private: 'Private',
  building: 'Building',
}

export function Projects() {
  return (
    <section id="projects" className="relative overflow-hidden bg-[#f7f6f1] px-6 py-28 dark:bg-[#030308]">
      <div className="absolute inset-0 hidden dark:block">
        <MatrixRain intensity="subtle" />
      </div>
      <div className="absolute inset-0 hidden dark:block bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.55)_100%)] pointer-events-none" />
      <div className="absolute inset-0 dot-grid opacity-40 dark:opacity-0" />

      <div className="relative max-w-6xl mx-auto">
        <SectionHeading kicker="03" title="Featured Projects" />
        <div className="mb-8 grid gap-3 md:grid-cols-3">
          {[
            ['Agentic AI', 'Runtimes, tools, memory, routing'],
            ['Grounded RAG', 'Retrieval, evals, reranking, cache'],
            ['Production Edge', 'Security, scale, observability'],
          ].map(([label, detail]) => (
            <div key={label} className="rounded-lg border border-slate-200 bg-white/80 p-4 shadow-sm dark:border-white/10 dark:bg-white/[0.04]">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-600 dark:text-cyan-200/80">{label}</p>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{detail}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project, i) => (
            <ScrollReveal key={project.name} delay={i * 0.06}>
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white/[0.92] p-5 shadow-[0_22px_70px_-50px_rgba(15,23,42,0.45)] backdrop-blur-xl dark:border-white/10 dark:bg-[#080914]/[0.82] dark:shadow-[0_18px_70px_-42px_rgba(99,102,241,0.45)]"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative mb-4 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="flex items-center gap-1.5 text-lg font-bold text-slate-950 transition-colors group-hover:text-indigo-600 dark:text-white dark:group-hover:text-cyan-200">
                      {project.name}
                      <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <p className="mt-1 text-sm font-medium text-indigo-600 dark:text-indigo-300">{project.tagline}</p>
                  </div>
                  <span className={`whitespace-nowrap rounded-full border px-3 py-1 text-xs font-medium ${statusStyles[project.status]}`}>
                    {project.status === 'live' && <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500 mr-1.5 animate-pulse" />}
                    {statusLabels[project.status]}
                  </span>
                </div>

                <div className="relative mb-4 rounded-lg border border-slate-200 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-black/[0.24]">
                  <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-500">
                    <Gauge size={14} />
                    proof signal
                  </div>
                  <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-200">{project.proof}</p>
                  <div className="mt-4 inline-flex rounded-md border border-indigo-200 bg-indigo-50 px-2.5 py-1 text-xs font-bold text-indigo-700 dark:border-cyan-200/15 dark:bg-cyan-300/10 dark:text-cyan-100">
                    {project.metric}
                  </div>
                </div>

                <p className="relative mb-4 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{project.description}</p>

                <div className="relative flex flex-wrap gap-1.5 mb-4">
                  {project.tags.map((tag) => (
                    <span key={tag} className="rounded-md border border-slate-200/70 bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:border-white/10 dark:bg-white/[0.045] dark:text-slate-300">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="relative flex gap-4 border-t border-slate-100 pt-3 dark:border-white/10">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-indigo-600 dark:text-slate-400 dark:hover:text-cyan-200">
                      <GithubIcon size={16} /> Code
                    </a>
                  )}
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-indigo-600 dark:text-slate-400 dark:hover:text-cyan-200">
                      <ExternalLink size={16} /> Live Demo
                    </a>
                  )}
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
