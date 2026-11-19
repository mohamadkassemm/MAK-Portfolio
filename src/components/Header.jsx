import { useEffect, useRef, useState } from 'react'

const links = [
  { id: 'home', label: 'Home' },
  { id: 'bugbounty', label: 'Findings' },
  { id: 'experience', label: 'Ops Log' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Arsenal' },
  { id: 'education', label: 'Clearance' },
  { id: 'contact', label: 'Contact' },
]

export default function Header({ show, navOpen, setNavOpen, onViewCv }) {
  const [active, setActive] = useState('home')
  const [scrolled, setScrolled] = useState(false)
  const barRef = useRef(null)

  // Scroll work is batched to one update per frame. The progress bar is written
  // straight to the DOM (a compositor-only transform), so scrolling never
  // re-renders React; state only changes when "scrolled" actually flips.
  useEffect(() => {
    let raf = 0
    let wasScrolled = null
    const update = () => {
      raf = 0
      const h = document.documentElement
      const max = h.scrollHeight - h.clientHeight
      const p = max > 0 ? h.scrollTop / max : 0
      if (barRef.current) barRef.current.style.transform = `scaleX(${p.toFixed(4)})`
      const s = h.scrollTop > 30
      if (s !== wasScrolled) { wasScrolled = s; setScrolled(s) }
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    )
    links.forEach((l) => {
      const el = document.getElementById(l.id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  return (
    <header id="siteHeader" className={`${show ? 'show' : ''} ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner">
        <a href="#home" className="logo" aria-label="Home">
          <span className="logo-mark logo-mark-i">MAK</span>
          <span className="logo-sep" aria-hidden="true"></span>
          <span className="logo-sub logo-sub-nav">Red Team Portfolio</span>
        </a>

        <button className="m-cv" type="button" onClick={onViewCv} aria-label="View CV">
          <i className="fa-regular fa-file-lines" aria-hidden="true"></i> CV
        </button>

        <button
          className={`nav-toggle ${navOpen ? 'open' : ''}`}
          type="button"
          aria-label="Toggle menu"
          aria-expanded={navOpen}
          onClick={() => setNavOpen(!navOpen)}
        >
          <span></span><span></span><span></span>
        </button>

        <nav className={`nav-links ${navOpen ? 'open' : ''}`}>
          {links.map((l, i) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={active === l.id ? 'active' : ''}
              onClick={() => setNavOpen(false)}
            >
              <span className="nl-idx">0{i + 1}</span>{l.label}
            </a>
          ))}
          <button className="nav-cv" type="button" onClick={onViewCv}>
            <i className="fa-regular fa-file-lines"></i> View CV <span className="nav-cv-arrow">↗</span>
          </button>
        </nav>
      </div>
      <div className="nav-progress"><i ref={barRef}></i></div>
    </header>
  )
}
