import { motion } from 'framer-motion'
import { ScrollReveal } from '../ui/ScrollReveal'
import { AnimatedCounter } from '../ui/AnimatedCounter'
import { personal } from '../../data/personal'
import { TrendingUp, Rocket, Award, GitBranch } from 'lucide-react'

const statIcons = [TrendingUp, Rocket, Award, GitBranch]

export function About() {
  return (
    <section id="about" className="relative pt-16 pb-24 px-6 bg-[#faf9f6] dark:bg-black overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/[0.03] rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed tracking-wide">
              {personal.about}
            </p>
          </div>
        </ScrollReveal>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {personal.stats.map((stat, i) => {
            const Icon = statIcons[i]
            return (
              <ScrollReveal key={stat.label} delay={i * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.04, y: -4 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className="relative text-center p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-700/50 bg-gradient-to-br from-slate-50/80 to-white dark:from-slate-800/40 dark:to-slate-800/20 backdrop-blur-sm stat-glow group"
                >
                  <div className="flex justify-center mb-3">
                    <div className="icon-tile w-11 h-11 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                      <Icon size={20} className="text-indigo-600 dark:text-indigo-300" />
                    </div>
                  </div>
                  <div className="text-4xl md:text-5xl font-extrabold gradient-text mb-2">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                    {stat.label}
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
