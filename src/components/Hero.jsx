export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="wrap hero-grid">
        <div>
          <div className="tag-pill"><span className="pulse-dot"></span> Available for freelance &amp; full-time roles</div>
          <h1>
            <span className="hero-name">Mohammad</span>
            <span className="hero-name">Kassem</span>
            <span className="shimmer-text">Breaks systems to build safer ones.</span>
          </h1>
          <p className="hero-role">
            Information Security Associate specializing in <b>Penetration Testing</b>, <b>Web Application Security</b>, and{' '}
            <b>API Security Testing</b> — identifying and remediating vulnerabilities through hands-on offensive security
            assessments and reporting.
          </p>
          <div className="hero-ctas">
            <a href="#contact" className="btn btn-primary">Let's Connect →</a>
            <a href="#experience" className="btn btn-ghost">View Experience</a>
          </div>
        </div>
        <div className="hero-right">
          <div className="orb"></div>
          <div className="ring-dashed"></div>
          <div className="ring-dashed r2"></div>
          <div className="float-card">
            <div className="card-initials">MAK</div>
            <div className="card-role">Mohammad Kassem</div>
            <div className="card-role-sub">Penetration Tester</div>
            <div className="card-stats">
              <div><div className="num">7+</div><div className="lbl">Pentest Assessments</div></div>
              <div><div className="num">3+</div><div className="lbl">Valid Reports</div></div>
              <div><div className="num">5+</div><div className="lbl">Apps Secured</div></div>
            </div>
          </div>
        </div>
      </div>

      <div className="marquee-wrap">
        <div className="marquee-track">
          <span><em>Lebanese University</em> Semicolon Academy <em>ShiftCode</em> Kali Linux <em>Burp Suite</em> Nmap{' '}
            <em>OWASP Top 10</em> IDOR <em>XSS</em> CSRF <em>SQL Injection</em> Bug Bounty <em>HackerOne</em> Web Security{' '}
            <em>Penetration Testing</em> Ethical Hacking <em>Reconnaissance</em> CVE <em>CWE</em></span>
          <span><em>Lebanese University</em> Semicolon Academy <em>ShiftCode</em> Kali Linux <em>Burp Suite</em> Nmap{' '}
            <em>OWASP Top 10</em> Wireshark <em>Metasploit</em> FFUF <em>Subfinder</em> HTTPX{' '}
            <em>Web Application Security</em> Vulnerability Assessment <em>Responsible Disclosure</em> HackerOne{' '}
            <em>Bugcrowd</em></span>
        </div>
      </div>
    </section>
  )
}
