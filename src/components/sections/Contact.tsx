import { motion } from 'framer-motion'
import { Mail, MapPin, ArrowRight } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '../ui/SocialIcons'
import { ScrollReveal } from '../ui/ScrollReveal'
import { personal } from '../../data/personal'

export function Contact() {
  return (
    <section id="contact" className="relative py-32 px-6 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-emerald-50/50 to-white dark:from-slate-900 dark:via-emerald-950/20 dark:to-slate-950" />
      <div className="absolute inset-0 dot-grid opacity-20" />

      {/* Floating orbs */}
      <div className="orb w-[400px] h-[400px] bg-emerald-400 top-[-10%] right-[-5%]" style={{ animation: 'float-slow 20s ease-in-out infinite' }} />
      <div className="orb w-[300px] h-[300px] bg-teal-300 bottom-[-10%] left-[-5%]" style={{ animation: 'float-slower 22s ease-in-out infinite' }} />

      <div className="relative max-w-3xl mx-auto text-center z-10">
        <ScrollReveal>
          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-emerald-100/80 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-sm font-semibold mb-8 backdrop-blur-sm border border-emerald-200/50 dark:border-emerald-800/30"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            Available for opportunities
          </motion.div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">
            Let's <span className="gradient-text-premium">talk</span>
          </h2>

          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-3 max-w-xl mx-auto leading-relaxed">
            Senior AI/ML Engineer seeking remote roles building production AI infrastructure, data platforms, and developer tools.
          </p>

          <p className="flex items-center justify-center gap-1.5 text-slate-400 dark:text-slate-500 mb-12">
            <MapPin size={16} />
            {personal.location}
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <motion.a
              href={`mailto:${personal.email}`}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-8 py-4 rounded-full bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-all duration-200 shadow-xl shadow-emerald-600/25 hover:shadow-2xl hover:shadow-emerald-600/30 group"
            >
              <Mail size={18} />
              Get in Touch
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </motion.a>
            <motion.a
              href={personal.linkedin}
              target="_blank"
              rel="noopener"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-8 py-4 rounded-full border-2 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-semibold hover:border-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-200 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm"
            >
              <LinkedinIcon size={18} /> LinkedIn
            </motion.a>
            <motion.a
              href={personal.github}
              target="_blank"
              rel="noopener"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-8 py-4 rounded-full border-2 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-semibold hover:border-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-200 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm"
            >
              <GithubIcon size={18} /> GitHub
            </motion.a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
