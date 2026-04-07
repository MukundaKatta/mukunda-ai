import { Briefcase } from 'lucide-react'
import { SectionHeading } from '../ui/SectionHeading'
import { ScrollReveal } from '../ui/ScrollReveal'
import { experiences } from '../../data/experience'

export function Experience() {
  return (
    <section id="experience" className="py-24 px-6 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-5xl mx-auto">
        <SectionHeading icon="🏢" title="Work Experience" />
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-700 hidden md:block" />
          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <ScrollReveal key={exp.company} delay={i * 0.1}>
                <div className="relative md:pl-16">
                  <div className="absolute left-4 top-6 w-5 h-5 rounded-full bg-teal-600 border-4 border-slate-50 dark:border-slate-900 hidden md:block z-10" />
                  <div className={`p-6 rounded-2xl border bg-white dark:bg-slate-800/50 ${exp.featured ? 'border-teal-200 dark:border-teal-800 shadow-sm' : 'border-slate-200 dark:border-slate-700'}`}>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                          <Briefcase size={18} className="text-teal-600 dark:text-teal-400 shrink-0" />
                          {exp.company}
                        </h3>
                        <p className="text-teal-600 dark:text-teal-400 font-medium text-sm">{exp.role}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs px-2.5 py-1 rounded-full bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 font-medium">{exp.type}</span>
                        <span className="text-sm text-slate-400 dark:text-slate-500 whitespace-nowrap">{exp.period}</span>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {exp.highlights.map((h, j) => (
                        <li key={j} className="text-sm text-slate-600 dark:text-slate-300 flex gap-2">
                          <span className="text-teal-500 mt-1 shrink-0">•</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
