import { useEffect, useState } from 'react'
import Loader from './components/Loader.jsx'
import RedRain from './components/RedRain.jsx'
import Header from './components/Header.jsx'
import CvModal from './components/CvModal.jsx'
import CertModal from './components/CertModal.jsx'
import Hero from './components/Hero.jsx'
import BugBounty from './components/BugBounty.jsx'
import Experience from './components/Experience.jsx'
import Projects from './components/Projects.jsx'
import Education from './components/Education.jsx'
import Skills from './components/Skills.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import Events from './components/Events.jsx'
import MobileNav from './components/MobileNav.jsx'
import useFitSections, { useFullPageWheel } from './useFitSections.js'

export default function App() {
  const [booted, setBooted] = useState(false)
  const [navOpen, setNavOpen] = useState(false)
  const [cvOpen, setCvOpen] = useState(false)
  const [activeCert, setActiveCert] = useState(null)

  // One section = one screen on desktop (see useFitSections.js)
  useFitSections()
  useFullPageWheel()

  // Boot sequence length
  useEffect(() => {
    const t = setTimeout(() => setBooted(true), 2400)
    return () => clearTimeout(t)
  }, [])

  // Escape closes any open modal
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Escape') return
      setCvOpen(false)
      setActiveCert(null)
      setNavOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  // Lock scroll while a modal or the loader is up
  useEffect(() => {
    document.body.style.overflow = cvOpen || activeCert || !booted ? 'hidden' : ''
  }, [cvOpen, activeCert, booted])

  return (
    <>
      <div className="fx-scanlines" aria-hidden="true"></div>
      <div className="fx-vignette" aria-hidden="true"></div>
      <div className="fx-grid" aria-hidden="true"></div>
      <RedRain />
      <Loader hidden={booted} />

      <Header
        show={booted}
        navOpen={navOpen}
        setNavOpen={setNavOpen}
        onViewCv={() => { setCvOpen(true); setNavOpen(false) }}
      />

      <CvModal open={cvOpen} onClose={() => setCvOpen(false)} />
      <CertModal cert={activeCert} onClose={() => setActiveCert(null)} />

      <main className="column">
        <Hero booted={booted} onViewCv={() => setCvOpen(true)} />
        <BugBounty />
        <Experience />
        <Projects />
        <Skills />
        <Education onViewCert={setActiveCert} />
        <Events />
        <Contact />
      </main>
      <Footer />
      <MobileNav onViewCv={() => setCvOpen(true)} />
    </>
  )
}
