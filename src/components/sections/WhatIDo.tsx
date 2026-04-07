import { Bot, Layers, Database, Cloud, Workflow, GitBranch } from 'lucide-react'
import { SectionHeading } from '../ui/SectionHeading'
import { ScrollReveal } from '../ui/ScrollReveal'
import { whatIDo } from '../../data/skills'

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Bot, Layers, Database, Cloud, Workflow, GitBranch,
}

export function WhatIDo() {
  return (
    <section id="what-i-do" className="py-24 px-6 bg-slate-50/50 dark:bg-slate-900/50 dot-grid">
      <div className="max-w-6xl mx-auto">
        <SectionHeading icon="🚀" title="What I Do" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {whatIDo.map((item, i) => {
            const Icon = iconMap[item.icon]
            return (
              <ScrollReveal key={item.title} delay={i * 0.08}>
                <div className="group p-6 rounded-2xl border border-slate-200 dark:border-slate-700/50 bg-white/80 dark:bg-slate-800/40 backdrop-blur-sm card-hover h-full">
                  <div className="w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-900/30 flex items-center justify-center mb-4 group-hover:bg-teal-100 dark:group-hover:bg-teal-900/50 transition-colors">
                    {Icon && <Icon size={24} className="text-teal-600 dark:text-teal-400" />}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{item.description}</p>
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
