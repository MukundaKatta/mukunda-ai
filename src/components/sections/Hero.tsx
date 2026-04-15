import { motion } from 'framer-motion'
import { ChevronDown, Mail, Sparkles } from 'lucide-react'
import { GithubIcon, LinkedinIcon, TwitterIcon } from '../ui/SocialIcons'
import { TypeWriter } from '../ui/TypeWriter'
import { personal } from '../../data/personal'

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } },
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const } },
}

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-5 sm:px-6 pt-24 pb-16 gradient-mesh overflow-hidden noise-overlay">
      {/* Drifting aurora */}
      <div className="aurora" />

      {/* Floating orbs */}
      <div className="orb w-[420px] h-[420px] sm:w-[500px] sm:h-[500px] bg-indigo-500 top-[-10%] left-[-20%] sm:left-[-5%]" style={{ animation: 'float-slow 20s ease-in-out infinite' }} />
      <div className="orb w-[360px] h-[360px] sm:w-[400px] sm:h-[400px] bg-violet-400 bottom-[-5%] right-[-20%] sm:right-[-5%]" style={{ animation: 'float-slower 25s ease-in-out infinite' }} />
      <div className="orb w-[280px] h-[280px] bg-fuchsia-500 top-[40%] right-[-10%] sm:right-[10%] hidden sm:block" style={{ animation: 'float-slow 18s ease-in-out infinite reverse' }} />

      {/* Masked technical grid */}
      <div className="absolute inset-0 line-grid opacity-40 z-[2] [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_75%)]" />

      <motion.div
        className="relative w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8 sm:gap-10 md:gap-16 z-[3]"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {/* Avatar */}
        <motion.div className="relative shrink-0" variants={scaleIn}>
          <motion.div
            className="w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 rounded-full glow-ring p-[3px] bg-gradient-to-br from-indigo-500 via-violet-400 to-fuchsia-400"
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
                  target.parentElement!.innerHTML = `<div class="w-full h-full flex items-center justify-center text-5xl font-bold gradient-text">MK</div>`
                }}
              />
            </div>
          </motion.div>
          <motion.div
            className="absolute -bottom-1 -right-1 w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-indigo-500 to-violet-500 rounded-full flex items-center justify-center border-4 border-white dark:border-[#0a0a16] shadow-lg shadow-indigo-500/40"
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
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 dark:bg-indigo-500/10 border border-indigo-200/70 dark:border-indigo-400/20 backdrop-blur-sm text-xs font-medium text-indigo-700 dark:text-indigo-300 mb-5"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-indigo-500" />
            </span>
            Available for new opportunities
          </motion.div>

          {/* Small greeting */}
          <motion.p variants={fadeUp} className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mb-2 tracking-wide">
            Hi, I'm
          </motion.p>

          {/* Display name — the hero element */}
          <motion.h1
            variants={fadeUp}
            className="font-display text-[2.75rem] leading-[0.95] sm:text-6xl md:text-7xl lg:text-[5.25rem] tracking-tight text-slate-900 dark:text-white mb-5 break-words"
          >
            <span className="gradient-text-premium">Mukunda</span>
            <span className="block italic text-slate-700 dark:text-slate-200/90 font-normal">Rao Katta.</span>
          </motion.h1>

          {/* Rotating role — supporting, crisp, not italic */}
          <motion.div variants={fadeUp} className="flex flex-wrap items-baseline justify-center md:justify-start gap-x-2 mb-4 text-base sm:text-lg md:text-xl">
            <span className="text-slate-400 dark:text-slate-500 font-light">—</span>
            <TypeWriter
              words={personal.roles}
              className="font-semibold text-indigo-600 dark:text-indigo-300"
            />
          </motion.div>

          {/* Tagline */}
          <motion.p variants={fadeUp} className="text-base sm:text-lg text-slate-600 dark:text-slate-400 mb-7 leading-relaxed max-w-lg mx-auto md:mx-0">
            {personal.tagline}
          </motion.p>

          {/* Badges */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-2 justify-center md:justify-start mb-7">
            {personal.badges.map((badge, i) => (
              <motion.span
                key={badge}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 + i * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="px-3 py-1.5 rounded-full border border-slate-200/80 dark:border-indigo-400/15 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300 bg-white/70 dark:bg-indigo-950/20 backdrop-blur-md hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300 dark:hover:border-indigo-400/40 transition-colors duration-200 cursor-default"
              >
                {badge}
              </motion.span>
            ))}
          </motion.div>

          {/* Social Links */}
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
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="p-2.5 rounded-full border border-slate-200/80 dark:border-indigo-400/15 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-300 hover:border-indigo-400 hover:shadow-lg hover:shadow-indigo-500/20 dark:hover:border-indigo-400/40 transition-all duration-200 bg-white/70 dark:bg-indigo-950/20 backdrop-blur-md"
                aria-label={label}
              >
                {icon}
              </motion.a>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator — hidden on small screens to avoid URL-bar collision */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[3] hidden sm:flex"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <a href="#about" className="flex flex-col items-center gap-1 text-slate-400 dark:text-slate-500 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors">
          <span className="text-[10px] font-medium tracking-[0.25em] uppercase">Scroll</span>
          <ChevronDown size={18} className="animate-[scroll-bounce_2s_ease-in-out_infinite]" />
        </a>
      </motion.div>
    </section>
  )
}
