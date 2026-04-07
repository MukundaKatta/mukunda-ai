import { SectionHeading } from '../ui/SectionHeading'
import { ScrollReveal } from '../ui/ScrollReveal'
import { skillCategories } from '../../data/skills'

const categoryColors: Record<string, string> = {
  'Languages': 'text-blue-600 dark:text-blue-400',
  'AI / LLM': 'text-amber-600 dark:text-amber-400',
  'Frontend': 'text-cyan-600 dark:text-cyan-400',
  'Backend': 'text-emerald-600 dark:text-emerald-400',
  'Cloud & DevOps': 'text-purple-600 dark:text-purple-400',
  'Data & ML': 'text-rose-600 dark:text-rose-400',
}

export function Skills() {
  return (
    <section id="skills" className="py-24 px-6 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-6xl mx-auto">
        <SectionHeading icon="⚡" title="Tech Stack" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat, i) => (
            <ScrollReveal key={cat.title} delay={i * 0.08}>
              <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50">
                <h3 className={`text-sm font-semibold uppercase tracking-wider mb-4 ${categoryColors[cat.title] || 'text-teal-600'}`}>
                  {cat.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <span
                      key={item}
                      className="text-sm px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 font-medium"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
