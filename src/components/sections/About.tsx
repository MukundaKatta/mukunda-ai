import { motion } from 'framer-motion'
import { ScrollReveal } from '../ui/ScrollReveal'
import { AnimatedCounter } from '../ui/AnimatedCounter'
import { personal } from '../../data/personal'
import { TrendingUp, Rocket, Award, GitBranch } from 'lucide-react'

const statIcons = [TrendingUp, Rocket, Award, GitBranch]

export function About() {
  return (
    <section id="about" className="relative pt-16 pb-24 px-6 bg-[#faf9f6] dark:bg-black overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/[0.03] rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed tracking-wide">
              {personal.about}
            </p>
          </div>
        </ScrollReveal>

        {/* Stats — premium grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {personal.stats.map((stat, i) => {
            const Icon = statIcons[i]
            return (
              <ScrollReveal key={stat.label} delay={i * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.04, y: -4 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className="relative text-center p-6 md:p-7 rounded-2xl border border-slate-200/80 dark:border-indigo-400/15 bg-white dark:bg-[#0a0a14]/70 stat-glow group lift ring-conic"
                >
                  <div className="flex justify-center mb-3.5">
                    <div className="icon-tile w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-rotate-3">
                      <Icon size={18} className="text-indigo-600 dark:text-indigo-300" />
                    </div>
                  </div>
                  <div className="text-3xl md:text-4xl font-extrabold gradient-text glow-text mb-1.5 nums-tabular tracking-tight">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-[0.22em]">
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
