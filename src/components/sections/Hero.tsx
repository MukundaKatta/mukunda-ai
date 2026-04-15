import { motion } from 'framer-motion'
import { ChevronDown, Mail, ArrowRight, Sparkles } from 'lucide-react'
import { GithubIcon, LinkedinIcon, TwitterIcon } from '../ui/SocialIcons'
import { MatrixRain } from '../ui/MatrixRain'
import { personal } from '../../data/personal'

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.25 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } },
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const } },
}

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-5 sm:px-6 pt-24 pb-20 overflow-hidden bg-[#faf9f6] dark:bg-black">
      {/* Matrix rain (dark mode only — hidden in light) */}
      <div className="absolute inset-0 hidden dark:block">
        <MatrixRain intensity="strong" />
      </div>

      {/* Aurora (dark only, CSS-gated) */}
      <div className="aurora" />

      {/* Orbs (dark only, CSS-gated) */}
      <div className="orb w-[420px] h-[420px] sm:w-[520px] sm:h-[520px] bg-indigo-500 top-[-10%] left-[-25%] sm:left-[-8%]" style={{ animation: 'float-slow 22s ease-in-out infinite' }} />
      <div className="orb w-[360px] h-[360px] sm:w-[440px] sm:h-[440px] bg-violet-500 bottom-[-10%] right-[-25%] sm:right-[-5%]" style={{ animation: 'float-slower 28s ease-in-out infinite' }} />

      {/* Radial vignette — dark only */}
      <div className="absolute inset-0 hidden dark:block bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.7)_100%)] pointer-events-none" />

      <motion.div
        className="relative z-10 w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-14"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {/* Avatar — single-color thin ring, subtle shadow. No rainbow. */}
        <motion.div className="relative shrink-0" variants={scaleIn}>
          <motion.div
            className="w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-full glow-ring ring-1 ring-indigo-200 dark:ring-indigo-400/30 overflow-hidden bg-slate-50 dark:bg-black"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <img
              src="/avatar.jpg"
              alt={personal.name}
              className="w-full h-full object-cover" style={{ objectPosition: '50% 20%' }}
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.style.display = 'none'
                target.parentElement!.innerHTML = `<div class="w-full h-full flex items-center justify-center text-5xl font-bold gradient-text">MK</div>`
              }}
            />
          </motion.div>
          <motion.div
            className="absolute -bottom-1 -right-1 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border-[3px] border-[#faf9f6] dark:border-black neon-btn-primary"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8, type: 'spring', stiffness: 500 }}
          >
            <Sparkles size={14} className="text-white" />
          </motion.div>
        </motion.div>

        {/* Text column */}
        <div className="text-center md:text-left flex-1 min-w-0">
          {/* Availability pill */}
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-indigo-500/10 border border-slate-200 dark:border-indigo-400/30 text-xs font-medium text-slate-600 dark:text-indigo-300 mb-6 shadow-sm"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-indigo-500" />
            </span>
            Available for new opportunities
          </motion.div>

          {/* Display name — two-tone bold sans, premium-tech */}
          <motion.h1
            variants={fadeUp}
            className="font-display text-[2.75rem] sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[0.95] tracking-tight mb-4"
          >
            <span className="text-slate-900 dark:text-white">Hi, I'm </span>
            <span className="gradient-text-premium">Mukunda.</span>
          </motion.h1>

          {/* Role — static, clean, not rotating */}
          <motion.p
            variants={fadeUp}
            className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-700 dark:text-slate-200 mb-3"
          >
            Senior AI/ML Engineer & AI Builder
          </motion.p>

          {/* Tagline */}
          <motion.p
            variants={fadeUp}
            className="text-base sm:text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed max-w-xl mx-auto md:mx-0"
          >
            Shipping production AI, agentic workflows, and data platforms for Fortune 100 enterprises.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8">
            <motion.a
              href="#about"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="neon-btn-primary flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm tracking-wide group"
            >
              Explore About Me
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </motion.a>
            <motion.a
              href={`mailto:${personal.email}`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="neon-tile flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm tracking-wide text-slate-800 dark:text-slate-100"
            >
              <Mail size={16} />
              Get in Touch
            </motion.a>
          </motion.div>

          {/* Social tiles — rounded-square with neon glow, not circles */}
          <motion.div variants={fadeUp} className="flex gap-2.5 justify-center md:justify-start">
            {[
              { href: personal.github, icon: <GithubIcon size={18} />, label: 'GitHub' },
              { href: personal.linkedin, icon: <LinkedinIcon size={18} />, label: 'LinkedIn' },
              { href: personal.twitter, icon: <TwitterIcon size={18} />, label: 'X' },
              { href: `mailto:${personal.email}`, icon: <Mail size={18} />, label: 'Email' },
            ].map(({ href, icon, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="neon-tile w-11 h-11 rounded-xl flex items-center justify-center text-slate-600 dark:text-indigo-200 hover:text-indigo-600 dark:hover:text-white"
                aria-label={label}
              >
                {icon}
              </motion.a>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator — hidden on small screens */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden sm:flex"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        <a href="#about" className="flex flex-col items-center gap-1 text-slate-400 dark:text-indigo-400/60 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors">
          <span className="text-[10px] font-medium tracking-[0.25em] uppercase">Scroll</span>
          <ChevronDown size={18} className="animate-[scroll-bounce_2s_ease-in-out_infinite]" />
        </a>
      </motion.div>
    </section>
  )
}
