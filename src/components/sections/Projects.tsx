import { ExternalLink } from 'lucide-react'
import { GithubIcon } from '../ui/SocialIcons'
import { SectionHeading } from '../ui/SectionHeading'
import { ScrollReveal } from '../ui/ScrollReveal'
import { projects } from '../../data/projects'

const statusStyles: Record<string, string> = {
  'open-source': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  live: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 pulse-dot',
  private: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
  building: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
}

const statusLabels: Record<string, string> = {
  'open-source': 'Open Source',
  live: 'Live',
  private: 'Private',
  building: 'Building',
}

export function Projects() {
  return (
    <section id="projects" className="py-24 px-6 bg-slate-50/50 dark:bg-slate-900/50 dot-grid">
      <div className="max-w-6xl mx-auto">
        <SectionHeading icon="🛠" title="Featured Projects" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ScrollReveal key={project.name} delay={i * 0.06}>
              <div className="group p-6 rounded-2xl border border-slate-200 dark:border-slate-700/50 bg-white/80 dark:bg-slate-800/40 backdrop-blur-sm card-hover h-full flex flex-col">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">{project.name}</h3>
                    <p className="text-sm text-teal-600 dark:text-teal-400 font-medium">{project.tagline}</p>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full font-medium whitespace-nowrap ml-3 ${statusStyles[project.status]}`}>
                    {statusLabels[project.status]}
                  </span>
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4 flex-1">{project.description}</p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 border border-slate-200/50 dark:border-slate-600/50 font-medium">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4 pt-2 border-t border-slate-100 dark:border-slate-700/50">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener" className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors font-medium">
                      <GithubIcon size={16} /> View Code
                    </a>
                  )}
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noopener" className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors font-medium">
                      <ExternalLink size={16} /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
