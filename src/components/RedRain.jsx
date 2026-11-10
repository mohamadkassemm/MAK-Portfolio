import { useEffect, useRef } from 'react'

// Red "digital rain" that lives on the edges of the screen (masked out in the
// centre via CSS), echoing the bleeding side columns of a red-team HUD.
export default function RedRain() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const glyphs = '01アカサタナハマヤラワ<>/\\{}[]#$%&*+=ABCDEF0123456789'
    const size = 14
    let cols = 0
    let drops = []
    let raf
    let last = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = window.innerWidth + 'px'
      canvas.style.height = window.innerHeight + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      cols = Math.ceil(window.innerWidth / size)
      drops = Array.from({ length: cols }, () => Math.random() * -60)
    }

    const draw = (t) => {
      raf = requestAnimationFrame(draw)
      if (t - last < 55) return
      last = t
      ctx.fillStyle = 'rgba(7, 3, 4, 0.14)'
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)
      ctx.font = `${size}px "JetBrains Mono", monospace`
      for (let i = 0; i < cols; i++) {
        const ch = glyphs[(Math.random() * glyphs.length) | 0]
        const y = drops[i] * size
        ctx.fillStyle = Math.random() > 0.975 ? '#ffd0d4' : `rgba(255, ${30 + ((Math.random() * 40) | 0)}, 50, ${0.55 + Math.random() * 0.45})`
        ctx.fillText(ch, i * size, y)
        if (y > window.innerHeight && Math.random() > 0.975) drops[i] = 0
        drops[i] += 1
      }
    }

    resize()
    window.addEventListener('resize', resize)
    if (!reduce) raf = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={ref} className="fx-rain" aria-hidden="true" />
}
