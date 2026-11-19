import { useEffect, useRef } from 'react'

// Red "digital rain" that lives on the edges of the screen (masked out in the
// centre via CSS), echoing the bleeding side columns of a red-team HUD.
//
// Performance: on phones / touch screens it renders at 1x pixel density, at a
// lower frame rate, and pauses while the page is being scrolled, so the GPU
// and main thread are free for touch scrolling. Desktop rendering is unchanged.
const LITE_MQ = '(max-width: 1023px), (hover: none) and (pointer: coarse)'

export default function RedRain() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const lite = window.matchMedia(LITE_MQ).matches
    const glyphs = '01アカサタナハマヤラワ<>/\\{}[]#$%&*+=ABCDEF0123456789'
    const size = 14
    const frameMs = lite ? 90 : 55
    let cols = 0
    let drops = []
    let raf = 0
    let last = 0
    let scrollingUntil = 0

    const resize = () => {
      const dpr = lite ? 1 : Math.min(window.devicePixelRatio || 1, 2)
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
      if (t - last < frameMs) return
      if (lite && t < scrollingUntil) return // hold still while the user scrolls
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

    const start = () => { if (!raf && !reduce && !document.hidden) raf = requestAnimationFrame(draw) }
    const stop = () => { cancelAnimationFrame(raf); raf = 0 }
    const onVisibility = () => (document.hidden ? stop() : start())
    const onScroll = () => { scrollingUntil = performance.now() + 180 }

    // on phones the browser bar showing/hiding fires resize constantly: only
    // rebuild the canvas when the width changes (or the height changes a lot)
    let lastW = window.innerWidth
    let lastH = window.innerHeight
    const onResize = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      if (!lite || w !== lastW || Math.abs(h - lastH) > 120) { lastW = w; lastH = h; resize() }
    }

    resize()
    window.addEventListener('resize', onResize)
    document.addEventListener('visibilitychange', onVisibility)
    if (lite) window.addEventListener('scroll', onScroll, { passive: true })
    start()
    return () => {
      stop()
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return <canvas ref={ref} className="fx-rain" aria-hidden="true" />
}
