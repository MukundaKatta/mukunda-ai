import { useState, useEffect, useRef, useCallback } from 'react'

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
