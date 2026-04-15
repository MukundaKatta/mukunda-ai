import { useEffect, useRef } from 'react'

/**
 * Authentic matrix rain tuned for this app's indigo/violet palette.
 *
 * Each stream has:
 *  - a bright near-white head glyph (the leading character)
 *  - an indigo/violet tail that fades via low-opacity background fill
 *  - occasional violet-accented streams for palette sync
 *
 * Design notes:
 *  - Trail fade color matches the section background (#030308) so the
 *    canvas doesn't darken the section over time.
 *  - DPR-aware, auto-resizes, and respects prefers-reduced-motion.
 */
export function MatrixRain({
  intensity = 'normal',
  className = '',
}: {
  intensity?: 'subtle' | 'normal' | 'strong'
  className?: string
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    // Intensity presets
    const cfg = {
      subtle: { head: 0.75, tail: 0.45, trail: 0.30, fade: 0.10, fps: 16 },
      normal: { head: 0.92, tail: 0.65, trail: 0.42, fade: 0.08, fps: 18 },
      strong: { head: 1.00, tail: 0.80, trail: 0.55, fade: 0.06, fps: 22 },
    }[intensity]

    const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&@*+=<>/[]{}()!?;:'
    const FONT_SIZE = 15

    let columns = 0
    let drops: number[] = []
    let trailLengths: number[] = []
    let hueMix: number[] = [] // 0 = indigo, 1 = violet
    let rafId = 0
    let last = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      canvas.width = Math.floor(rect.width * dpr)
      canvas.height = Math.floor(rect.height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      columns = Math.floor(rect.width / FONT_SIZE)
      drops = Array.from({ length: columns }, () => Math.random() * -rect.height / 2)
      trailLengths = Array.from({ length: columns }, () => 6 + Math.floor(Math.random() * 14))
      hueMix = Array.from({ length: columns }, () => (Math.random() < 0.18 ? 1 : 0))
      // Clear once
      ctx.clearRect(0, 0, rect.width, rect.height)
    }

    const draw = (t: number) => {
      rafId = requestAnimationFrame(draw)
      const frameMs = 1000 / cfg.fps
      if (t - last < frameMs) return
      last = t

      const rect = canvas.getBoundingClientRect()
      const { width, height } = rect

      // Trail fade — matches section bg #030308 so we don't stain
      ctx.fillStyle = `rgba(3, 3, 8, ${cfg.fade})`
      ctx.fillRect(0, 0, width, height)

      ctx.font = `600 ${FONT_SIZE}px 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace`
      ctx.textBaseline = 'top'

      for (let i = 0; i < columns; i++) {
        const x = i * FONT_SIZE
        const y = drops[i]
        const isViolet = hueMix[i] === 1
        // indigo-300 / violet-300
        const tailR = isViolet ? 196 : 165
        const tailG = isViolet ? 181 : 180
        const tailB = isViolet ? 253 : 252

        const char = CHARS.charAt(Math.floor(Math.random() * CHARS.length))

        // Head glyph — bright near-white, faint palette tint
        ctx.fillStyle = `rgba(235, 232, 255, ${cfg.head})`
        ctx.shadowColor = `rgba(${tailR}, ${tailG}, ${tailB}, 0.8)`
        ctx.shadowBlur = 8
        ctx.fillText(char, x, y)
        ctx.shadowBlur = 0

        // Secondary (one step up) — bright tail
        ctx.fillStyle = `rgba(${tailR}, ${tailG}, ${tailB}, ${cfg.tail})`
        ctx.fillText(char, x, y - FONT_SIZE)

        // Tertiary — fading
        ctx.fillStyle = `rgba(${tailR}, ${tailG}, ${tailB}, ${cfg.trail})`
        ctx.fillText(char, x, y - FONT_SIZE * 2)

        // Advance drop
        drops[i] = y + FONT_SIZE
        if (drops[i] > height + trailLengths[i] * FONT_SIZE) {
          if (Math.random() > 0.975) {
            drops[i] = -FONT_SIZE * 2
            trailLengths[i] = 6 + Math.floor(Math.random() * 14)
            hueMix[i] = Math.random() < 0.18 ? 1 : 0
          }
        }
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
  }, [intensity])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  )
}
