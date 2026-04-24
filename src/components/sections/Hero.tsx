import { motion } from 'framer-motion'
import { Mail, ArrowRight, Activity, ShieldCheck, Workflow } from 'lucide-react'
import { GithubIcon, LinkedinIcon, TwitterIcon } from '../ui/SocialIcons'
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
  const commandSignals = [
    { label: 'Production AI', value: 'RAG · Agents · Evals', icon: Activity },
    { label: 'Enterprise Scale', value: 'AWS · Bedrock · OpenSearch', icon: ShieldCheck },
    { label: 'Builder Mode', value: 'Open source systems live', icon: Workflow },
  ]

  return (
    <section className="relative flex min-h-screen items-center justify-start overflow-hidden bg-black px-5 pb-10 pt-28 sm:px-6">
      {/* Cinematic AI systems background */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        <img
          src="/hero-background.png"
          alt=""
          aria-hidden
          className="w-full h-full object-cover opacity-90"
          style={{ objectPosition: 'center right' }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.7)_42%,rgba(0,0,0,0.82)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_26%_48%,rgba(79,70,229,0.2)_0%,transparent_44%),radial-gradient(ellipse_at_78%_34%,rgba(34,211,238,0.1)_0%,transparent_38%)]" />
      </div>

      <div className="absolute inset-0 z-[1] opacity-35 line-grid" />
      <div className="absolute inset-x-0 bottom-0 z-[2] h-40 bg-gradient-to-t from-black via-black/60 to-transparent" />

      {/* Soft vignette to keep the copy readable */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_22%_50%,rgba(0,0,0,0.08)_0%,transparent_58%),radial-gradient(ellipse_at_72%_50%,rgba(0,0,0,0.42)_0%,transparent_64%)] pointer-events-none z-[2]" />

      <motion.div
        className="relative z-10 w-full max-w-6xl mx-auto"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-[92%] sm:max-w-[72%] md:max-w-[62%] lg:max-w-[58%]">
          {/* Availability pill */}
          <motion.div
            variants={fadeUp}
            className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/7 py-1 pl-1 pr-4 text-xs font-medium text-slate-100 shadow-[0_20px_70px_-35px_rgba(99,102,241,0.9)] backdrop-blur-md"
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
            className="font-display mb-5 text-5xl leading-[0.9] text-white sm:text-6xl md:text-7xl lg:text-8xl"
          >
            <span>Building AI</span>
            <span className="block text-slate-300">that survives</span>
            <span className="block gradient-text-premium mt-1">production.</span>
          </motion.h1>

          {/* Role */}
          <motion.p
            variants={fadeUp}
            className="mb-3 text-base font-semibold text-slate-100 sm:text-lg md:text-xl"
          >
            Mukunda Rao Katta · Senior AI/ML Engineer
          </motion.p>

          {/* Tagline */}
          <motion.p
            variants={fadeUp}
            className="mb-7 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base"
          >
            I design agentic RAG systems, model-risk guardrails, and cloud data platforms for Fortune 100 environments where latency, reliability, and trust are non-negotiable.
          </motion.p>

          {/* CTAs — stack on mobile, row on sm+ */}
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 mb-7">
            <motion.a
              href="#systems"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="neon-btn-primary flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold tracking-wide group"
            >
              View Systems
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </motion.a>
            <motion.a
              href={`mailto:${personal.email}`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="neon-tile flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold tracking-wide text-slate-100"
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

          <motion.div variants={fadeUp} className="mt-10 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
            {commandSignals.map(({ label, value, icon: Icon }) => (
              <div key={label} className="premium-signal">
                <Icon size={16} className="text-cyan-200" />
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">{label}</p>
                  <p className="mt-1 text-xs font-medium text-slate-100">{value}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
