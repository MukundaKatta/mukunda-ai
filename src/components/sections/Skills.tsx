import { SectionHeading } from '../ui/SectionHeading'
import { ScrollReveal } from '../ui/ScrollReveal'
import { skillCategories } from '../../data/skills'

const categoryColors: Record<string, { text: string; bg: string; border: string }> = {
  'Languages': { text: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/20', border: 'border-blue-200 dark:border-blue-800/50' },
  'AI / LLM': { text: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-900/20', border: 'border-amber-200 dark:border-amber-800/50' },
  'Frontend': { text: 'text-cyan-600 dark:text-cyan-400', bg: 'bg-cyan-50 dark:bg-cyan-900/20', border: 'border-cyan-200 dark:border-cyan-800/50' },
  'Backend': { text: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-900/20', border: 'border-emerald-200 dark:border-emerald-800/50' },
  'Cloud & DevOps': { text: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-900/20', border: 'border-purple-200 dark:border-purple-800/50' },
  'Data & ML': { text: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-50 dark:bg-rose-900/20', border: 'border-rose-200 dark:border-rose-800/50' },
}

export function Skills() {
  return (
    <section id="skills" className="py-24 px-6 bg-white dark:bg-slate-950">
      <div className="max-w-6xl mx-auto">
        <SectionHeading icon="⚡" title="Tech Stack" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat, i) => {
            const colors = categoryColors[cat.title] || { text: 'text-teal-600', bg: 'bg-teal-50', border: 'border-teal-200' }
            return (
              <ScrollReveal key={cat.title} delay={i * 0.08}>
                <div className={`p-6 rounded-2xl border bg-white/80 dark:bg-slate-800/40 backdrop-blur-sm card-hover ${colors.border}`}>
                  <h3 className={`text-sm font-semibold uppercase tracking-wider mb-4 ${colors.text}`}>
                    {cat.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {cat.items.map((item) => (
                      <span
                        key={item}
                        className={`text-sm px-3 py-1.5 rounded-lg font-medium border transition-all duration-200 hover:scale-105 cursor-default ${colors.bg} ${colors.border} text-slate-700 dark:text-slate-200`}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
