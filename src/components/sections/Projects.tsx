import { ExternalLink } from 'lucide-react'
import { GithubIcon } from '../ui/SocialIcons'
import { SectionHeading } from '../ui/SectionHeading'
import { ScrollReveal } from '../ui/ScrollReveal'
import { projects } from '../../data/projects'

const statusStyles: Record<string, string> = {
  'open-source': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  live: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  private: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
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
    <section id="projects" className="py-24 px-6 bg-white dark:bg-slate-950">
      <div className="max-w-6xl mx-auto">
        <SectionHeading icon="🛠" title="Featured Projects" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ScrollReveal key={project.name} delay={i * 0.06}>
              <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 card-hover h-full flex flex-col">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">{project.name}</h3>
                    <p className="text-sm text-teal-600 dark:text-teal-400 font-medium">{project.tagline}</p>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium whitespace-nowrap ${statusStyles[project.status]}`}>
                    {statusLabels[project.status]}
                  </span>
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4 flex-1">{project.description}</p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-600">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener" className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                      <GithubIcon size={15} /> Code
                    </a>
                  )}
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noopener" className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                      <ExternalLink size={15} /> Live
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
