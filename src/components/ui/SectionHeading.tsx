import { motion } from 'framer-motion'

export function SectionHeading({ icon, title }: { icon: string; title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex items-center gap-3 mb-12"
    >
      <span className="text-2xl">{icon}</span>
      <h2 className="font-display text-4xl md:text-5xl text-slate-900 dark:text-white tracking-tight">{title}</h2>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1 h-px bg-gradient-to-r from-indigo-500/30 to-transparent origin-left"
      />
    </motion.div>
  )
}
