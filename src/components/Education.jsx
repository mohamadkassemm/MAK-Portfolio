import Reveal from './Reveal.jsx'
import HeroWave from './HeroWave.jsx'
import { useAppMode } from '../mobile.jsx'

const degrees = [
  { lvl: 'M2', degree: "Master's Degree in Cyber Security", date: 'Present', inst: 'Lebanese University – Faculty of Sciences', loc: 'Beirut, Lebanon', live: true },
  { lvl: 'M1', degree: "Master's Degree in Computer Science", date: 'June 2025', inst: 'Lebanese University – Faculty of Sciences', loc: 'Nabatieh, Lebanon' },
  { lvl: 'BS', degree: 'Bachelor of Science in Computer Science', date: 'June 2024', inst: 'Lebanese University – Faculty of Sciences', loc: 'Nabatieh, Lebanon' },
]

const certs = [
  { title: 'Offensive Application Security Associate', issuer: 'Semicolon Academy', date: 'Aug 2026', src: '/MAK Certificates/offensiveAppSecurity.pdf' },
  { title: 'Information Security Associate', issuer: 'Semicolon Academy', date: 'May 2026', src: '/MAK Certificates/Information Security Associate.pdf' },
  { title: 'Ethical Hacking Foundation', issuer: 'Semicolon Academy', date: 'May 2025', src: '/MAK Certificates/Ethical Hacking.pdf' },
  { title: 'Capture The Flag', issuer: 'Semicolon', date: 'Jun 2025', src: '/MAK Certificates/CTF.pdf' },
  { title: 'Mystery Course Program', issuer: 'Techlarious', date: 'Feb 2025', src: '/MAK Certificates/MERN Stack.pdf' },
  { title: 'Project Management', issuer: 'Injaz', date: 'Feb 2024', src: '/MAK Certificates/Project Management.pdf' },
  { title: 'Foundation Of Computer Science', issuer: '', date: 'Aug 2022', src: '/MAK Certificates/FCS.pdf' },
]

const SEGMENTS = 12
const languages = [
  { name: 'Arabic', level: 'Native', on: 12 },
  { name: 'English', level: 'Advanced', on: 9 },
]

export default function Education({ onViewCert }) {
  // phones: the certificate list becomes its own vertical scroll area (keyboard-scrollable)
  const app = useAppMode()
  return (
    <section id="education" className="clr">
      <img src="/hero/idcard.jpg" alt="" className="clr-art" aria-hidden="true" />
      <HeroWave className="dep-wave" />

      <div className="fnd-wrap">
        <Reveal direction="up" className="clr-head">
          <div className="fnd-rule">
            <span className="fnd-idx">05</span>
            <span className="fnd-kicker">Background</span>
            <span className="fnd-line"></span>
          </div>
          <h2 className="fnd-title">CLEARANCE<span className="t-slash" aria-hidden="true">//</span></h2>
          <p className="fnd-sub">Formal training, certifications and language proficiency.</p>
        </Reveal>

        <div className="deg-grid">
          {degrees.map((d, i) => (
            <Reveal direction="up" className="deg" key={d.degree} style={{ '--rd': `${i * 100}ms` }}>
              <div className="deg-in">
                <div className="deg-top">
                  <span className="deg-cap"><i className="fa-solid fa-graduation-cap"></i></span>
                  <span className="deg-lvl">{d.lvl}</span>
                  <span className={`deg-date ${d.live ? 'live' : ''}`}>
                    {d.live ? <i className="deg-dot"></i> : <i className="fa-regular fa-calendar"></i>}
                    {d.date}
                  </span>
                </div>
                <div className="deg-body">
                  <h3>{d.degree}</h3>
                  <div className="deg-inst">{d.inst}</div>
                  <div className="deg-loc"><i className="fa-solid fa-location-dot"></i> {d.loc}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="clr-split">
          <Reveal direction="left" className="cpanel cpanel-certs">
            <div className="cp-tab"><i className="fa-solid fa-award"></i> Training &amp; Certificates <span className="cp-slash">//</span></div>
            <ol className="cert-rows" {...(app ? { tabIndex: 0, role: 'list', 'aria-label': 'Certificates (scrollable)' } : {})}>
              {certs.map((c, i) => (
                <li key={c.title}>
                  <button type="button" className="crow" onClick={() => onViewCert({ title: c.title, src: c.src })}>
                    <span className="crow-idx">{String(i + 1).padStart(2, '0')}</span>
                    <span className="crow-main">
                      <span className="crow-title">{c.title}</span>
                      <span className="crow-meta">{c.issuer && <>{c.issuer}<i>•</i></>}{c.date}</span>
                    </span>
                    <span className="crow-view">View <i className="fa-solid fa-arrow-up-right-from-square"></i></span>
                  </button>
                </li>
              ))}
            </ol>
          </Reveal>

          <div className="clr-side">
            <Reveal direction="right" className="cpanel">
              <div className="cp-tab"><i className="fa-solid fa-language"></i> Languages <span className="cp-slash">//</span></div>
              <div className="langs2">
                {languages.map((l) => (
                  <div className="lang2" key={l.name}>
                    <div className="lang2-row"><span>{l.name}</span><b>{l.level}</b></div>
                    <div className="lang2-bar">
                      {Array.from({ length: SEGMENTS }, (_, k) => <i key={k} className={k < l.on ? 'on' : ''}></i>)}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal direction="right" className="cpanel track" style={{ '--rd': '120ms' }}>
              <div className="cp-tab"><i className="fa-solid fa-bullseye"></i> <em>Current Track</em></div>
              <i className="fa-solid fa-shield-halved track-mark" aria-hidden="true"></i>
              <p>M2 Cyber Security at Lebanese University, focused on offensive application security.</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
