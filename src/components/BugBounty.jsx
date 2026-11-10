import Reveal from './Reveal.jsx'
import HeroWave from './HeroWave.jsx'
import { useSwipe, SwipeDots, useExpand, ExpandToggle } from '../mobile.jsx'

// Set this to your public bug-bounty profile (e.g. your BugReader / HackerOne page)
// and the "More Findings" cue will link to it. Left empty, the cue scrolls on to the Ops Log.
const MORE_FINDINGS_URL = ''

const summary = [
  { icon: 'fa-solid fa-shield-halved', num: '7+', lbl: 'Findings' },
  { icon: 'fa-solid fa-crosshairs', num: '3', lbl: 'Public Reports' },
  { icon: 'fa-solid fa-shield-heart', num: '100%', lbl: 'Responsibly Reported' },
]

const findings = [
  {
    icon: 'fa-solid fa-code',
    boxed: true,
    mark: 'fa-solid fa-code',
    target: 'Twilio Blog',
    cwe: 'CWE-346',
    name: 'Cross-Origin Vulnerability',
    desc: 'Identified missing origin validation in postMessage handlers, enabling potential cross-origin analytics event injection.',
    tags: ['Cross-Origin', 'postMessage', 'Web Security'],
    link: 'https://bugreader.com/mak_1@missing-origin-validation-310',
  },
  {
    icon: 'fa-solid fa-database',
    lock: true,
    mark: 'fa-solid fa-database',
    target: 'Kiwi.com',
    cwe: 'CWE-639',
    name: 'BOLA in Prebooking System',
    desc: 'Discovered a Broken Object-Level Authorization (BOLA) vulnerability in the prebooking system, allowing potential cross-account access to user data.',
    tags: ['BOLA', 'Access Control', 'API Security'],
    link: 'https://bugreader.com/mak_1@idor-in-kiwis-main-website-309',
  },
  {
    icon: 'fa-regular fa-comment-dots',
    mark: 'fa-regular fa-comment-dots',
    target: 'Kiwi.com',
    cwe: 'CWE-639',
    name: 'IDOR in Support Chat',
    desc: 'Detected an Insecure Direct Object Reference (IDOR) bug in the support chat, exposing live conversation streams to unauthorized users.',
    tags: ['IDOR', 'Session Security', 'Web App Security'],
    link: 'https://bugreader.com/mak_1@idor-in-kiwis-support-chat-311',
  },
]

export default function BugBounty() {
  const ext = Boolean(MORE_FINDINGS_URL)
  const swipe = useSwipe()
  const { isOpen, toggle } = useExpand()

  return (
    <section id="bugbounty" className="fnd">
      <img src="/hero/globe.jpg" alt="" className="fnd-globe" aria-hidden="true" />
      <HeroWave mesh className="fnd-wave" />

      <div className="fnd-wrap">
        <div className="fnd-top">
          <Reveal direction="up" className="fnd-head">
            <div className="fnd-rule">
              <span className="fnd-idx">01</span>
              <span className="fnd-kicker">Offensive Research</span>
              <span className="fnd-line"></span>
            </div>
            <h2 className="fnd-title">FINDINGS<span className="t-slash" aria-hidden="true">//</span></h2>
            <p className="fnd-sub">
              Real-world vulnerabilities identified and responsibly reported
              through independent security research on live production targets.
            </p>
          </Reveal>

          <Reveal direction="right" className="fnd-summary">
            {summary.map((s) => (
              <div className="fs-item" key={s.lbl}>
                <i className={s.icon}></i>
                <div>
                  <div className="fs-num">{s.num}</div>
                  <div className="fs-lbl">{s.lbl}</div>
                </div>
              </div>
            ))}
          </Reveal>
        </div>

        <div className="fnd-grid m-swipe" ref={swipe.ref} aria-roledescription="carousel" aria-label="Findings">
          {findings.map((f, i) => (
            <Reveal direction="up" className={`fcard m-card ${isOpen(i) ? 'is-open' : ''}`} key={f.name} style={{ '--rd': `${i * 120}ms` }} aria-roledescription="slide" aria-label={`Finding ${i + 1} of ${findings.length}`}>
              <div className="fcard-in">
                <div className="fcard-bar">
                  <span>FINDING #{String(i + 1).padStart(2, '0')}</span>
                  <span className="fcard-cwe">{f.cwe}</span>
                </div>

                <div className="fcard-body">
                  <i className={`${f.mark} fcard-mark`} aria-hidden="true"></i>
                  <div className={`fcard-icon ${f.boxed ? 'boxed' : ''}`}>
                    <i className={f.icon}></i>
                    {f.lock && <i className="fa-solid fa-lock fcard-lock"></i>}
                  </div>
                  <div className="fcard-target"><b>TARGET ::</b> {f.target}</div>
                  <h3 className="fcard-name">{f.name}</h3>
                  <p className="fcard-desc m-clamp">{f.desc}</p>
                  <div className="fcard-tags m-more" id={`fnd-more-${i}`}>
                    {f.tags.map((t) => <span key={t}>{t}</span>)}
                  </div>
                  <ExpandToggle open={isOpen(i)} onClick={() => toggle(i)} controls={`fnd-more-${i}`} />
                </div>

                <div className="fcard-foot">
                  <span className="fcard-status"><i></i> Reported</span>
                  <span className="fcard-div"></span>
                  <a href={f.link} target="_blank" rel="noopener noreferrer" className="fcard-link">
                    View Report <i className="fa-solid fa-arrow-up-right-from-square"></i>
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <SwipeDots swipe={swipe} label="Finding" />

        <a
          className="fnd-more"
          href={ext ? MORE_FINDINGS_URL : '#experience'}
          target={ext ? '_blank' : undefined}
          rel={ext ? 'noopener noreferrer' : undefined}
        >
          <span className="fm-line"></span>
          <span className="fm-txt">
            {ext ? 'More Findings' : 'Next: Ops Log'}
            <i className="fa-solid fa-chevron-down"></i>
          </span>
          <span className="fm-line"></span>
        </a>
      </div>
    </section>
  )
}
