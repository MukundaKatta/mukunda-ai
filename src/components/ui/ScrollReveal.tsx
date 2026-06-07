import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

const variants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

/**
 * Wrapper that fades, slides, and un-blurs its children into view on scroll.
 *
 * The animation runs once (`viewport.once`) when the element enters the viewport,
 * making it suitable for revealing sections as the user scrolls down the page.
 *
 * @param props.children - Content to reveal.
 * @param props.className - Optional class names applied to the wrapping element. Defaults to `""`.
 * @param props.delay - Delay in seconds before the reveal starts, useful for staggering. Defaults to `0`.
 *
 * @example
 * ```tsx
 * <ScrollReveal delay={0.1}>
 *   <Card />
 * </ScrollReveal>
 * ```
 */
export function ScrollReveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      variants={variants}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  )
}
