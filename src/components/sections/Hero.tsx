import { motion } from 'framer-motion'
import { Mail, ArrowRight } from 'lucide-react'
import { GithubIcon, LinkedinIcon, TwitterIcon } from '../ui/SocialIcons'
import { MatrixRain } from '../ui/MatrixRain'
import { personal } from '../../data/personal'

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
}

export function Hero() {
  return (
    <section className="relative flex items-center justify-start px-5 sm:px-6 pt-28 pb-20 overflow-hidden bg-[#faf9f6] dark:bg-black min-h-[88vh]">
      {/* Matrix rain — dark only */}
      <div className="absolute inset-0 hidden dark:block">
        <MatrixRain intensity="normal" />
      </div>

      {/* Aurora + orbs — dark only, CSS-gated */}
      <div className="aurora" />
      <div className="orb w-[460px] h-[460px] bg-indigo-500 top-[-15%] left-[-25%]" style={{ animation: 'float-slow 22s ease-in-out infinite' }} />
      <div className="orb w-[400px] h-[400px] bg-violet-500 bottom-[-15%] right-[-25%]" style={{ animation: 'float-slower 28s ease-in-out infinite' }} />

      {/* BLEEDING PORTRAIT — right side, faded to transparent at left so text is readable */}
      <div className="absolute inset-y-0 right-0 w-[62%] sm:w-[55%] md:w-[50%] pointer-events-none select-none z-[1]">
        <img
          src="/avatar.jpg"
          alt=""
          aria-hidden
          className="w-full h-full object-cover opacity-75 dark:opacity-60"
          style={{
            objectPosition: '50% 22%',
            maskImage:
              'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 30%, rgba(0,0,0,0.3) 70%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 30%, rgba(0,0,0,0.3) 70%, transparent 100%)',
          }}
        />
        {/* Darkening overlay on top of portrait in dark mode so it recedes further */}
        <div className="absolute inset-0 hidden dark:block bg-gradient-to-l from-black/40 via-black/20 to-transparent" />
      </div>

      {/* Soft vignette to pool readability on the left where text lives */}
      <div className="absolute inset-0 hidden dark:block bg-[radial-gradient(ellipse_at_25%_50%,rgba(0,0,0,0.35)_0%,transparent_70%)] pointer-events-none z-[2]" />

      <motion.div
        className="relative z-10 w-full max-w-5xl mx-auto"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {/* Text column — constrained so it doesn't fight the portrait */}
        <div className="max-w-[68%] sm:max-w-[60%] md:max-w-[55%]">
          {/* Availability pill */}
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-[#0a0a14] border border-slate-200 dark:border-indigo-400/25 text-xs font-medium text-slate-600 dark:text-indigo-300 mb-6 shadow-sm dark:shadow-[0_0_20px_-6px_rgba(99,102,241,0.3)]"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-indigo-500" />
            </span>
            Available
          </motion.div>

          {/* Display name */}
          <motion.h1
            variants={fadeUp}
            className="font-display text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight mb-4"
          >
            <span className="text-slate-900 dark:text-white">Hi, I'm</span>
            <span className="block gradient-text-premium mt-1">Mukunda.</span>
          </motion.h1>

          {/* Role */}
          <motion.p
            variants={fadeUp}
            className="text-base sm:text-lg md:text-xl font-semibold text-slate-700 dark:text-slate-200 mb-3"
          >
            Senior AI/ML Engineer & AI Builder
          </motion.p>

          {/* Tagline */}
          <motion.p
            variants={fadeUp}
            className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mb-7 leading-relaxed"
          >
            Shipping production AI, agentic workflows, and data platforms for Fortune 100 enterprises.
          </motion.p>

          {/* CTAs — stack on mobile, row on sm+ */}
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 mb-7">
            <motion.a
              href="#about"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="neon-btn-primary flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm tracking-wide group"
            >
              Explore About Me
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </motion.a>
            <motion.a
              href={`mailto:${personal.email}`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="neon-tile flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm tracking-wide text-slate-800 dark:text-slate-100"
            >
              <Mail size={15} />
              Get in Touch
            </motion.a>
          </motion.div>

          {/* Social tiles */}
          <motion.div variants={fadeUp} className="flex gap-2.5">
            {[
              { href: personal.github, icon: <GithubIcon size={17} />, label: 'GitHub' },
              { href: personal.linkedin, icon: <LinkedinIcon size={17} />, label: 'LinkedIn' },
              { href: personal.twitter, icon: <TwitterIcon size={17} />, label: 'X' },
              { href: `mailto:${personal.email}`, icon: <Mail size={17} />, label: 'Email' },
            ].map(({ href, icon, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="neon-tile w-10 h-10 rounded-lg flex items-center justify-center text-slate-600 dark:text-indigo-200 hover:text-indigo-600 dark:hover:text-white"
                aria-label={label}
              >
                {icon}
              </motion.a>
            ))}
          </motion.div>
        </div>

      </motion.div>
    </section>
  )
}
