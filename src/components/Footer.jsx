import Reveal from './Reveal.jsx'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <Reveal direction="up" className="footer-brand">
          <div className="footer-name">Mohammad Kassem</div>
          <p>Information Security Associate &amp; Penetration Tester passionate about identifying security weaknesses and building stronger, more resilient applications.</p>
          <div className="footer-socials">
            <a href="mailto:mohammaddkassemm@gmail.com" aria-label="Email"><i className="fas fa-envelope"></i></a>
            <a href="https://www.linkedin.com/in/mohammadd-kassemm/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
            <a href="https://github.com/mohamadkassemm" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><i className="fab fa-github"></i></a>
            <a href="https://wa.me/96181713197" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><i className="fab fa-whatsapp"></i></a>
          </div>
        </Reveal>
        <Reveal direction="up" className="footer-col">
          <h4>Quick Links</h4>
          <a href="#home">Home</a>
          <a href="#bugbounty">Bug Bounty</a>
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#education">Education</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
        </Reveal>
        <Reveal direction="up" className="footer-col">
          <h4>Focus Areas</h4>
          <span>Penetration Testing</span>
          <span>Web Application Security</span>
          <span>API Security Testing</span>
          <span>Vulnerability Assessment</span>
          <span>Bug Bounty Hunting</span>
        </Reveal>
        <Reveal direction="up" className="footer-col">
          <h4>Contact Info</h4>
          <a href="mailto:mohammaddkassemm@gmail.com">mohammaddkassemm@gmail.com</a>
          <span>Beirut, Lebanon</span>
          <a href="https://wa.me/96181713197">+961 81 713 197</a>
        </Reveal>
      </div>
      <div className="wrap footer-bottom">
        <span>© 2026 <b>Mohammad Kassem</b>. All rights reserved.</span>
        <span>🔐Test with purpose. Secure with confidence.</span>
      </div>
    </footer>
  )
}
