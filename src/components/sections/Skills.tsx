import { motion } from 'framer-motion'
import { SectionHeading } from '../ui/SectionHeading'
import { ScrollReveal } from '../ui/ScrollReveal'
import { skillCategories } from '../../data/skills'

const categoryColors: Record<string, { text: string; bg: string; border: string; accent: string }> = {
  'Languages': { text: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/20', border: 'border-blue-200 dark:border-blue-800/50', accent: 'group-hover:border-blue-300 dark:group-hover:border-blue-700' },
  'AI / LLM': { text: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-900/20', border: 'border-amber-200 dark:border-amber-800/50', accent: 'group-hover:border-amber-300 dark:group-hover:border-amber-700' },
  'Frontend': { text: 'text-cyan-600 dark:text-cyan-400', bg: 'bg-cyan-50 dark:bg-cyan-900/20', border: 'border-cyan-200 dark:border-cyan-800/50', accent: 'group-hover:border-cyan-300 dark:group-hover:border-cyan-700' },
  'Backend & APIs': { text: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-900/20', border: 'border-emerald-200 dark:border-emerald-800/50', accent: 'group-hover:border-emerald-300 dark:group-hover:border-emerald-700' },
  'Cloud & DevOps': { text: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-900/20', border: 'border-purple-200 dark:border-purple-800/50', accent: 'group-hover:border-purple-300 dark:group-hover:border-purple-700' },
  'Data & ML': { text: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-50 dark:bg-rose-900/20', border: 'border-rose-200 dark:border-rose-800/50', accent: 'group-hover:border-rose-300 dark:group-hover:border-rose-700' },
  'Databases': { text: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-50 dark:bg-indigo-900/20', border: 'border-indigo-200 dark:border-indigo-800/50', accent: 'group-hover:border-indigo-300 dark:group-hover:border-indigo-700' },
  'Observability & Quality': { text: 'text-teal-600 dark:text-teal-400', bg: 'bg-teal-50 dark:bg-teal-900/20', border: 'border-teal-200 dark:border-teal-800/50', accent: 'group-hover:border-teal-300 dark:group-hover:border-teal-700' },
}

export function Skills() {
  return (
    <section id="skills" className="relative py-28 px-6 bg-white dark:bg-slate-950">
      <div className="max-w-6xl mx-auto">
        <SectionHeading icon="⚡" title="Tech Stack" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillCategories.map((cat, i) => {
            const colors = categoryColors[cat.title] || { text: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-900/20', border: 'border-emerald-200 dark:border-emerald-800/50', accent: '' }
            return (
              <ScrollReveal key={cat.title} delay={i * 0.06}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  className={`group p-6 rounded-2xl border bg-white/90 dark:bg-slate-800/50 backdrop-blur-sm transition-all duration-300 ${colors.border} ${colors.accent}`}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <div className={`w-2 h-2 rounded-full`} style={{ backgroundColor: colors.text.includes('blue') ? '#3b82f6' : colors.text.includes('amber') ? '#d97706' : colors.text.includes('cyan') ? '#0891b2' : colors.text.includes('emerald') ? '#059669' : colors.text.includes('purple') ? '#9333ea' : colors.text.includes('rose') ? '#e11d48' : colors.text.includes('indigo') ? '#4f46e5' : '#0d9488' }} />
                    <h3 className={`text-sm font-bold uppercase tracking-wider ${colors.text}`}>
                      {cat.title}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cat.items.map((item, j) => (
                      <motion.span
                        key={item}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.06 + j * 0.03 }}
                        whileHover={{ scale: 1.08 }}
                        className={`text-sm px-3 py-1.5 rounded-lg font-medium border transition-colors duration-200 cursor-default ${colors.bg} ${colors.border} text-slate-700 dark:text-slate-200`}
                      >
                        {item}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
