import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { SectionHeading } from '../ui/SectionHeading'
import { ScrollReveal } from '../ui/ScrollReveal'
import { experiences } from '../../data/experience'

const companyLogos: Record<string, string> = {
  'Southwest Airlines': 'SW',
  'GPS IT Solutions': 'GP',
  'Amazon Web Services (AWS)': 'AWS',
  'Cigna': 'CI',
  'American Express': 'AE',
}

const companyColors: Record<string, string> = {
  'Southwest Airlines': '#304CB2',
  'GPS IT Solutions': '#6366f1',
  'Amazon Web Services (AWS)': '#FF9900',
  'Cigna': '#0075C9',
  'American Express': '#006FCF',
}

export function Experience() {
  return (
    <section id="experience" className="relative py-28 px-6 bg-[#faf9f6] dark:bg-black overflow-hidden">
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-indigo-500/[0.03] rounded-full blur-[80px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">
        <SectionHeading kicker="02" title="Work Experience" />

        <ScrollReveal>
          <p className="text-center text-slate-500 dark:text-slate-400 mb-14 max-w-2xl mx-auto text-lg">
            End-to-end ownership across <span className="font-semibold text-slate-700 dark:text-slate-200">discovery → development → deployment → scale</span>
          </p>
        </ScrollReveal>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-px hidden md:block overflow-hidden">
            <motion.div
              className="w-full h-full bg-gradient-to-b from-indigo-500 via-indigo-500/30 to-transparent"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: 'top' }}
            />
          </div>

          <div className="space-y-6">
            {experiences.map((exp, i) => {
              const logo = companyLogos[exp.company] || exp.company[0]
              const color = companyColors[exp.company] || '#6366f1'
              return (
                <ScrollReveal key={exp.company} delay={i * 0.08}>
                  <div className="relative md:pl-16">
                    {/* Timeline dot */}
                    <div className="absolute left-[14px] top-8 hidden md:block z-10">
                      <div className="w-6 h-6 rounded-full border-4 border-white dark:border-slate-950 shadow-sm timeline-dot" style={{ backgroundColor: color }} />
                    </div>

                    <motion.div
                      whileHover={{ x: 4 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      className={`group p-6 md:p-7 rounded-2xl border bg-white dark:bg-slate-800/40 backdrop-blur-sm card-hover ${
                        exp.featured
                          ? 'border-indigo-200 dark:border-indigo-800/50 gradient-border'
                          : 'border-slate-200 dark:border-slate-700/50'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
                        <div className="flex items-start gap-3">
                          {/* Company mini badge */}
                          <div
                            className="w-11 h-11 rounded-xl flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-sm"
                            style={{ backgroundColor: color }}
                          >
                            {logo}
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">
                              {exp.company}
                            </h3>
                            <p className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm mt-0.5">{exp.role}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 sm:mt-1">
                          <span className="text-xs px-3 py-1 rounded-full font-medium border" style={{ borderColor: `${color}30`, color, backgroundColor: `${color}08` }}>
                            {exp.type}
                          </span>
                          <span className="text-sm text-slate-400 dark:text-slate-500 whitespace-nowrap font-medium">{exp.period}</span>
                        </div>
                      </div>
                      <ul className="space-y-3">
                        {exp.highlights.map((h, j) => (
                          <li key={j} className="text-sm text-slate-600 dark:text-slate-300 flex gap-2.5 leading-relaxed">
                            <ChevronRight size={14} className="text-indigo-500 mt-1 shrink-0" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
