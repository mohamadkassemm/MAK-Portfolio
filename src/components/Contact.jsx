import Reveal from './Reveal.jsx'
import HeroWave from './HeroWave.jsx'

const channels = [
  { label: 'Email', value: 'mohammaddkassemm@gmail.com', href: 'mailto:mohammaddkassemm@gmail.com', icon: 'fas fa-envelope' },
  { label: 'WhatsApp', value: '+961 81 713 197', href: 'https://wa.me/96181713197', icon: 'fab fa-whatsapp' },
  { label: 'LinkedIn', value: 'in/mohammadd-kassemm', href: 'https://www.linkedin.com/in/mohammadd-kassemm/', icon: 'fab fa-linkedin-in' },
  { label: 'GitHub', value: 'mohamadkassemm', href: 'https://github.com/mohamadkassemm', icon: 'fab fa-github' },
]

export default function Contact() {
  return (
    <section id="contact" className="con">
      <HeroWave className="dep-wave" />

      <div className="fnd-wrap">
        <Reveal direction="up" className="con-head">
          <div className="fnd-rule">
            <span className="fnd-idx">07</span>
            <span className="fnd-kicker">Contact</span>
            <span className="fnd-line con-line"></span>
            <span className="con-hatch" aria-hidden="true"></span>
          </div>
          <h2 className="fnd-title">CONNECT<span className="t-slash" aria-hidden="true">//</span></h2>
          <p className="fnd-sub con-sub">
            Open to freelance security engagements, full-stack builds and
            full-time opportunities in Beirut or remote.
          </p>
        </Reveal>

        <div className="con-grid">
          <Reveal direction="left" className="cterm">
            <div className="cterm-in">
              <div className="cterm-bar">
                <span className="hterm-dots"><i></i><i></i><i></i></span>
                <span className="cterm-title">./establish_connection.sh</span>
                <span className="cterm-secure">SECURE <i className="fa-solid fa-lock"></i></span>
              </div>

              <div className="cterm-body">
                <div className="cterm-prompt"><b>[*]</b> Select a channel to open a session:</div>

                {channels.map((c, i) => {
                  const ext = c.href.startsWith('http')
                  return (
                    <a
                      className="cchan"
                      href={c.href}
                      key={c.label}
                      target={ext ? '_blank' : undefined}
                      rel={ext ? 'noopener noreferrer' : undefined}
                    >
                      <span className="cchan-idx">[{i + 1}]</span>
                      <span className="cchan-icon"><i className={c.icon}></i></span>
                      <span className="cchan-txt">
                        <span className="cchan-label">{c.label}</span>
                        <span className="cchan-value">{c.value.includes('@') ? <>{c.value.split('@')[0]}<wbr />@{c.value.split('@')[1]}</> : c.value}</span>
                      </span>
                      <span className="cchan-go"><i className="fa-solid fa-arrow-right"></i></span>
                    </a>
                  )
                })}

                <div className="cterm-ok"><b>[ ✓ ]</b> Typical response time: within 24h <span></span></div>
              </div>
            </div>
          </Reveal>

          <Reveal direction="right" className="con-right">
            <div className="con-globe" aria-hidden="true">
              <img src="/hero/radar-globe.jpg" alt="" />
              <span className="con-sweep"></span>
            </div>
            <div className="con-target"><b>TARGET:</b> COLLABORATION</div>
            <p className="con-cta">Let&apos;s <mark>secure</mark> what you&apos;re building.</p>
            <a href="mailto:mohammaddkassemm@gmail.com" className="con-brief">
              <i className="fa-solid fa-paper-plane"></i> Send a Brief
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
