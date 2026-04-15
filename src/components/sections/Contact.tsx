import { motion } from 'framer-motion'
import { Mail, MapPin, ArrowRight } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '../ui/SocialIcons'
import { ScrollReveal } from '../ui/ScrollReveal'
import { personal } from '../../data/personal'

export function Contact() {
  return (
    <section id="contact" className="relative py-32 px-6 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-indigo-50/50 to-white dark:from-black dark:via-indigo-950/30 dark:to-black" />
      <div className="absolute inset-0 dot-grid opacity-20" />

      {/* Floating orbs */}
      <div className="orb w-[400px] h-[400px] bg-indigo-400 top-[-10%] right-[-5%]" style={{ animation: 'float-slow 20s ease-in-out infinite' }} />
      <div className="orb w-[300px] h-[300px] bg-violet-300 bottom-[-10%] left-[-5%]" style={{ animation: 'float-slower 22s ease-in-out infinite' }} />

      <div className="relative max-w-3xl mx-auto text-center z-10">
        <ScrollReveal>
          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-indigo-100/80 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 text-sm font-semibold mb-8 backdrop-blur-sm border border-indigo-200/50 dark:border-indigo-800/30"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500" />
            </span>
            Available for opportunities
          </motion.div>

          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight leading-[1.05]">
            Let's <span className="gradient-text-premium">talk.</span>
          </h2>

          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-3 max-w-xl mx-auto leading-relaxed">
            Senior AI/ML Engineer seeking remote roles building production AI infrastructure, data platforms, and developer tools.
          </p>

          <p className="flex items-center justify-center gap-1.5 text-slate-400 dark:text-slate-500 mb-12">
            <MapPin size={16} />
            {personal.location}
          </p>

          <div className="flex flex-wrap gap-3 justify-center">
            <motion.a
              href={`mailto:${personal.email}`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="neon-btn-primary flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm tracking-wide group"
            >
              <Mail size={16} />
              Get in Touch
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </motion.a>
            <motion.a
              href={personal.linkedin}
              target="_blank"
              rel="noopener"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="neon-tile flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm text-slate-800 dark:text-slate-100 bg-white/60 dark:bg-black/40 backdrop-blur-md"
            >
              <LinkedinIcon size={16} /> LinkedIn
            </motion.a>
            <motion.a
              href={personal.github}
              target="_blank"
              rel="noopener"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="neon-tile flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm text-slate-800 dark:text-slate-100 bg-white/60 dark:bg-black/40 backdrop-blur-md"
            >
              <GithubIcon size={16} /> GitHub
            </motion.a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
