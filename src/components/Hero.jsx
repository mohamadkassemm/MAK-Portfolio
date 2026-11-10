import { useEffect, useRef, useState } from 'react'
import HeroWave from './HeroWave.jsx'

const script = [
  { t: 'cmd', v: 'whoami' },
  { t: 'out', v: 'mohammad_kassem  |  red_team_operator' },
  { t: 'cmd', v: 'nmap -sV target' },
]

const stats = [
  { icon: 'fa-solid fa-crosshairs', num: '7+', lbl: 'Penetration Tests' },
  { icon: 'fa-solid fa-shield-halved', num: '3+', lbl: 'Valid Reports' },
  { icon: 'fa-solid fa-cube', num: '5+', lbl: 'Apps Secured' },
]

const killChain = ['Recon', 'Exploit', 'Post-Exploit', 'Report']

const expertise = [
  { icon: 'fa-solid fa-crosshairs', name: 'Penetration Testing' },
  { icon: 'fa-regular fa-window-maximize', name: 'Web Security' },
  { icon: 'fa-solid fa-diagram-project', name: 'Network Security' },
  { icon: 'fa-solid fa-shield-halved', name: 'Vulnerability Assessment' },
  { icon: 'fa-solid fa-user-secret', name: 'Red Team Operations' },
  { icon: 'fa-regular fa-file-lines', name: 'Security Reporting' },
]

const tools = [
  { img: '/hero/kali.png', name: 'Kali' },
  { img: '/hero/metasploit.png', name: 'Metasploit' },
  { img: '/hero/burp.png', name: 'Burp Suite' },
  { img: '/hero/nmap.png', name: 'Nmap' },
  { icon: 'devicon-docker-plain colored', name: 'Docker' },
]

/**
 * One continuous marquee carrying Core Expertise + Tools (phones only; hidden on
 * larger screens, where the original strip is shown). Two identical halves slide by
 * exactly -50%, so the loop is seamless; each half owns its trailing gap so both are
 * the same width. Duration is derived from the measured width => constant speed.
 * Screen readers get the two plain lists instead of the moving copy.
 */
const MQ_SPEED = 55 // px per second
function HeroMarquee() {
  const half = useRef(null)
  const [dur, setDur] = useState(40)
  useEffect(() => {
    const el = half.current
    if (!el) return
    const measure = () => { if (el.offsetWidth) setDur(el.offsetWidth / MQ_SPEED) }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    document.fonts?.ready.then(measure)
    return () => ro.disconnect()
  }, [])

  const chips = (h) => (
    <>
      {expertise.map((e) => <span className="mq-chip" key={`${h}e${e.name}`}><i className={e.icon}></i>{e.name}</span>)}
      <span className="mq-sep" key={`${h}sep`}><b>//</b> Tools</span>
      {tools.map((t) => (
        <span className="mq-chip mq-tool" key={`${h}t${t.name}`}>
          {t.img ? <img src={t.img} alt="" /> : <i className={t.icon}></i>}{t.name}
        </span>
      ))}
      <span className="mq-sep" key={`${h}sep2`}><b>//</b> Expertise</span>
    </>
  )

  return (
    <div className="hero-marquee">
      <div className="mq-head"><span>//</span> Core Expertise <em>&amp;</em> Tools</div>
      <div className="sr-only">
        <h3>Core Expertise</h3>
        <ul>{expertise.map((e) => <li key={e.name}>{e.name}</li>)}</ul>
        <h3>Tools &amp; Environment</h3>
        <ul>{tools.map((t) => <li key={t.name}>{t.name}</li>)}</ul>
      </div>
      <div className="mq-viewport" aria-hidden="true" style={{ '--mq-dur': `${dur.toFixed(2)}s` }}>
        <div className="mq-track">
          <div className="mq-half" ref={half}>{chips('a')}</div>
          <div className="mq-half">{chips('b')}</div>
        </div>
      </div>
    </div>
  )
}

function useTerminal(start) {
  const [lines, setLines] = useState([])
  const [typing, setTyping] = useState('')

  useEffect(() => {
    if (!start) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setLines(script.slice(0, -1)); setTyping(script[script.length - 1].v); return
    }
    let cancelled = false
    const timers = []
    const wait = (ms) => new Promise((r) => timers.push(setTimeout(r, ms)))

    const run = async () => {
      while (!cancelled) {
        setLines([]); setTyping('')
        for (let n = 0; n < script.length; n++) {
          const line = script[n]
          if (cancelled) return
          if (line.t === 'cmd') {
            for (let i = 1; i <= line.v.length; i++) {
              if (cancelled) return
              setTyping(line.v.slice(0, i))
              await wait(55 + Math.random() * 50)
            }
            if (n === script.length - 1) break // leave last command sitting at the cursor
            await wait(300)
            setTyping('')
          } else {
            await wait(380)
          }
          setLines((ls) => [...ls, line])
        }
        await wait(4500)
      }
    }
    run()
    return () => { cancelled = true; timers.forEach(clearTimeout) }
  }, [start])

  return { lines, typing }
}

export default function Hero({ booted, onViewCv }) {
  const { lines, typing } = useTerminal(booted)

  return (
    <section id="home" className={`hero ${booted ? 'go' : ''}`}>
      <HeroWave />

      <div className="hero-wrap">
        <div className="hero-main">
          {/* ---------- left: identity ---------- */}
          <div className="hero-left">
            <div className="hero-badge">Red Team Operator</div>

            <h1 className="hero-name">
              <span className="hn-1">MOHAMMAD</span>
              <span className="hn-2">KASSEM<i className="hn-cursor">_</i></span>
            </h1>

            <p className="hero-role">Penetration Tester <span>/</span> Security Researcher</p>

            <p className="hero-lead">
              I break systems to build safer ones.<br />
              Focused on offensive security, vulnerability assessment,
              and real-world attack simulation.
            </p>

            <div className="hero-ctas">
              <a href="#bugbounty" className="hbtn hbtn-solid">
                <i className="fa-solid fa-crosshairs"></i> View My Work <i className="fa-solid fa-arrow-right"></i>
              </a>
              <button type="button" className="hbtn hbtn-ghost" onClick={onViewCv}>
                <i className="fa-regular fa-file-lines"></i> View CV
              </button>
            </div>

            <div className="hero-stats">
              {stats.map((s) => (
                <div className="hstat" key={s.lbl}>
                  <i className={`${s.icon} hstat-icon`}></i>
                  <div>
                    <div className="hstat-num">{s.num}</div>
                    <div className="hstat-lbl">{s.lbl}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ---------- right: visual ---------- */}
          <div className="hero-right">
            <div className="m-livebar" aria-hidden="true"><i className="fa-solid fa-terminal"></i> Live <b></b></div>
            <div className="hero-visual">
              <img src="/hero/operator.jpg" alt="" className="hero-art" />
              <span className="hv-ring" aria-hidden="true"></span>
            </div>

            <div className="killchain">
              <div className="kc-title">Red Team</div>
              <ul>
                {killChain.map((k) => <li key={k}>{k}</li>)}
              </ul>
            </div>

            <div className="hterm">
              <div className="hterm-bar">
                <span className="hterm-dots"><i></i><i></i><i></i></span>
                <span className="hterm-title">root@mak:~</span>
                <span className="hterm-live"><i></i> LIVE</span>
              </div>
              <div className="hterm-body" aria-label="Terminal demo">
                {lines.map((l, i) => (
                  <div key={i} className={`hl hl-${l.t}`}>
                    {l.t === 'cmd' && <span className="hp">[~] </span>}
                    {l.v}
                  </div>
                ))}
                <div className="hl hl-cmd">
                  <span className="hp">[~] </span>{typing}<span className="hcaret"></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <HeroMarquee />

        {/* ---------- bottom strip ---------- */}
        <div className="hero-strip">
          <div className="strip-block">
            <div className="strip-head"><span>//</span> Core Expertise</div>
            <div className="exp-row">
              {expertise.map((e) => (
                <div className="exp" key={e.name}>
                  <i className={e.icon}></i>
                  <span>{e.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="strip-sep" aria-hidden="true"></div>

          <div className="strip-block">
            <div className="strip-head"><span>//</span> Tools &amp; Environment</div>
            <div className="tools-row">
              {tools.map((t) => (
                <div className="tl-item" key={t.name}>
                  <span className="tl-icon">
                    {t.img ? <img src={t.img} alt="" /> : <i className={t.icon}></i>}
                  </span>
                  <span>{t.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <a href="#bugbounty" className="hero-scroll" aria-label="Scroll to findings">
          <span>Scroll</span>
          <i className="fa-solid fa-chevron-down"></i>
        </a>
      </div>
    </section>
  )
}
