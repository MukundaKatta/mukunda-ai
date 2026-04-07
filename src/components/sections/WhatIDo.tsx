import { Bot, Layers, Database, Cloud, Workflow, GitBranch } from 'lucide-react'
import { SectionHeading } from '../ui/SectionHeading'
import { ScrollReveal } from '../ui/ScrollReveal'
import { whatIDo } from '../../data/skills'

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Bot, Layers, Database, Cloud, Workflow, GitBranch,
}

export function WhatIDo() {
  return (
    <section id="what-i-do" className="py-24 px-6 bg-white dark:bg-slate-950">
      <div className="max-w-6xl mx-auto">
        <SectionHeading icon="🚀" title="What I Do" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {whatIDo.map((item, i) => {
            const Icon = iconMap[item.icon]
            return (
              <ScrollReveal key={item.title} delay={i * 0.08}>
                <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 card-hover h-full">
                  {Icon && <Icon size={28} className="text-teal-600 dark:text-teal-400 mb-4" />}
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
