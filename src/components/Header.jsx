export default function Header({ show, navOpen, setNavOpen, onViewCv }) {
  return (
    <header id="siteHeader" className={show ? 'show' : ''}>
      <div className="nav-inner">
        <div className="logo">M<span>A</span>K</div>
        <div className="nav-toggle" onClick={() => setNavOpen(!navOpen)}>
          <span></span><span></span><span></span>
        </div>
        <ul className={`nav-links ${navOpen ? 'open' : ''}`}>
          <li><a href="#home" onClick={() => setNavOpen(false)}>Home</a></li>
          <li><a href="#bugbounty" onClick={() => setNavOpen(false)}>Bug Bounty</a></li>
          <li><a href="#experience" onClick={() => setNavOpen(false)}>Experience</a></li>
          <li><a href="#projects" onClick={() => setNavOpen(false)}>Projects</a></li>
          <li><a href="#education" onClick={() => setNavOpen(false)}>Education</a></li>
          <li><a href="#skills" onClick={() => setNavOpen(false)}>Skills</a></li>
          <li><a href="#contact" onClick={() => setNavOpen(false)}>Contact</a></li>
          <li>
            <button className="nav-cv-btn" type="button" onClick={onViewCv}>
              <i className="fa-solid fa-file-lines"></i> View CV
            </button>
          </li>
        </ul>
      </div>
    </header>
  )
}
