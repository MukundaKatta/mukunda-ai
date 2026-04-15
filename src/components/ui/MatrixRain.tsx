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

    // Thin rain — wallpaper, wide column gaps, restrained opacity.
    const cfg = {
      subtle: { head: 0.22, tail: 0.12, trail: 0.06, fade: 0.12, fps: 14, step: 3 },
      normal: { head: 0.32, tail: 0.18, trail: 0.09, fade: 0.10, fps: 16, step: 2.8 },
      strong: { head: 0.42, tail: 0.24, trail: 0.12, fade: 0.09, fps: 18, step: 2.5 },
    }[intensity]

    const CHARS = '01'
    const FONT_SIZE = 16
    const COL_GAP = FONT_SIZE * cfg.step // wider breathing room between streams

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
      columns = Math.floor(rect.width / COL_GAP)
      drops = Array.from({ length: columns }, () => Math.random() * -rect.height / 2)
      trailLengths = Array.from({ length: columns }, () => 6 + Math.floor(Math.random() * 14))
      hueMix = Array.from({ length: columns }, () => (Math.random() < 0.15 ? 1 : 0))
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
        const x = i * COL_GAP
        const y = drops[i]
        const isViolet = hueMix[i] === 1
        // indigo-400 / violet-400 (slightly dimmer than 300 for wallpaper feel)
        const tailR = isViolet ? 167 : 129
        const tailG = isViolet ? 139 : 140
        const tailB = isViolet ? 250 : 248

        const char = CHARS.charAt(Math.floor(Math.random() * CHARS.length))

        // Head glyph — restrained, no shadowBlur (shadow made it read as foreground)
        ctx.fillStyle = `rgba(${tailR + 60}, ${tailG + 60}, 255, ${cfg.head})`
        ctx.fillText(char, x, y)

        // Secondary tail
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
