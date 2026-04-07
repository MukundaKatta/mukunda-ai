import { ScrollReveal } from '../ui/ScrollReveal'
import { AnimatedCounter } from '../ui/AnimatedCounter'
import { personal } from '../../data/personal'

export function About() {
  return (
    <section id="about" className="py-24 px-6 bg-white dark:bg-slate-950">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
              {personal.about}
            </p>
          </div>
        </ScrollReveal>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {personal.stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.1}>
              <div className="text-center p-6 rounded-2xl border border-slate-200 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-800/30">
                <div className="text-4xl md:text-5xl font-extrabold gradient-text mb-2">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
