import { useEffect } from 'react'

// Full-page mode is only used where a section can realistically fit one screen
// without becoming unreadable. Keep in sync with the media query in index.css.
export const FULLPAGE_MQ = '(min-width: 1024px) and (min-height: 560px)'

// Below this scale text gets too small to read (~10px). A section that would need
// more shrinking keeps this scale and is allowed to be taller than one screen.
const MIN_SCALE = 0.6

/**
 * Makes every <main> section fit exactly one viewport in full-page mode.
 * Spacing is tightened in CSS first; whatever still overflows is scaled down
 * uniformly (transform), so the design keeps its proportions and nothing is cut.
 * The negative margin cancels the unscaled layout height so flex centering works.
 */
export default function useFitSections(deps = []) {
  useEffect(() => {
    const mq = window.matchMedia(FULLPAGE_MQ)
    const pairs = [...document.querySelectorAll('main.column > section')]
      .map((sec) => [sec, sec.querySelector(':scope > .fnd-wrap, :scope > .hero-wrap, :scope > .wrap')])
      .filter(([, wrap]) => wrap)

    let raf = 0
    const apply = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        for (const [sec, wrap] of pairs) {
          wrap.classList.add('fit-wrap')
          if (!mq.matches) {
            wrap.style.transform = ''
            wrap.style.marginBottom = ''
            delete sec.dataset.tall
            sec.querySelector(':scope > .snap-end')?.remove()
            continue
          }
          const cs = getComputedStyle(sec)
          // measure against the viewport, not the section: a "tall" section grows,
          // and using its own height would make the fit decision oscillate
          const avail = window.innerHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom)
          const natural = wrap.offsetHeight // layout height ignores transforms
          // fit both height and width (content is laid out at a desktop design width)
          const fit = Math.min(1, avail / natural, sec.clientWidth / wrap.offsetWidth)
          const s = Math.max(fit, MIN_SCALE)
          if (fit < MIN_SCALE) {
            sec.dataset.tall = ''
            // second snap point so the bottom of a taller-than-screen section is reachable
            if (!sec.querySelector(':scope > .snap-end')) {
              const end = document.createElement('span')
              end.className = 'snap-end'
              end.setAttribute('aria-hidden', 'true')
              sec.appendChild(end)
            }
          } else {
            delete sec.dataset.tall
            sec.querySelector(':scope > .snap-end')?.remove()
          }
          wrap.style.transform = s < 1 ? `scale(${s.toFixed(4)})` : ''
          wrap.style.marginBottom = s < 1 ? `${(-(1 - s) * natural).toFixed(1)}px` : ''
          wrap.dataset.fit = s.toFixed(3)
        }
      })
    }

    apply()
    const ro = new ResizeObserver(apply)
    pairs.forEach(([sec, wrap]) => { ro.observe(sec); ro.observe(wrap) })
    mq.addEventListener('change', apply)
    window.addEventListener('resize', apply)
    document.fonts?.ready.then(apply)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      mq.removeEventListener('change', apply)
      window.removeEventListener('resize', apply)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

/**
 * Wheel / touchpad paging for full-page mode: one gesture = one section, with a
 * smooth glide. CSS mandatory snapping handles keyboard, scrollbar and anchors;
 * wheel input is taken over here because browsers treat it inconsistently under
 * mandatory snapping. A section taller than the screen is scrolled through first.
 */
export function useFullPageWheel() {
  useEffect(() => {
    const mq = window.matchMedia(FULLPAGE_MQ)
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    const LOCK_MS = 900
    let lockedUntil = 0
    let acc = 0
    let accTimer = 0

    const pages = () => [...document.querySelectorAll('main.column > section')]

    const targetFor = (dir) => {
      const y = window.scrollY
      const vh = window.innerHeight
      const maxY = document.documentElement.scrollHeight - vh
      const list = pages()
      let idx = -1
      list.forEach((s, i) => { if (s.offsetTop <= y + 2) idx = i })
      const cur = list[idx]

      if (dir > 0) {
        // taller-than-screen section: go to its bottom snap point (.snap-end) first
        if (cur && cur.offsetHeight > vh + 2 && y + vh < cur.offsetTop + cur.offsetHeight - 2) {
          return cur.offsetTop + cur.offsetHeight - vh
        }
        const next = list[idx + 1]
        return next ? next.offsetTop : maxY // past the last section: reveal the footer
      }

      // part-way into the current section (its bottom snap point, or the footer): back to its start
      if (cur && y > cur.offsetTop + 2) return cur.offsetTop
      const prev = list[idx - 1]
      if (!prev) return 0
      return Math.max(prev.offsetTop, prev.offsetTop + prev.offsetHeight - vh) // land on its last screen
    }

    const onWheel = (e) => {
      if (!mq.matches || e.ctrlKey || Math.abs(e.deltaY) < Math.abs(e.deltaX)) return
      if (document.body.style.overflow === 'hidden') return // modal or loader open
      if (e.target instanceof Element && e.target.closest('.modal, .nav-links.open')) return
      e.preventDefault()

      const now = performance.now()
      if (now < lockedUntil) return
      if (Math.sign(e.deltaY) !== Math.sign(acc)) acc = 0 // direction changed: start fresh
      // touchpads send many small deltas: act once enough intent has accumulated
      acc += e.deltaY
      clearTimeout(accTimer)
      accTimer = setTimeout(() => { acc = 0 }, 180)
      if (Math.abs(acc) < 25) return

      const dir = Math.sign(acc)
      acc = 0
      const top = Math.round(targetFor(dir))
      if (Math.abs(top - window.scrollY) < 2) return
      lockedUntil = now + LOCK_MS
      window.scrollTo({ top, behavior: reduce.matches ? 'auto' : 'smooth' })
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    return () => {
      window.removeEventListener('wheel', onWheel)
      clearTimeout(accTimer)
    }
  }, [])
}
