import Reveal from './Reveal.jsx'

export default function Contact() {
  const contacts = [
    {
      label: 'Email',
      value: 'mohammaddkassemm@gmail.com',
      href: 'mailto:mohammaddkassemm@gmail.com',
      icon: 'fas fa-envelope',
    },
    {
      label: 'WhatsApp',
      value: '+961 81 713 197',
      href: 'https://wa.me/96181713197',
      icon: 'fab fa-whatsapp',
    },
    {
      label: 'LinkedIn',
      value: 'Connect with me',
      href: 'https://www.linkedin.com/in/mohammadd-kassemm/',
      icon: 'fab fa-linkedin-in',
    },
  ]

  return (
    <section id="contact">
      <div className="wrap">
        <Reveal direction="up" style={{ textAlign: 'center' }}>
          <div
            className="eyebrow"
            style={{ justifyContent: 'center' }}
          >
            Contact
          </div>

          <h2 className="sec-title">Let's Connect</h2>

          <p
            className="sec-sub"
            style={{ margin: '0 auto' }}
          >
            Open to freelance security engagements, full-stack builds, and
            full-time opportunities in Beirut or remote.
          </p>
        </Reveal>

        <div className="contact-layout">
          {/* CONNECTIONS — LEFT */}
          <Reveal direction="left" className="contact-connections">
            <div className="contact-column-title">Connections</div>

            {contacts.map((contact) => {
              const isExternal = contact.href.startsWith('http')

              return (
                <a
                  className="connection-card"
                  href={contact.href}
                  key={contact.label}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                >
                  <div className="connection-icon">
                    <i className={contact.icon}></i>
                  </div>

                  <div className="connection-content">
                    <span className="connection-label">
                      {contact.label}
                    </span>

                    <span className="connection-value">
                      {contact.value}
                    </span>
                  </div>

                  <i className="fas fa-arrow-up-right-from-square connection-arrow"></i>
                </a>
              )
            })}
          </Reveal>

          {/* ANIMATED MK CIRCLE — RIGHT */}
          <Reveal direction="right" className="contact-circle-column">
            <div className="contact-ripple-wrap">
              <div className="contact-orbit contact-orbit-one"></div>
              <div className="contact-orbit contact-orbit-two"></div>

              <div className="contact-ripple contact-ripple-one"></div>
              <div className="contact-ripple contact-ripple-two"></div>
              <div className="contact-ripple contact-ripple-three"></div>

              <div className="contact-avatar">
                <span>MK</span>
              </div>

              <span className="orbit-dot orbit-dot-one"></span>
              <span className="orbit-dot orbit-dot-two"></span>
              <span className="orbit-dot orbit-dot-three"></span>
              <span className="orbit-dot orbit-dot-four"></span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}