import { useEffect, useRef } from 'react'

/**
 * Subtle falling-glyph background, tuned for ambience not spectacle.
 * Respects prefers-reduced-motion. Auto-resizes on viewport changes.
 */
export function MatrixRain({
  density = 0.6,
  opacity = 0.18,
  color = '129, 140, 248', // indigo-400 rgb triplet
  className = '',
}: {
  density?: number
  opacity?: number
  color?: string
  className?: string
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    const CHARS = '01{}<>/=+*#アイウエオカキクケコサシスセソタチツテトナニヌネノ'
    let fontSize = 14
    let columns = 0
    let drops: number[] = []
    let rafId = 0
    let last = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const { width, height } = canvas.getBoundingClientRect()
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.scale(dpr, dpr)
      fontSize = 14
      columns = Math.floor((width / fontSize) * density)
      drops = Array.from({ length: columns }, () => Math.random() * -height)
    }

    const draw = (t: number) => {
      rafId = requestAnimationFrame(draw)
      // ~14 fps to keep it calm and cheap
      if (t - last < 70) return
      last = t

      const { width, height } = canvas.getBoundingClientRect()
      // Fade previous frame for a soft trail
      ctx.fillStyle = `rgba(0, 0, 0, 0.12)`
      ctx.fillRect(0, 0, width, height)

      ctx.font = `${fontSize}px ui-monospace, "SFMono-Regular", Menlo, monospace`
      ctx.textBaseline = 'top'

      for (let i = 0; i < drops.length; i++) {
        const x = ((i + 0.5) / density) * fontSize
        const y = drops[i]
        const char = CHARS.charAt(Math.floor(Math.random() * CHARS.length))
        // Head glyph brighter
        ctx.fillStyle = `rgba(${color}, ${opacity * 1.8})`
        ctx.fillText(char, x, y)
        // Tail dimmer
        ctx.fillStyle = `rgba(${color}, ${opacity * 0.45})`
        ctx.fillText(char, x, y - fontSize)

        drops[i] = y > height && Math.random() > 0.975 ? 0 : y + fontSize
      }
    }

    resize()
    rafId = requestAnimationFrame(draw)
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    return () => {
      cancelAnimationFrame(rafId)
      ro.disconnect()
    }
  }, [density, opacity, color])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  )
}
