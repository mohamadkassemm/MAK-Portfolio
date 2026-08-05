import Reveal from './Reveal.jsx'

const degrees = [
  { degree: "Master's Degree (M2) in Cyber Security", date: 'Present', inst: 'Lebanese University (LU) — Faculty of Sciences', loc: 'Beirut, Lebanon', dir: 'up' },
  { degree: "Master's Degree (M1) in Computer Science", date: 'June 2025', inst: 'Lebanese University (LU) — Faculty of Sciences', loc: 'Nabatieh, Lebanon', dir: 'left' },
  { degree: 'Bachelor of Science (BS) in Computer Science', date: 'June 2024', inst: 'Lebanese University (LU) — Faculty of Sciences', loc: 'Nabatieh, Lebanon', dir: 'right' },
]

const certs = [
  { title: 'Information Security Associate', text: 'Information Security Associate — Semicolon Academy (May 2026)', src: '/MAK Certificates/Information Security Associate.pdf' },
  { title: 'Ethical Hacking Foundation', text: 'Ethical Hacking Foundation — Semicolon Academy (May 2025)', src: '/MAK Certificates/Ethical Hacking.pdf' },
  { title: 'Mystery Course Program', text: 'Mystery Course Program — Techlarious (February 2025)', src: '/MAK Certificates/MERN Stack.pdf' },
  { title: 'Capture The Flag', text: 'Capture The Flag - Semicolon (June 2025)', src: '/MAK Certificates/CTF.pdf' },
  { title: 'Project Management', text: 'Project Management - Injaz (February 2024)', src: '/MAK Certificates/Project Management.pdf' },
  { title: 'Foundation Of Computer Science', text: 'Foundation Of Computer Science (August 2022)', src: '/MAK Certificates/FCS.pdf' },
]

const languages = [
  { name: 'Arabic', width: '98%', level: 'Native' },
  { name: 'English', width: '80%', level: 'Advanced' },
]

export default function Education({ onViewCert }) {
  return (
    <section id="education">
      <div className="wrap">
        <Reveal direction="up">
          <div className="eyebrow">Background</div>
          <h2 className="sec-title" style={{ marginBottom: 8 }}>Education</h2>
          <p className="sec-sub">Formal training, certifications, and language proficiency.</p>
        </Reveal>

        <div className="edu-grid">
          {degrees.map((d) => (
            <Reveal direction={d.dir} className="edu-card" key={d.degree}>
              <div className="edu-head">
                <div className="edu-degree">{d.degree}</div>
                <div className="edu-date">{d.date}</div>
              </div>
              <div className="edu-inst">{d.inst}</div>
              <div className="edu-loc">{d.loc}</div>
            </Reveal>
          ))}
        </div>

        <Reveal as="h3" direction="up" className="edu-subhead">Training &amp; Certificates</Reveal>
        <Reveal direction="up" className="edu-card">
          <div className="cert-list">
            {certs.map((c) => (
              <div className="cert-item" key={c.title}>
                <div className="cert-text"><span className="dot">✦</span> {c.text}</div>
                <button
                  type="button"
                  className="cert-view-btn"
                  onClick={() => onViewCert({ title: c.title, src: c.src })}
                >
                  View Certificate ↗
                </button>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal as="h3" direction="up" className="edu-subhead">Languages</Reveal>
        <Reveal direction="up" className="lang-wrap">
          <div className="lang-badges">
            {languages.map((l) => (
              <div className="lang-badge" key={l.name}>
                <div className="lname">{l.name}</div>
                <div className="lbar"><i style={{ width: l.width }}></i></div>
                <div className="llevel">{l.level}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
