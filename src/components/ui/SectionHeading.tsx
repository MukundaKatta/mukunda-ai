import { motion } from 'framer-motion'

/**
 * Editorial section heading — mono kicker (e.g. "01") above a two-tone H2.
 * First word in slate, rest in gradient. No emoji.
 */
export function SectionHeading({
  kicker,
  title,
  icon, // back-compat: legacy callers still pass emoji; ignored
}: {
  kicker?: string
  title: string
  icon?: string
}) {
  // If called with legacy `icon` and no `kicker`, derive a sensible default
  const label = kicker ?? (icon ? undefined : undefined)

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
      {label && (
        <div className="inline-flex items-center gap-2 mb-4 text-[11px] font-mono uppercase tracking-[0.3em] text-indigo-500/80 dark:text-indigo-400/80">
          <span className="h-px w-6 bg-indigo-400/40" />
          <span>{label}</span>
          <span className="h-px w-6 bg-indigo-400/40" />
        </div>
      )}
      <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
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
