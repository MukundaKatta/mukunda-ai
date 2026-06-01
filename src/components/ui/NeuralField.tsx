import { useEffect, useRef } from 'react'

type Node = {
  x: number
  y: number
  vx: number
  vy: number
  r: number
}

export function NeuralField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = 0
    let height = 0
    let frame = 0
    let animation = 0
    let nodes: Node[] = []
    const pointer = { x: 0.72, y: 0.34 }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = Math.max(34, Math.min(76, Math.floor((width * height) / 24000)))
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.18,
        r: 0.8 + Math.random() * 1.7,
      }))
    }

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = (event.clientX - rect.left) / rect.width
      pointer.y = (event.clientY - rect.top) / rect.height
    }

    const draw = () => {
      frame += 0.006
      ctx.clearRect(0, 0, width, height)

      const focusX = width * pointer.x
      const focusY = height * pointer.y

      for (const node of nodes) {
        node.x += node.vx + Math.sin(frame + node.y * 0.004) * 0.045
        node.y += node.vy + Math.cos(frame + node.x * 0.003) * 0.035

        if (node.x < -20) node.x = width + 20
        if (node.x > width + 20) node.x = -20
        if (node.y < -20) node.y = height + 20
        if (node.y > height + 20) node.y = -20
      }

      for (let i = 0; i < nodes.length; i += 1) {
        const a = nodes[i]
        for (let j = i + 1; j < nodes.length; j += 1) {
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          if (distance < 150) {
            const alpha = (1 - distance / 150) * 0.16
            ctx.strokeStyle = `rgba(125, 211, 252, ${alpha})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }

        const pointerDistance = Math.hypot(a.x - focusX, a.y - focusY)
        const pulse = Math.max(0, 1 - pointerDistance / 260)
        ctx.fillStyle = `rgba(196, 181, 253, ${0.28 + pulse * 0.5})`
        ctx.beginPath()
        ctx.arc(a.x, a.y, a.r + pulse * 1.4, 0, Math.PI * 2)
        ctx.fill()
      }

      const glow = ctx.createRadialGradient(focusX, focusY, 0, focusX, focusY, 340)
      glow.addColorStop(0, 'rgba(34, 211, 238, 0.12)')
      glow.addColorStop(0.45, 'rgba(99, 102, 241, 0.055)')
      glow.addColorStop(1, 'rgba(0, 0, 0, 0)')
      ctx.fillStyle = glow
      ctx.fillRect(0, 0, width, height)

      animation = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onPointerMove)

    return () => {
      cancelAnimationFrame(animation)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" />
}
