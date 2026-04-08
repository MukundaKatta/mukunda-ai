import { motion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'
import { SectionHeading } from '../ui/SectionHeading'
import { ScrollReveal } from '../ui/ScrollReveal'

const education = [
  {
    school: 'University of Central Missouri',
    degree: 'M.S. in Big Data Analytics and Information Technology',
    period: 'Jan 2021 — May 2022',
    focus: 'Machine Learning, Data Mining, Big Data Processing',
  },
  {
    school: 'SRM University',
    degree: 'B.Tech in Mechanical Engineering',
    period: '2012 — 2016',
    focus: 'Engineering Fundamentals, Systems Design',
  },
]

export function Education() {
  return (
    <section id="education" className="relative py-28 px-6 bg-slate-50/50 dark:bg-slate-900/50 overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-40" />

      <div className="relative max-w-5xl mx-auto">
        <SectionHeading icon="🎓" title="Education" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {education.map((edu, i) => (
            <ScrollReveal key={edu.school} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                className="p-6 md:p-7 rounded-2xl border border-slate-200 dark:border-slate-700/50 bg-white/90 dark:bg-slate-800/50 backdrop-blur-sm flex items-start gap-4 h-full group"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center shrink-0 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/50 transition-colors duration-300 group-hover:scale-110">
                  <GraduationCap size={24} className="text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{edu.school}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 font-medium mt-0.5">{edu.degree}</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{edu.focus}</p>
                  <p className="text-sm text-emerald-600 dark:text-emerald-400 font-semibold mt-2">{edu.period}</p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
