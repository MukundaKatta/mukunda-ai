import { motion } from 'framer-motion'

export function CinematicDivider() {
  return (
    <div aria-hidden className="relative h-16 overflow-hidden bg-black">
      <div className="absolute inset-x-0 top-1/2 h-px bg-white/10" />
      <motion.div
        className="absolute left-0 top-1/2 h-px w-1/3 bg-gradient-to-r from-transparent via-cyan-200 to-transparent"
        animate={{ x: ['-120%', '330%'] }}
        transition={{ duration: 5.8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.075),transparent_58%)]" />
    </div>
  )
}
