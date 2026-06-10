import { motion } from 'framer-motion'

/**
 * Animated, centered section heading with an optional kicker label.
 *
 * The `title` is split on the first space so the first word renders in the
 * foreground color and the remainder in the premium gradient, giving section
 * titles a consistent two-tone treatment. The heading fades and slides in once
 * when scrolled into view.
 *
 * @param props.kicker - Optional uppercase eyebrow text shown above the title.
 * @param props.title - The heading text. The first word is styled separately from the rest.
 *
 * @example
 * ```tsx
 * <SectionHeading kicker="Work" title="Selected Experience" />
 * ```
 */
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
        <div className="inline-flex items-center gap-2 mb-4 text-[11px] font-mono uppercase tracking-[0.3em] text-indigo-500/80 dark:text-indigo-400/80">
          <span className="h-px w-6 bg-indigo-400/40" />
          <span>{kicker}</span>
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
