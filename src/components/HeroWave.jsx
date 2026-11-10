import { useEffect, useRef } from 'react'

// Red terrain that rolls along the bottom of a section.
// Default: dotted particles (hero). `mesh`: wireframe grid (findings).
export default function HeroWave({ mesh = false, className = 'hero-wave' }) {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w = 0, h = 0, raf, t = 0, visible = true

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.clientWidth; h = canvas.clientHeight
      canvas.width = w * dpr; canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const height = (x, z) =>
      Math.sin(x * 0.006 + z * 0.35 + t) * 18 +
      Math.sin(x * 0.013 - z * 0.22 + t * 0.7) * 10 +
      Math.sin(x * 0.0025 + t * 0.4) * 26 * (1 - z / 30)

    const point = (x, z, rows) => {
      const p = z / rows // 0 = far (top), 1 = near (bottom)
      const y0 = h * 0.18 + p * p * h * 0.9
      const spread = 0.6 + p * 0.9
      // ridges rise toward the edges, leaving a valley in the middle
      const edge = Math.pow(Math.abs(x / w - 0.5) * 2, 2.2)
      const y = y0 - (height(x, z) + 30) * spread * (0.25 + edge * 1.4)
      return [(x - w / 2) * (0.9 + p * 0.25) + w / 2, y, p]
    }

    const drawDots = () => {
      const rows = 28
      const step = w < 700 ? 14 : 10
      for (let z = 0; z < rows; z++) {
        const p = z / rows
        const r = 0.5 + p * 1.3
        ctx.fillStyle = `rgba(255, ${40 + (p * 30) | 0}, 60, ${0.08 + p * 0.55})`
        for (let x = -40; x < w + 40; x += step) {
          const [px, py] = point(x, z, rows)
          ctx.fillRect(px, py, r, r)
        }
      }
    }

    const drawMesh = () => {
      const rows = 22
      const step = w < 700 ? 34 : 26
      const grid = []
      for (let z = 0; z < rows; z++) {
        const row = []
        for (let x = -60; x < w + 60; x += step) row.push(point(x, z, rows))
        grid.push(row)
      }
      ctx.lineWidth = 1
      for (let z = 0; z < rows; z++) {
        const p = z / rows
        ctx.strokeStyle = `rgba(255, 40, 60, ${0.06 + p * 0.5})`
        ctx.beginPath()
        grid[z].forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)))
        ctx.stroke()
      }
      for (let i = 0; i < grid[0].length; i++) {
        ctx.beginPath()
        for (let z = 0; z < rows; z++) {
          const [x, y] = grid[z][i]
          z ? ctx.lineTo(x, y) : ctx.moveTo(x, y)
        }
        ctx.strokeStyle = 'rgba(255, 40, 60, 0.18)'
        ctx.stroke()
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      mesh ? drawMesh() : drawDots()
    }

    const loop = () => {
      raf = requestAnimationFrame(loop)
      if (!visible) return
      t += 0.008
      draw()
    }

    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting })
    io.observe(canvas)
    resize(); draw()
    window.addEventListener('resize', resize)
    if (!reduce) raf = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(raf); io.disconnect(); window.removeEventListener('resize', resize) }
  }, [mesh])

  return <canvas ref={ref} className={className} aria-hidden="true" />
}
