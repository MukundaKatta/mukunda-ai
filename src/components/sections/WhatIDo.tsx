import { motion } from 'framer-motion'
import { Bot, Layers, Database, Cloud, Code, GitBranch } from 'lucide-react'
import { SectionHeading } from '../ui/SectionHeading'
import { ScrollReveal } from '../ui/ScrollReveal'
import { whatIDo } from '../../data/skills'

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Bot, Layers, Database, Cloud, Code, GitBranch,
}

const cardColors = [
  'from-indigo-500/10 to-indigo-500/5',
  'from-violet-500/10 to-violet-500/5',
  'from-fuchsia-500/10 to-fuchsia-500/5',
  'from-blue-500/10 to-blue-500/5',
  'from-purple-500/10 to-purple-500/5',
  'from-sky-500/10 to-sky-500/5',
]

export function WhatIDo() {
  return (
    <section id="what-i-do" className="relative py-28 px-6 bg-slate-50/50 dark:bg-[#08070f] overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-40" />

      <div className="relative max-w-6xl mx-auto">
        <SectionHeading icon="🚀" title="What I Do" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {whatIDo.map((item, i) => {
            const Icon = iconMap[item.icon]
            return (
              <ScrollReveal key={item.title} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className="group p-7 rounded-2xl border border-slate-200 dark:border-slate-700/50 bg-white/90 dark:bg-slate-800/50 backdrop-blur-sm h-full relative overflow-hidden"
                >
                  {/* Gradient accent on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${cardColors[i]} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  <div className="relative">
                    <div className="icon-tile w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110">
                      {Icon && <Icon size={26} className="text-indigo-600 dark:text-indigo-300" />}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{item.description}</p>
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
