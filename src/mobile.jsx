// Shared building blocks for the mobile "app mode" (phones, <= 760px).
// Every piece renders harmlessly on desktop: tab bars, dots and toggles are hidden
// there by CSS, and panels/cards keep their normal desktop layout.
import { useCallback, useEffect, useRef, useState } from 'react'

export const APP_MQ = '(max-width: 760px)'

export function useAppMode() {
  const [on, setOn] = useState(() => typeof window !== 'undefined' && window.matchMedia(APP_MQ).matches)
  useEffect(() => {
    const mq = window.matchMedia(APP_MQ)
    const update = () => setOn(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return on
}

/**
 * Tracks which card of a horizontal scroll-snap track is in view.
 * The track is a normal grid on desktop; in app mode CSS turns it into a swipe row.
 */
export function useSwipe() {
  const ref = useRef(null)
  const [index, setIndex] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const cards = () => [...el.children].filter((c) => !c.hasAttribute('data-swipe-ignore'))
    setCount(cards().length)
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const mid = el.scrollLeft + el.clientWidth / 2
        let best = 0
        let bestD = Infinity
        cards().forEach((c, i) => {
          const d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - mid)
          if (d < bestD) { bestD = d; best = i }
        })
        setIndex(best)
      })
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => { el.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf) }
  }, [])

  const go = useCallback((i) => {
    const el = ref.current
    if (!el) return
    const cards = [...el.children].filter((c) => !c.hasAttribute('data-swipe-ignore'))
    const c = cards[Math.max(0, Math.min(cards.length - 1, i))]
    if (!c) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollTo({ left: c.offsetLeft - (el.clientWidth - c.offsetWidth) / 2, behavior: reduce ? 'auto' : 'smooth' })
  }, [])

  return { ref, index, count, go }
}

/** Dots + prev/next for a swipe track (app mode only). */
export function SwipeDots({ swipe, label }) {
  const { index, count, go } = swipe
  if (count < 2) return null
  return (
    <div className="m-dots" role="group" aria-label={`${label} navigation`}>
      <button type="button" className="m-dots-arrow" onClick={() => go(index - 1)} disabled={index === 0} aria-label={`Previous ${label}`}>
        <i className="fa-solid fa-chevron-left"></i>
      </button>
      <div className="m-dots-row">
        {Array.from({ length: count }, (_, i) => (
          <button
            key={i}
            type="button"
            className={`m-dot ${i === index ? 'on' : ''}`}
            onClick={() => go(i)}
            aria-label={`${label} ${i + 1} of ${count}`}
            aria-current={i === index ? 'true' : undefined}
          ></button>
        ))}
      </div>
      <span className="m-dots-count" aria-hidden="true">{String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}</span>
      <button type="button" className="m-dots-arrow" onClick={() => go(index + 1)} disabled={index === count - 1} aria-label={`Next ${label}`}>
        <i className="fa-solid fa-chevron-right"></i>
      </button>
    </div>
  )
}

/** Compact tab bar (app mode only). Panels opt in with className={panelClass(id)}. */
export function useTabs(first) {
  const [tab, setTab] = useState(first)
  const panelClass = (id) => `m-panel ${tab === id ? 'is-on' : ''}`
  return { tab, setTab, panelClass }
}

export function TabBar({ tabs, tab, setTab, idPrefix, label }) {
  const refs = useRef([])
  const onKey = (e, i) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    e.preventDefault()
    const next = (i + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length
    setTab(tabs[next].id)
    refs.current[next]?.focus()
  }
  return (
    <div className="m-tabs" role="tablist" aria-label={label}>
      {tabs.map((t, i) => (
        <button
          key={t.id}
          ref={(el) => { refs.current[i] = el }}
          type="button"
          role="tab"
          id={`${idPrefix}-tab-${t.id}`}
          aria-controls={`${idPrefix}-panel-${t.id}`}
          aria-selected={tab === t.id}
          tabIndex={tab === t.id ? 0 : -1}
          className={`m-tab ${tab === t.id ? 'on' : ''}`}
          onClick={() => setTab(t.id)}
          onKeyDown={(e) => onKey(e, i)}
        >
          {t.icon && <i className={t.icon} aria-hidden="true"></i>}
          <span>{t.label}</span>
        </button>
      ))}
    </div>
  )
}

/** Per-card "Details" expansion state for a list of cards. */
export function useExpand() {
  const [open, setOpen] = useState(() => new Set())
  const isOpen = (k) => open.has(k)
  const toggle = (k) => setOpen((s) => {
    const n = new Set(s)
    if (n.has(k)) n.delete(k)
    else n.add(k)
    return n
  })
  return { isOpen, toggle }
}

export function ExpandToggle({ open, onClick, controls }) {
  return (
    <button type="button" className="m-more-btn" aria-expanded={open} aria-controls={controls} onClick={onClick}>
      {open ? 'Less' : 'Details'} <i className={`fa-solid fa-chevron-${open ? 'up' : 'down'}`} aria-hidden="true"></i>
    </button>
  )
}
