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
      {/* Animated floating orbs */}
      <div className="orb w-[500px] h-[500px] bg-emerald-500 top-[-10%] left-[-5%]" style={{ animation: 'float-slow 20s ease-in-out infinite' }} />
      <div className="orb w-[400px] h-[400px] bg-emerald-300 bottom-[-5%] right-[-5%]" style={{ animation: 'float-slower 25s ease-in-out infinite' }} />
      <div className="orb w-[300px] h-[300px] bg-teal-400 top-[40%] right-[10%]" style={{ animation: 'float-slow 18s ease-in-out infinite reverse' }} />

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 dot-grid opacity-40 z-[2]" />

      <motion.div
        className="relative max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-16 z-[3]"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {/* Avatar */}
        <motion.div className="relative shrink-0" variants={scaleIn}>
          <motion.div
            className="w-56 h-56 md:w-72 md:h-72 rounded-full glow-ring p-2 bg-gradient-to-br from-emerald-500 via-emerald-400 to-teal-300"
            whileHover={{ scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <div className="w-full h-full rounded-full overflow-hidden bg-slate-50 dark:bg-slate-800">
              <img
                src="/avatar.jpg"
                alt={personal.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                  target.parentElement!.innerHTML = `<div class="w-full h-full flex items-center justify-center text-6xl font-bold gradient-text">MK</div>`
                }}
              />
            </div>
          </motion.div>
          <motion.div
            className="absolute -bottom-1 -right-1 w-11 h-11 bg-emerald-600 rounded-full flex items-center justify-center border-4 border-white dark:border-slate-950 shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8, type: 'spring', stiffness: 500 }}
          >
            <Sparkles size={16} className="text-white" />
          </motion.div>
        </motion.div>

        {/* Text */}
        <div className="text-center md:text-left">
          <motion.p variants={fadeUp} className="text-lg text-slate-500 dark:text-slate-400 mb-3">
            Hi, I'm{' '}
            <a href={personal.github} target="_blank" rel="noopener" className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline decoration-emerald-500/30 underline-offset-4">
              {personal.handle}
            </a>,
          </motion.p>

          <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 leading-tight tracking-tight">
            <TypeWriter words={personal.roles} className="gradient-text-premium" />
          </motion.h1>

          <motion.p variants={fadeUp} className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-200 mb-8">
            {personal.tagline}
          </motion.p>

          {/* Badges */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 justify-center md:justify-start mb-8">
            {personal.badges.map((badge, i) => (
              <motion.span
                key={badge}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-600 dark:text-slate-300 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:border-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200 cursor-default"
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
                className="p-3 rounded-full border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-400 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-200 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm"
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
        <a href="#about" className="flex flex-col items-center gap-1 text-slate-400 dark:text-slate-500 hover:text-emerald-500 transition-colors">
          <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
          <ChevronDown size={20} className="animate-[scroll-bounce_2s_ease-in-out_infinite]" />
        </a>
      </motion.div>
    </section>
  )
}
