import { useEffect, useRef, useState } from 'react'

// Fixed bottom navigation for the mobile app mode (hidden on larger screens by CSS).
const primary = [
  { id: 'home', label: 'Home', icon: 'fa-solid fa-house' },
  { id: 'bugbounty', label: 'Intel', icon: 'fa-solid fa-crosshairs' },
  { id: 'experience', label: 'Ops', icon: 'fa-solid fa-timeline' },
  { id: 'projects', label: 'Work', icon: 'fa-solid fa-laptop-code' },
]
const more = [
  { id: 'skills', label: 'Arsenal', icon: 'fa-solid fa-toolbox', hint: 'Skills & tools' },
  { id: 'education', label: 'Clearance', icon: 'fa-solid fa-graduation-cap', hint: 'Degrees & certificates' },
  { id: 'events', label: 'Field Ops', icon: 'fa-solid fa-images', hint: 'Event gallery' },
  { id: 'contact', label: 'Connect', icon: 'fa-solid fa-satellite-dish', hint: 'Open a session' },
]
const ALL = [...primary, ...more].map((x) => x.id)

export default function MobileNav({ onViewCv }) {
  const [active, setActive] = useState('home')
  const [sheet, setSheet] = useState(false)
  const sheetRef = useRef(null)
  const moreBtn = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    )
    ALL.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [])

  // sheet: Escape closes, focus moves into it and returns to the More button
  useEffect(() => {
    if (!sheet) return
    const onKey = (e) => { if (e.key === 'Escape') setSheet(false) }
    document.addEventListener('keydown', onKey)
    sheetRef.current?.querySelector('a, button')?.focus()
    return () => { document.removeEventListener('keydown', onKey); moreBtn.current?.focus() }
  }, [sheet])

  const go = (id) => (e) => {
    e.preventDefault()
    setSheet(false)
    const el = document.getElementById(id)
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
    if (navigator.vibrate) navigator.vibrate(8)
  }

  const moreActive = more.some((m) => m.id === active)

  return (
    <>
      <div className={`m-sheet-scrim ${sheet ? 'open' : ''}`} onClick={() => setSheet(false)} aria-hidden="true"></div>
      <div
        ref={sheetRef}
        className={`m-sheet ${sheet ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="More sections"
        aria-hidden={!sheet}
        inert={sheet ? undefined : ''}
      >
        <div className="m-sheet-grip" aria-hidden="true"></div>
        <div className="m-sheet-head"><span>//</span> Navigate</div>
        <div className="m-sheet-grid">
          {more.map((m) => (
            <a key={m.id} href={`#${m.id}`} className={`m-sheet-item ${active === m.id ? 'on' : ''}`} onClick={go(m.id)}>
              <i className={m.icon} aria-hidden="true"></i>
              <b>{m.label}</b>
              <small>{m.hint}</small>
            </a>
          ))}
        </div>
        <button type="button" className="m-sheet-cv" onClick={() => { setSheet(false); onViewCv() }}>
          <i className="fa-regular fa-file-lines" aria-hidden="true"></i> View CV
        </button>
      </div>

      <nav className="m-nav" aria-label="Sections">
        {primary.map((p) => (
          <a
            key={p.id}
            href={`#${p.id}`}
            className={`m-nav-item ${active === p.id && !sheet ? 'on' : ''}`}
            aria-current={active === p.id ? 'true' : undefined}
            onClick={go(p.id)}
          >
            <i className={p.icon} aria-hidden="true"></i>
            <span>{p.label}</span>
          </a>
        ))}
        <button
          ref={moreBtn}
          type="button"
          className={`m-nav-item ${moreActive || sheet ? 'on' : ''}`}
          aria-expanded={sheet}
          aria-haspopup="dialog"
          onClick={() => setSheet((s) => !s)}
        >
          <i className={`fa-solid ${sheet ? 'fa-xmark' : 'fa-grip'}`} aria-hidden="true"></i>
          <span>{sheet ? 'Close' : 'More'}</span>
        </button>
      </nav>
    </>
  )
}
