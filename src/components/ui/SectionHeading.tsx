import { motion } from 'framer-motion'

export function SectionHeading({
  kicker,
  title,
}: {
  kicker?: string
  title: string
}) {
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
      {kicker && (
        <div className="inline-flex items-center gap-2.5 mb-4 text-[11px] font-mono uppercase tracking-[0.3em] text-indigo-500/80 dark:text-indigo-400/80">
          <span className="accent-rule w-8 rounded-full" />
          <span>{kicker}</span>
          <span className="accent-rule w-8 rounded-full" />
        </div>
      )}
      <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
        <span className="text-slate-900 dark:text-white">{first}</span>
        {rest && (
          <>
            {' '}
            <span className="gradient-text-premium glow-text">{rest}</span>
          </>
        )}
      </h2>
    </motion.div>
  )
}
