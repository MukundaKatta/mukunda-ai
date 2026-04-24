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
    <section className="relative flex items-center justify-start px-5 sm:px-6 pt-28 pb-10 overflow-hidden bg-black min-h-screen">
      {/* Cinematic AI systems background */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        <img
          src="/hero-background.png"
          alt=""
          aria-hidden
          className="w-full h-full object-cover opacity-90"
          style={{ objectPosition: 'center right' }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.78)_0%,rgba(0,0,0,0.58)_42%,rgba(0,0,0,0.78)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_25%_50%,rgba(79,70,229,0.28)_0%,transparent_42%),radial-gradient(ellipse_at_74%_50%,rgba(167,139,250,0.16)_0%,transparent_48%)]" />
      </div>

      {/* Matrix rain — dark mode only */}
      <div className="absolute inset-0 hidden dark:block opacity-45 z-[1]">
        <MatrixRain intensity="strong" />
      </div>

      {/* Aurora + orbs — dark only, CSS-gated */}
      <div className="aurora z-[1]" />
      <div className="orb w-[460px] h-[460px] bg-indigo-500 top-[-15%] left-[-25%] z-[1]" style={{ animation: 'float-slow 22s ease-in-out infinite' }} />
      <div className="orb w-[400px] h-[400px] bg-violet-500 bottom-[-15%] right-[-25%] z-[1]" style={{ animation: 'float-slower 28s ease-in-out infinite' }} />

      {/* Soft vignette to keep the portrait and copy readable */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_25%_50%,rgba(0,0,0,0.18)_0%,transparent_58%),radial-gradient(ellipse_at_72%_50%,rgba(0,0,0,0.34)_0%,transparent_64%)] pointer-events-none z-[2]" />

      <motion.div
        className="relative z-10 w-full max-w-6xl mx-auto"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-[92%] sm:max-w-[70%] md:max-w-[58%]">
          {/* Availability pill */}
          <motion.div
            variants={fadeUp}
            className="mb-6 inline-flex items-center gap-3 rounded-full border border-indigo-300/25 bg-white/8 py-1 pl-1 pr-4 text-xs font-medium text-indigo-100 shadow-[0_0_20px_-6px_rgba(99,102,241,0.45)] backdrop-blur-md"
          >
            <span className="relative h-8 w-8 overflow-hidden rounded-full border border-white/20 bg-black/30">
              <img src="/github-profile.png" alt="" aria-hidden className="h-full w-full object-cover" />
            </span>
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-indigo-500" />
            </span>
            Available · @MukundaKatta
          </motion.div>

          {/* Display name */}
          <motion.h1
            variants={fadeUp}
            className="font-display text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight mb-4"
          >
            <span className="text-white">Hi, I'm</span>
            <span className="block gradient-text-premium mt-1">Mukunda.</span>
          </motion.h1>

          {/* Role */}
          <motion.p
            variants={fadeUp}
            className="text-base sm:text-lg md:text-xl font-semibold text-slate-100 mb-3"
          >
            Senior AI/ML Engineer & AI Builder
          </motion.p>

          {/* Tagline */}
          <motion.p
            variants={fadeUp}
            className="text-sm sm:text-base text-slate-300 mb-7 leading-relaxed"
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
              className="neon-tile flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm tracking-wide text-slate-100"
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
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="neon-tile w-10 h-10 rounded-lg flex items-center justify-center text-indigo-100 hover:text-white"
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
