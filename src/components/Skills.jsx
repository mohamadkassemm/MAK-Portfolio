import Reveal from './Reveal.jsx'
import HeroWave from './HeroWave.jsx'
import { useTabs, TabBar } from '../mobile.jsx'

const arsTabs = [
  { id: 'A', label: 'Offense', icon: 'fa-solid fa-crosshairs' },
  { id: 'B', label: 'Dev', icon: 'fa-solid fa-code' },
  { id: 'C', label: 'Growth', icon: 'fa-solid fa-chart-column' },
  { id: 'tools', label: 'Tools', icon: 'fa-solid fa-gear' },
]

const groups = [
  {
    code: 'A',
    name: 'Offensive Security',
    icon: 'fa-solid fa-crosshairs',
    items: [
      'Penetration Testing', 'Vulnerability Assessment', 'Web Application Security', 'API Security Testing',
      'Ethical Hacking', 'Secure Coding', 'OWASP Top 10', 'Authentication & Access Control Testing',
      'Bug Bounty Hunting', 'Reconnaissance', 'Information Gathering', 'Security Reporting',
      'Responsible Disclosure', 'IDOR Testing', 'Cross-Site Scripting (XSS)', 'Cross-Site Request Forgery (CSRF)', 'SQL Injection',
    ],
  },
  {
    code: 'B',
    name: 'Development',
    icon: 'fa-solid fa-code',
    items: ['Full-Stack Web Development', 'MERN Stack Development', 'Database Integration', 'IT Systems Management'],
  },
  {
    code: 'C',
    name: 'Search & Growth',
    icon: 'fa-solid fa-chart-column',
    items: ['Search Engine Optimization (SEO)', 'Technical SEO', 'On-Page SEO', 'Local SEO', 'Schema Markup'],
  },
]

// img = cropped logo in /public/hero, dev = devicon class, txt = styled text mark
const toolkit = [
  { cat: 'Offense', tools: [
    { img: '/hero/kali.png', name: 'Kali Linux' },
    { img: '/hero/burp.png', name: 'Burp Suite' },
    { img: '/hero/nmap.png', name: 'Nmap' },
    { img: '/hero/ffuf.png', name: 'FFUF' },
    { img: '/hero/httpx.png', name: 'HTTPX' },
    { img: '/hero/subfinder.png', name: 'Subfinder' },
    { img: '/hero/wireshark.png', name: 'Wireshark' },
  ] },
  { cat: 'Build', tools: [
    { dev: 'devicon-git-plain colored', name: 'Git' },
    { img: '/hero/jwt.png', name: 'JWT' },
    { dev: 'devicon-nodejs-plain colored', name: 'Node.js' },
    { dev: 'devicon-react-original colored', name: 'React' },
    { dev: 'devicon-mongodb-plain colored', name: 'MongoDB' },
    { dev: 'devicon-express-original', name: 'Express' },
    { txt: '{...}', name: 'REST APIs' },
  ] },
  { cat: 'Analytics', tools: [
    { img: '/hero/ga4.png', name: 'Google Analytics 4' },
  ] },
]

export default function Skills() {
  const { tab, setTab, panelClass } = useTabs('A')
  return (
    <section id="skills" className="ars">
      <img src="/hero/shield.jpg" alt="" className="ars-art" aria-hidden="true" />
      <HeroWave mesh className="fnd-wave" />

      <div className="fnd-wrap">
        <Reveal direction="up" className="ars-head">
          <div className="fnd-rule">
            <span className="fnd-idx">04</span>
            <span className="fnd-kicker">Capabilities</span>
            <span className="fnd-line"></span>
          </div>
          <h2 className="fnd-title">ARSENAL<span className="t-slash" aria-hidden="true">//</span></h2>
          <p className="fnd-sub">The techniques I practise and the tools I bring to an engagement.</p>
        </Reveal>

        <TabBar tabs={arsTabs} tab={tab} setTab={setTab} idPrefix="ars" label="Arsenal categories" />

        <div className="ars-grid">
          <div className="ars-groups">
            {groups.map((g, i) => (
              <Reveal direction="left" className={`agroup ${panelClass(g.code)}`} key={g.name} style={{ '--rd': `${i * 100}ms` }} id={`ars-panel-${g.code}`} role="tabpanel" aria-labelledby={`ars-tab-${g.code}`}>
                <div className="agroup-in">
                  <div className="ag-head">
                    <span className="ag-code">{g.code}</span>
                    <span className="ag-name">{g.name}</span>
                    <span className="ag-count">{String(g.items.length).padStart(2, '0')}</span>
                  </div>
                  <div className="ag-body">
                    <div className="ag-icon" aria-hidden="true"><i className={g.icon}></i></div>
                    <div className="ag-chips">
                      {g.items.map((s) => <span key={s}>{s}</span>)}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal direction="right" className={`tk-panel ${panelClass('tools')}`} id="ars-panel-tools" role="tabpanel" aria-labelledby="ars-tab-tools">
            <div className="tk-tab"><i className="fa-solid fa-gear"></i> Tools Arsenal</div>
            {toolkit.map((c) => (
              <div className="tk-sec" key={c.cat}>
                <div className="tk-cat"><span>//</span> {c.cat}</div>
                <div className="tk-tiles">
                  {c.tools.map((t) => (
                    <div className="tk-tile" key={t.name}>
                      <span className="tk-ico">
                        {t.img && <img src={t.img} alt="" />}
                        {t.dev && <i className={t.dev}></i>}
                        {t.txt && <b>{t.txt}</b>}
                      </span>
                      <span className="tk-name">{t.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
