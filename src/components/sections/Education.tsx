import { GraduationCap } from 'lucide-react'
import { SectionHeading } from '../ui/SectionHeading'
import { ScrollReveal } from '../ui/ScrollReveal'

const education = [
  {
    school: 'University of Central Missouri',
    degree: 'M.S. in Big Data Analytics and Information Technology',
    period: '2021 — 2022',
  },
  {
    school: 'SRM University',
    degree: 'B.Tech in Mechanical Engineering',
    period: '2012 — 2016',
  },
]

export function Education() {
  return (
    <section id="education" className="py-24 px-6 bg-slate-50/50 dark:bg-slate-900/50 dot-grid">
      <div className="max-w-5xl mx-auto">
        <SectionHeading icon="🎓" title="Education" />
        <div className="space-y-6">
          {education.map((edu, i) => (
            <ScrollReveal key={edu.school} delay={i * 0.1}>
              <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-700/50 bg-white/80 dark:bg-slate-800/40 backdrop-blur-sm card-hover flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center shrink-0">
                  <GraduationCap size={24} className="text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{edu.school}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{edu.degree}</p>
                  <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">{edu.period}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
