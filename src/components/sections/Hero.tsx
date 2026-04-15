import { motion } from 'framer-motion'
import { ChevronDown, Mail, Sparkles } from 'lucide-react'
import { GithubIcon, LinkedinIcon, TwitterIcon } from '../ui/SocialIcons'
import { TypeWriter } from '../ui/TypeWriter'
import { personal } from '../../data/personal'

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } },
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } },
}

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-20 gradient-mesh overflow-hidden noise-overlay">
      {/* Drifting aurora */}
      <div className="aurora" />

      {/* Floating orbs — indigo / violet */}
      <div className="orb w-[500px] h-[500px] bg-indigo-500 top-[-10%] left-[-5%]" style={{ animation: 'float-slow 20s ease-in-out infinite' }} />
      <div className="orb w-[400px] h-[400px] bg-violet-400 bottom-[-5%] right-[-5%]" style={{ animation: 'float-slower 25s ease-in-out infinite' }} />
      <div className="orb w-[320px] h-[320px] bg-fuchsia-500 top-[40%] right-[10%]" style={{ animation: 'float-slow 18s ease-in-out infinite reverse' }} />

      {/* Technical grid overlay */}
      <div className="absolute inset-0 line-grid opacity-50 z-[2] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />

      <motion.div
        className="relative max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-16 z-[3]"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {/* Avatar */}
        <motion.div className="relative shrink-0" variants={scaleIn}>
          <motion.div
            className="w-56 h-56 md:w-72 md:h-72 rounded-full glow-ring p-[3px] bg-gradient-to-br from-indigo-500 via-violet-400 to-fuchsia-400"
            whileHover={{ scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <div className="w-full h-full rounded-full overflow-hidden bg-slate-50 dark:bg-[#14142b] ring-1 ring-white/30 dark:ring-indigo-400/10">
              <img
                src="/avatar.jpg"
                alt={personal.name}
                className="w-full h-full object-cover" style={{ objectPosition: '50% 20%' }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                  target.parentElement!.innerHTML = `<div class="w-full h-full flex items-center justify-center text-6xl font-bold gradient-text">MK</div>`
                }}
              />
            </div>
          </motion.div>
          <motion.div
            className="absolute -bottom-1 -right-1 w-11 h-11 bg-gradient-to-br from-indigo-500 to-violet-500 rounded-full flex items-center justify-center border-4 border-white dark:border-[#0a0a16] shadow-lg shadow-indigo-500/40"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8, type: 'spring', stiffness: 500 }}
          >
            <Sparkles size={16} className="text-white" />
          </motion.div>
        </motion.div>

        {/* Text */}
        <div className="text-center md:text-left">
          {/* Availability pill */}
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50/80 dark:bg-indigo-500/10 border border-indigo-200/60 dark:border-indigo-400/20 backdrop-blur-sm text-xs font-medium text-indigo-700 dark:text-indigo-300 mb-5"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-indigo-500" />
            </span>
            Available for new opportunities
          </motion.div>

          <motion.p variants={fadeUp} className="text-lg text-slate-500 dark:text-slate-400 mb-2">
            Hi, I'm{' '}
            <a href={personal.github} target="_blank" rel="noopener" className="text-indigo-600 dark:text-indigo-300 font-semibold hover:underline decoration-indigo-400/40 underline-offset-4">
              {personal.handle}
            </a>
          </motion.p>

          {/* Display name — serif */}
          <motion.h1
            variants={fadeUp}
            className="font-display text-6xl md:text-7xl lg:text-[5.5rem] leading-[1.02] tracking-tight text-slate-900 dark:text-white mb-4"
          >
            <TypeWriter words={personal.roles} className="gradient-text-premium italic" />
          </motion.h1>

          <motion.p variants={fadeUp} className="text-xl md:text-2xl font-medium text-slate-700 dark:text-slate-300 mb-8 max-w-xl">
            {personal.tagline}
          </motion.p>

          {/* Badges */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-2 justify-center md:justify-start mb-8">
            {personal.badges.map((badge, i) => (
              <motion.span
                key={badge}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="px-3.5 py-1.5 rounded-full border border-slate-200/80 dark:border-indigo-400/15 text-xs md:text-sm font-medium text-slate-600 dark:text-slate-300 bg-white/70 dark:bg-indigo-950/20 backdrop-blur-md hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300 dark:hover:border-indigo-400/40 transition-colors duration-200 cursor-default"
              >
                {badge}
              </motion.span>
            ))}
          </motion.div>

          {/* Social Links */}
          <motion.div variants={fadeUp} className="flex gap-3 justify-center md:justify-start">
            {[
              { href: personal.github, icon: <GithubIcon size={20} />, label: 'GitHub' },
              { href: personal.linkedin, icon: <LinkedinIcon size={20} />, label: 'LinkedIn' },
              { href: personal.twitter, icon: <TwitterIcon size={20} />, label: 'X' },
              { href: `mailto:${personal.email}`, icon: <Mail size={20} />, label: 'Email' },
            ].map(({ href, icon, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener"
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-full border border-slate-200/80 dark:border-indigo-400/15 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-300 hover:border-indigo-400 hover:shadow-lg hover:shadow-indigo-500/20 dark:hover:border-indigo-400/40 transition-all duration-200 bg-white/70 dark:bg-indigo-950/20 backdrop-blur-md"
                aria-label={label}
              >
                {icon}
              </motion.a>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[3]"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <a href="#about" className="flex flex-col items-center gap-1 text-slate-400 dark:text-slate-500 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors">
          <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
          <ChevronDown size={20} className="animate-[scroll-bounce_2s_ease-in-out_infinite]" />
        </a>
      </motion.div>
    </section>
  )
}
