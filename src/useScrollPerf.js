import { useEffect } from 'react'

// Touch screens: phones, tablets, touch-only devices. Desktop (mouse/trackpad) is not matched.
const LITE_MQ = '(max-width: 1023px), (hover: none) and (pointer: coarse)'

/**
 * Keeps scrolling light without changing what is shown:
 *  - sections that are off screen get [data-offscreen], which pauses their
 *    looping decorative animations (pulses, cursors, marquee, sweeps) — invisible
 *    to the user, but the browser no longer restyles them every frame;
 *  - on touch screens, <html> gets .is-scrolling while a scroll is in progress,
 *    pausing those same loops until ~150ms after the finger stops.
 * Entrance (reveal) animations are never paused, so content never appears late.
 */
export default function useScrollPerf() {
  useEffect(() => {
    const targets = [...document.querySelectorAll('main.column > section, .site-footer')]
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.toggleAttribute('data-offscreen', !e.isIntersecting)),
      { rootMargin: '120px 0px' }
    )
    targets.forEach((t) => io.observe(t))

    const lite = window.matchMedia(LITE_MQ)
    const root = document.documentElement
    let timer = 0
    let scrolling = false
    const onScroll = () => {
      if (!lite.matches) return
      if (!scrolling) { scrolling = true; root.classList.add('is-scrolling') }
      clearTimeout(timer)
      timer = setTimeout(() => { scrolling = false; root.classList.remove('is-scrolling') }, 150)
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      io.disconnect()
      clearTimeout(timer)
      root.classList.remove('is-scrolling')
      window.removeEventListener('scroll', onScroll)
    }
  }, [])
}
