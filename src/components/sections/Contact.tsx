import { motion } from 'framer-motion'
import { Mail, MapPin, ArrowRight } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '../ui/SocialIcons'
import { ScrollReveal } from '../ui/ScrollReveal'
import { personal } from '../../data/personal'

export function Contact() {
  return (
    <section id="contact" className="relative py-32 px-6 overflow-hidden bg-[#f5f3ec] dark:bg-black">
      {/* Subtle single violet glow — replaces the silver orb wash */}
      <div
        className="absolute inset-0 hidden dark:block pointer-events-none opacity-40"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(99, 102, 241, 0.22) 0%, transparent 65%)',
        }}
      />
      <div className="absolute inset-0 dot-grid opacity-30 dark:opacity-10" />

      <div className="relative max-w-3xl mx-auto text-center z-10">
        <ScrollReveal>
          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-[#0a0a14] border border-slate-200 dark:border-indigo-400/25 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-8 shadow-sm dark:shadow-[0_0_20px_-6px_rgba(99,102,241,0.3)]"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-indigo-500" />
            </span>
            Available for opportunities
          </motion.div>

          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight leading-[1.05]">
            Let's <span className="gradient-text-premium">talk.</span>
          </h2>

          <p className="text-lg md:text-xl text-slate-700 dark:text-slate-200 mb-3 max-w-xl mx-auto leading-relaxed">
            Senior AI/ML Engineer seeking remote roles building production AI infrastructure, data platforms, and developer tools.
          </p>

          <p className="flex items-center justify-center gap-1.5 text-slate-500 dark:text-slate-400 mb-12 text-sm">
            <MapPin size={15} />
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
              className="neon-tile flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm text-slate-800 dark:text-white"
            >
              <LinkedinIcon size={16} /> LinkedIn
            </motion.a>
            <motion.a
              href={personal.github}
              target="_blank"
              rel="noopener"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="neon-tile flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm text-slate-800 dark:text-white"
            >
              <GithubIcon size={16} /> GitHub
            </motion.a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
