import { motion } from 'framer-motion'
import { ExternalLink, ArrowUpRight } from 'lucide-react'
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
    <section id="projects" className="relative py-28 px-6 bg-[#f5f3ec] dark:bg-[#030308] overflow-hidden">
      <div className="absolute inset-0 hidden dark:block">
        <MatrixRain intensity="subtle" />
      </div>
      <div className="absolute inset-0 hidden dark:block bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.55)_100%)] pointer-events-none" />
      <div className="absolute inset-0 dot-grid opacity-40 dark:opacity-0" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/[0.03] rounded-full blur-[100px] -translate-y-1/4 translate-x-1/4 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        <SectionHeading kicker="03" title="Featured Projects" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((project, i) => (
            <ScrollReveal key={project.name} delay={i * 0.06}>
              <motion.div
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="group p-6 md:p-7 rounded-2xl border border-slate-200 dark:border-indigo-400/15 bg-white/90 dark:bg-[#0a0a14]/70 backdrop-blur-xl h-full flex flex-col relative overflow-hidden dark:shadow-[0_8px_40px_-12px_rgba(99,102,241,0.15)]"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-indigo-500/[0.06] rounded-full blur-[40px]" />
                </div>

                <div className="relative flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                      {project.name}
                      <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <p className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">{project.tagline}</p>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full font-medium whitespace-nowrap ml-3 border ${statusStyles[project.status]}`}>
                    {project.status === 'live' && <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500 mr-1.5 animate-pulse" />}
                    {statusLabels[project.status]}
                  </span>
                </div>

                <p className="relative text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4 flex-1">{project.description}</p>

                <div className="relative flex flex-wrap gap-1.5 mb-4">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 border border-slate-200/50 dark:border-slate-600/50 font-medium">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="relative flex gap-4 pt-3 border-t border-slate-100 dark:border-slate-700/50">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener" className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium">
                      <GithubIcon size={16} /> Code
                    </a>
                  )}
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noopener" className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium">
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
