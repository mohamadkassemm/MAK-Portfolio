import Reveal from './Reveal.jsx'

const findings = [
  {
    emoji: '🧩',
    name: 'Twilio Blog — Cross-Origin Vulnerability',
    desc: 'Identified missing origin validation in postMessage handlers, enabling potential cross-origin analytics event injection.',
    tags: ['Cross-Origin', 'postMessage', 'Web Security'],
    link: 'https://bugreader.com/mak_1@missing-origin-validation-310',
    linkText: 'View Report',
  },
  {
    emoji: '🔓',
    name: 'Kiwi.com — BOLA in Prebooking System',
    desc: 'Discovered a Broken Object-Level Authorization (BOLA) vulnerability in the prebooking system, allowing potential cross-account access to user data.',
    tags: ['BOLA', 'Access Control', 'API Security'],
    link: 'https://bugreader.com/mak_1@idor-in-kiwis-main-website-309',
    linkText: 'View Report',
  },
  {
    emoji: '💬',
    name: 'Kiwi.com — IDOR in Support Chat',
    desc: 'Detected an Insecure Direct Object Reference (IDOR) bug in the support chat, exposing live conversation streams to unauthorized users.',
    tags: ['IDOR', 'Session Security', 'Web App Security'],
    link: 'https://bugreader.com/mak_1@idor-in-kiwis-support-chat-311',
    linkText: 'View Report',
  },
]

export default function BugBounty() {
  return (
    <section id="bugbounty">
      <div className="wrap">
        <Reveal direction="up">
          <div className="eyebrow">Offensive Research</div>
          <h2 className="sec-title">Bug Bounty &amp; Security Research</h2>
          <p className="sec-sub">Real-world vulnerabilities identified and responsibly reported through independent security research on live production targets.</p>
        </Reveal>
        <div className="proj-grid">
          {findings.map((f) => (
            <Reveal direction="up" className="proj-card" key={f.name}>
              <div className="proj-emoji">{f.emoji}</div>
              <div className="proj-name">{f.name}</div>
              <p className="proj-desc">{f.desc}</p>
              <div className="proj-tags">
                {f.tags.map((t) => <span className="tag" key={t}>{t}</span>)}
              </div>
              <a href={f.link} target="_blank" rel="noopener noreferrer" className="proj-link">
                <i className="fa-solid fa-arrow-up-right-from-square"></i> {f.linkText}
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
