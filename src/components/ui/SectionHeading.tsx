import { motion } from 'framer-motion'

/**
 * Two-tone bold sans heading. First word in slate, rest in gradient.
 * Matches the premium "Hi, I'm Anant" style from reference.
 */
export function SectionHeading({ icon, title }: { icon: string; title: string }) {
  const words = title.split(' ')
  const first = words[0]
  const rest = words.slice(1).join(' ')

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="text-center mb-14"
    >
      <div className="inline-flex items-center gap-2 mb-3 text-xs font-mono uppercase tracking-[0.25em] text-indigo-500 dark:text-indigo-400">
        <span className="h-px w-8 bg-indigo-400/50" />
        <span>{icon}</span>
      </div>
      <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
        <span className="text-slate-900 dark:text-white">{first}</span>
        {rest && (
          <>
            {' '}
            <span className="gradient-text-premium">{rest}</span>
          </>
        )}
      </h2>
    </motion.div>
  )
}
