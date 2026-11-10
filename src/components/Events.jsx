import { useCallback, useEffect, useRef, useState } from 'react'
import Reveal from './Reveal.jsx'
import HeroWave from './HeroWave.jsx'
import { useSwipe, SwipeDots } from '../mobile.jsx'

// Captions are deliberately factual and date-free; edit them to name the exact event.
const shots = [
  { src: '/events/hacking-day-badge.webp', w: 1400, h: 933, tag: 'Badge', title: 'Semicolon Hacking Day', sub: 'Event badge · Beirut, Lebanon' },
  { src: '/events/certificate.webp', w: 542, h: 602, tag: 'Award', title: 'Certificate on stage', sub: 'Semicolon event' },
  { src: '/events/event-day.webp', w: 298, h: 332, tag: 'Community', title: 'Event day', sub: 'Semicolon community' },
]

function Lightbox({ index, onClose, onGo }) {
  const shot = shots[index]
  const closeRef = useRef(null)
  const start = useRef(null)

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onGo(1)
      if (e.key === 'ArrowLeft') onGo(-1)
    }
    document.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prev }
  }, [onClose, onGo])

  // swipe left/right to browse, swipe down to close
  const onPointerDown = (e) => { start.current = { x: e.clientX, y: e.clientY } }
  const onPointerUp = (e) => {
    if (!start.current) return
    const dx = e.clientX - start.current.x
    const dy = e.clientY - start.current.y
    start.current = null
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) onGo(dx < 0 ? 1 : -1)
    else if (dy > 90) onClose()
  }

  return (
    <div className="lbx" role="dialog" aria-modal="true" aria-label={`${shot.title} — photo ${index + 1} of ${shots.length}`}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="lbx-top">
        <span className="lbx-count">{String(index + 1).padStart(2, '0')} / {String(shots.length).padStart(2, '0')}</span>
        <button ref={closeRef} type="button" className="lbx-close" onClick={onClose} aria-label="Close gallery">
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
      <figure className="lbx-stage" onPointerDown={onPointerDown} onPointerUp={onPointerUp} onPointerCancel={() => { start.current = null }}>
        <img key={shot.src} src={shot.src} alt={`${shot.title} — ${shot.sub}`} draggable="false" />
        <figcaption>
          <span className="ev-tag">{shot.tag}</span>
          <b>{shot.title}</b>
          <small>{shot.sub}</small>
        </figcaption>
      </figure>
      <button type="button" className="lbx-nav prev" onClick={() => onGo(-1)} aria-label="Previous photo"><i className="fa-solid fa-chevron-left"></i></button>
      <button type="button" className="lbx-nav next" onClick={() => onGo(1)} aria-label="Next photo"><i className="fa-solid fa-chevron-right"></i></button>
      <p className="lbx-hint" aria-hidden="true">Swipe to browse · swipe down to close</p>
    </div>
  )
}

export default function Events() {
  const [open, setOpen] = useState(null)
  const swipe = useSwipe()
  const lastTrigger = useRef(null)

  // stable callbacks: the lightbox effect depends on them
  const close = useCallback(() => {
    setOpen(null)
    lastTrigger.current?.focus()
  }, [])
  const goBy = useCallback((d) => setOpen((i) => (i + d + shots.length) % shots.length), [])

  return (
    <section id="events" className="evt">
      <HeroWave mesh className="fnd-wave" />

      <div className="fnd-wrap">
        <Reveal direction="up" className="evt-head">
          <div className="fnd-rule">
            <span className="fnd-idx">06</span>
            <span className="fnd-kicker">Field Ops</span>
            <span className="fnd-line"></span>
          </div>
          <h2 className="fnd-title">EVENTS<span className="t-slash" aria-hidden="true">//</span></h2>
          <p className="fnd-sub">On the ground with the security community: hacking days, awards and the people behind them.</p>
        </Reveal>

        <div className="evt-grid m-swipe" ref={swipe.ref} aria-roledescription="carousel" aria-label="Event photos">
          {shots.map((s, i) => (
            <Reveal direction="up" className="evt-card" key={s.src} style={{ '--rd': `${i * 110}ms` }}>
              <button
                type="button"
                className="evt-btn"
                onClick={(e) => { lastTrigger.current = e.currentTarget; setOpen(i) }}
                aria-label={`Open photo: ${s.title}`}
              >
                <img src={s.src} alt={`${s.title} — ${s.sub}`} width={s.w} height={s.h} loading="lazy" />
                <span className="evt-zoom" aria-hidden="true"><i className="fa-solid fa-expand"></i></span>
                <span className="evt-cap">
                  <span className="ev-tag">{s.tag}</span>
                  <b>{s.title}</b>
                  <small>{s.sub}</small>
                </span>
              </button>
            </Reveal>
          ))}
        </div>
        <SwipeDots swipe={swipe} label="Photo" />
      </div>

      {open !== null && <Lightbox index={open} onClose={close} onGo={goBy} />}
    </section>
  )
}
