import { useState, useEffect, useRef, useCallback } from 'react'

/**
 * Count-up number that animates from `0` to `end` the first time it scrolls into view.
 *
 * Uses an `IntersectionObserver` to start the animation only once the element is
 * visible, with a timeout fallback for elements already on screen at mount. The
 * count eases out cubically over `duration` milliseconds and animates exactly once.
 *
 * @param props.end - Target value to count up to.
 * @param props.suffix - Optional text appended after the number (e.g. `"+"`, `"%"`). Defaults to `""`.
 * @param props.duration - Animation length in milliseconds. Defaults to `2000`.
 *
 * @example
 * ```tsx
 * <AnimatedCounter end={50} suffix="+" />
 * ```
 */
export function AnimatedCounter({ end, suffix = '', duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  const animate = useCallback(() => {
    if (started.current) return
    started.current = true
    const start = performance.now()
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * end))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [end, duration])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          animate()
        }
      },
      { threshold: 0.05, rootMargin: '50px' }
    )

    observer.observe(el)

    // Fallback: if element is already visible on mount, start animation after short delay
    const timer = setTimeout(() => {
      if (!started.current && el.getBoundingClientRect().top < window.innerHeight) {
        animate()
      }
    }, 500)

    return () => {
      observer.disconnect()
      clearTimeout(timer)
    }
  }, [animate])

  return <span ref={ref}>{count}{suffix}</span>
}
