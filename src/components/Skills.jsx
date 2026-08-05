import Reveal from './Reveal.jsx'

const conceptual = [
  'Penetration Testing', 'Web Application Security', 'API Security Testing', 'Vulnerability Assessment',
  'Bug Bounty Hunting', 'Ethical Hacking', 'OWASP Top 10', 'Authentication & Authorization Testing',
  'Reconnaissance', 'Information Gathering', 'Security Reporting', 'Responsible Disclosure',
  'IDOR Testing', 'Cross-Site Scripting (XSS)', 'Cross-Site Request Forgery (CSRF)', 'SQL Injection',
  'MERN Stack', 'Node.js', 'REST APIs',
]

const toolkit = [
  { icon: 'fa-solid fa-terminal', name: 'Kali Linux' },
  { icon: 'fa-solid fa-bug', name: 'Burp Suite' },
  { icon: 'fa-solid fa-network-wired', name: 'Nmap' },
  { icon: 'fa-solid fa-magnifying-glass', name: 'FFUF' },
  { icon: 'fa-solid fa-globe', name: 'HTTPX' },
  { icon: 'fa-solid fa-sitemap', name: 'Subfinder' },
  { icon: 'fa-solid fa-shield-halved', name: 'OWASP Top 10' },
  { icon: 'fa-solid fa-code-branch', name: 'Git' },
  { icon: 'fa-solid fa-file-shield', name: 'JWT' },
  { icon: 'fa-solid fa-network-wired', name: 'Wireshark' },
  { icon: 'devicon-nodejs-plain', name: 'Node.js' },
  { icon: 'fa-solid fa-plug', name: 'REST APIs' },
]

export default function Skills() {
  return (
    <section id="skills">
      <div className="wrap">
        <Reveal direction="up" className="skills-header">
          <h2 className="skills-title">Skills</h2>
          <div className="skills-title-line"></div>
        </Reveal>

        <div className="skills-columns">
          <Reveal direction="left">
            <div className="skills-label">— 01. Conceptual</div>
            <div className="tag-flow">
              {conceptual.map((s) => <div className="skill-tag" key={s}>{s}</div>)}
            </div>
          </Reveal>

          <Reveal direction="right">
            <div className="skills-label">— 02. Technical Toolkit</div>
            <div className="toolkit-grid">
              {toolkit.map((t) => (
                <div className="tool-card" key={t.name}>
                  <i className={`${t.icon} tool-icon`}></i>
                  <span className="tool-name">{t.name}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
