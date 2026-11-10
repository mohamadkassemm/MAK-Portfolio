import { useEffect, useState } from 'react'

const lines = [
  '[*] initializing operator profile...',
  '[*] loading payloads ............ ok',
  '[*] mapping attack surface ...... ok',
  '[*] bypassing perimeter ......... ok',
  '[+] session established',
]

export default function Loader({ hidden }) {
  const [shown, setShown] = useState(0)

  useEffect(() => {
    if (shown >= lines.length) return
    const t = setTimeout(() => setShown((n) => n + 1), 340)
    return () => clearTimeout(t)
  }, [shown])

  const done = shown >= lines.length

  return (
    <div id="loader" className={hidden ? 'hide' : ''} aria-hidden={hidden}>
      <div className="loader-box">
        <div className="loader-logo stripe-text">MAK</div>
        <div className="loader-log">
          {lines.slice(0, shown).map((l) => (
            <div key={l} className={l.startsWith('[+]') ? 'ok' : ''}>{l}</div>
          ))}
          {!done && <span className="caret">_</span>}
        </div>
        <div className="loader-bar"><i style={{ width: `${(shown / lines.length) * 100}%` }}></i></div>
        <div className={`loader-status ${done ? 'granted' : ''}`}>
          {done ? 'ACCESS GRANTED' : 'AUTHENTICATING'}
        </div>
      </div>
    </div>
  )
}
