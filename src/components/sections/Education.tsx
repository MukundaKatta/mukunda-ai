import { motion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'
import { SectionHeading } from '../ui/SectionHeading'
import { ScrollReveal } from '../ui/ScrollReveal'
import { MatrixRain } from '../ui/MatrixRain'

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
    <section id="education" className="relative py-28 px-6 bg-[#f5f3ec] dark:bg-[#030308] overflow-hidden">
      <div className="absolute inset-0 hidden dark:block">
        <MatrixRain intensity="subtle" />
      </div>
      <div className="absolute inset-0 hidden dark:block bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.55)_100%)] pointer-events-none" />
      <div className="absolute inset-0 dot-grid opacity-40 dark:opacity-0" />

      <div className="relative max-w-5xl mx-auto">
        <SectionHeading kicker="05" title="Education" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {education.map((edu, i) => (
            <ScrollReveal key={edu.school} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                className="p-6 md:p-7 rounded-2xl border border-slate-200 dark:border-indigo-400/15 bg-white/90 dark:bg-[#0a0a14]/70 backdrop-blur-xl flex items-start gap-4 h-full group dark:shadow-[0_8px_40px_-12px_rgba(99,102,241,0.15)]"
              >
                <div className="icon-tile w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110">
                  <GraduationCap size={24} className="text-indigo-600 dark:text-indigo-300" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{edu.school}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 font-medium mt-0.5">{edu.degree}</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{edu.focus}</p>
                  <p className="text-sm text-indigo-600 dark:text-indigo-400 font-semibold mt-2">{edu.period}</p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
