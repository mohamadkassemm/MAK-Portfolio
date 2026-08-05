import { useEffect, useState } from 'react'
import Loader from './components/Loader.jsx'
import ParticlesCanvas from './components/ParticlesCanvas.jsx'
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

export default function App() {
  const [loaderHidden, setLoaderHidden] = useState(false)
  const [headerShow, setHeaderShow] = useState(false)
  const [navOpen, setNavOpen] = useState(false)
  const [cvOpen, setCvOpen] = useState(false)
  const [activeCert, setActiveCert] = useState(null)

  // ===== Loader (mirrors original window.load + 2s delay) =====
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaderHidden(true)
      setHeaderShow(true)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  // ===== Header stays visible once scrolled, same as original =====
  useEffect(() => {
    const handleScroll = () => setHeaderShow(true)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // ===== Escape key closes whichever modal is open =====
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key !== 'Escape') return
      if (cvOpen) setCvOpen(false)
      if (activeCert) setActiveCert(null)
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [cvOpen, activeCert])

  // ===== Lock body scroll while any modal is open =====
  useEffect(() => {
    document.body.style.overflow = cvOpen || activeCert ? 'hidden' : ''
  }, [cvOpen, activeCert])

  return (
    <>
      <div className="noise"></div>
      <ParticlesCanvas />
      <Loader hidden={loaderHidden} />

      <Header
        show={headerShow}
        navOpen={navOpen}
        setNavOpen={setNavOpen}
        onViewCv={() => { setCvOpen(true); setNavOpen(false) }}
      />

      <CvModal open={cvOpen} onClose={() => setCvOpen(false)} />
      <CertModal cert={activeCert} onClose={() => setActiveCert(null)} />

      <Hero />
      <BugBounty />
      <Experience />
      <Projects />
      <Education onViewCert={setActiveCert} />
      <Skills />
      <Contact />
      <Footer />
    </>
  )
}
