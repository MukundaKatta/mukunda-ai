import { useEffect, useRef } from 'react'

/**
 * Neural-network-style ambient canvas.
 *
 * Renders 3–5 vertical layers of nodes with thin connections between
 * adjacent layers. Bright pulses periodically traverse random
 * connections, matching the indigo/violet palette.
 *
 * Designed as wallpaper — low-density, low-opacity, slow motion so it
 * reads as atmosphere and never competes with content.
 *
 * Respects prefers-reduced-motion. DPR-aware. Auto-resizes.
 */
export function NeuralPulse({
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

    const cfg = {
      subtle: { layers: 3, perLayer: [4, 5, 4], pulseRate: 0.015, nodeAlpha: 0.35, lineAlpha: 0.06, pulseAlpha: 0.55, pulseSpeed: 0.006 },
      normal: { layers: 4, perLayer: [4, 6, 6, 4], pulseRate: 0.025, nodeAlpha: 0.45, lineAlpha: 0.08, pulseAlpha: 0.7, pulseSpeed: 0.008 },
      strong: { layers: 5, perLayer: [4, 7, 8, 7, 4], pulseRate: 0.04, nodeAlpha: 0.6, lineAlpha: 0.1, pulseAlpha: 0.85, pulseSpeed: 0.01 },
    }[intensity]

    type Node = { x: number; y: number; layer: number; glow: number; violet: boolean }
    type Edge = { from: Node; to: Node }
    type Pulse = { edge: Edge; t: number; speed: number }

    let nodes: Node[] = []
    let edges: Edge[] = []
    let pulses: Pulse[] = []
    let rafId = 0
    let last = 0

    const build = () => {
      const rect = canvas.getBoundingClientRect()
      const { width, height } = rect
      nodes = []
      edges = []
      pulses = []

      // Evenly-spaced layers horizontally, with margin
      const marginX = width * 0.08
      const marginY = Math.min(height * 0.15, 120)
      const usableW = width - marginX * 2
      const usableH = height - marginY * 2

      for (let l = 0; l < cfg.layers; l++) {
        const n = cfg.perLayer[l] ?? cfg.perLayer[cfg.perLayer.length - 1]
        const x = marginX + (cfg.layers === 1 ? usableW / 2 : (usableW * l) / (cfg.layers - 1))
        for (let i = 0; i < n; i++) {
          // Slight vertical jitter so it feels organic, not rigid
          const baseY = marginY + (n === 1 ? usableH / 2 : (usableH * i) / (n - 1))
          const jitter = (Math.random() - 0.5) * (usableH / (n * 2.5))
          nodes.push({
            x: x + (Math.random() - 0.5) * 18,
            y: baseY + jitter,
            layer: l,
            glow: 0,
            violet: Math.random() < 0.2,
          })
        }
      }

      // Connect each node to 2–3 random nodes in the NEXT layer
      for (let l = 0; l < cfg.layers - 1; l++) {
        const fromLayer = nodes.filter(n => n.layer === l)
        const toLayer = nodes.filter(n => n.layer === l + 1)
        for (const from of fromLayer) {
          const connections = 2 + Math.floor(Math.random() * 2)
          const shuffled = [...toLayer].sort(() => Math.random() - 0.5)
          for (let k = 0; k < Math.min(connections, shuffled.length); k++) {
            edges.push({ from, to: shuffled[k] })
          }
        }
      }
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      canvas.width = Math.floor(rect.width * dpr)
      canvas.height = Math.floor(rect.height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      build()
    }

    const spawnPulse = () => {
      if (!edges.length) return
      const edge = edges[Math.floor(Math.random() * edges.length)]
      pulses.push({
        edge,
        t: 0,
        speed: cfg.pulseSpeed * (0.7 + Math.random() * 0.6),
      })
    }

    const draw = (t: number) => {
      rafId = requestAnimationFrame(draw)
      const dt = Math.min(t - last, 50)
      last = t
      const rect = canvas.getBoundingClientRect()
      const { width, height } = rect

      ctx.clearRect(0, 0, width, height)

      // 1) Draw edges (soft base lines)
      ctx.lineWidth = 1
      ctx.strokeStyle = `rgba(129, 140, 248, ${cfg.lineAlpha})`
      ctx.beginPath()
      for (const e of edges) {
        ctx.moveTo(e.from.x, e.from.y)
        ctx.lineTo(e.to.x, e.to.y)
      }
      ctx.stroke()

      // 2) Advance + draw pulses (only if motion allowed)
      if (!reduceMotion) {
        if (Math.random() < cfg.pulseRate) spawnPulse()
        // cap simultaneous pulses for perf
        if (pulses.length > 60) pulses.splice(0, pulses.length - 60)

        for (let i = pulses.length - 1; i >= 0; i--) {
          const p = pulses[i]
          p.t += p.speed * (dt / 16.67)
          if (p.t >= 1) {
            // Light up the destination node so the pulse "arrives"
            p.edge.to.glow = 1
            pulses.splice(i, 1)
            continue
          }
          const { from, to } = p.edge
          const x = from.x + (to.x - from.x) * p.t
          const y = from.y + (to.y - from.y) * p.t

          // Bright pulse head
          const r = from.violet || to.violet ? 196 : 129
          const g = from.violet || to.violet ? 181 : 140
          const b = from.violet || to.violet ? 253 : 248

          // Trail line segment behind the pulse
          const trailT = Math.max(0, p.t - 0.15)
          const tx = from.x + (to.x - from.x) * trailT
          const ty = from.y + (to.y - from.y) * trailT
          const gradient = ctx.createLinearGradient(tx, ty, x, y)
          gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0)`)
          gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, ${cfg.pulseAlpha})`)
          ctx.strokeStyle = gradient
          ctx.lineWidth = 1.5
          ctx.beginPath()
          ctx.moveTo(tx, ty)
          ctx.lineTo(x, y)
          ctx.stroke()

          // Glowing head dot
          const headR = 2.2
          const grad = ctx.createRadialGradient(x, y, 0, x, y, headR * 4)
          grad.addColorStop(0, `rgba(${r + 30}, ${g + 30}, 255, ${cfg.pulseAlpha})`)
          grad.addColorStop(0.4, `rgba(${r}, ${g}, ${b}, ${cfg.pulseAlpha * 0.4})`)
          grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)
          ctx.fillStyle = grad
          ctx.beginPath()
          ctx.arc(x, y, headR * 4, 0, Math.PI * 2)
          ctx.fill()
          ctx.fillStyle = `rgba(235, 232, 255, ${cfg.pulseAlpha})`
          ctx.beginPath()
          ctx.arc(x, y, headR, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // 3) Draw nodes (with decaying glow from recent pulse arrivals)
      for (const n of nodes) {
        n.glow *= 0.96 // decay
        const r = n.violet ? 196 : 129
        const g = n.violet ? 181 : 140
        const b = n.violet ? 253 : 248
        const baseAlpha = cfg.nodeAlpha + n.glow * 0.5
        const haloR = 5 + n.glow * 6
        // Halo
        const halo = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, haloR * 2)
        halo.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${baseAlpha * 0.4})`)
        halo.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)
        ctx.fillStyle = halo
        ctx.beginPath()
        ctx.arc(n.x, n.y, haloR * 2, 0, Math.PI * 2)
        ctx.fill()
        // Core
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${baseAlpha})`
        ctx.beginPath()
        ctx.arc(n.x, n.y, 1.8 + n.glow * 0.8, 0, Math.PI * 2)
        ctx.fill()
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
