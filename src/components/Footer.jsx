const socials = [
  { href: 'mailto:mohammaddkassemm@gmail.com', icon: 'fas fa-envelope', label: 'Email' },
  { href: 'https://www.linkedin.com/in/mohammadd-kassemm/', icon: 'fab fa-linkedin-in', label: 'LinkedIn' },
  { href: 'https://github.com/mohamadkassemm', icon: 'fab fa-github', label: 'GitHub' },
  { href: 'https://wa.me/96181713197', icon: 'fab fa-whatsapp', label: 'WhatsApp' },
]

const ext = (href) => (href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="fnd-wrap ft-wrap">
        <div className="ft-grid">
          <div className="ft-brand">
            <div className="ft-brand-in">
              <div className="ft-logo">
                <span className="ft-prompt" aria-hidden="true">&gt;_</span>
                <span className="ft-mak">MAK</span>
                <span className="ft-tag"><b>//</b> Red Team</span>
              </div>
              <p>Information Security Associate &amp; Penetration Tester passionate about identifying security weaknesses and building stronger, more resilient applications.</p>
              <div className="ft-socials">
                {socials.map((s) => (
                  <a key={s.label} href={s.href} aria-label={s.label} {...ext(s.href)}><i className={s.icon}></i></a>
                ))}
              </div>
            </div>
          </div>

          <div className="ft-col ft-contact">
            <h4><i className="fa-solid fa-paper-plane"></i> Contact</h4>
            <div className="ft-cbox">
              <a href="mailto:mohammaddkassemm@gmail.com"><i className="fas fa-envelope"></i> mohammaddkassemm@gmail.com</a>
              <a href="https://wa.me/96181713197" target="_blank" rel="noopener noreferrer"><i className="fab fa-whatsapp"></i> +961 81 713 197</a>
              <span><i className="fa-solid fa-location-dot"></i> Beirut, Lebanon</span>
            </div>
          </div>
        </div>

        <div className="ft-eof">
          <span className="ft-eof-txt" aria-hidden="true"><i></i> session_closed <b>//</b> EOF</span>
          <a href="#home" className="ft-top"><i className="fa-solid fa-arrow-up" aria-hidden="true"></i> Top</a>
        </div>

        <div className="ft-bottom">
          <span>© 2026 <b>Mohammad Kassem.</b> All rights reserved.</span>
          <span className="ft-motto"><b>//</b> Test with purpose. Secure with confidence.</span>
        </div>
      </div>
    </footer>
  )
}
