import Reveal from './Reveal.jsx'
import HeroWave from './HeroWave.jsx'
import { useSwipe, SwipeDots, useExpand, ExpandToggle } from '../mobile.jsx'

const jobs = [
  {
    op: '03',
    icon: 'fa-solid fa-layer-group',
    role: 'Co-Founder, Penetration Tester & Full Stack Web Developer',
    date: 'Aug 2025 – Present',
    company: 'ShiftCode · Beirut, Lebanon',
    points: [
      'Conducted penetration testing and security assessments for 4+ projects, identifying and remediating API security flaws and access-control vulnerabilities.',
      'Developed and deployed 2+ secure full-stack web applications from design to production.',
      'Managed client communication, project planning and technical delivery to keep timelines on track.',
    ],
    badges: ['Penetration Testing', 'API Security', 'Full-Stack', 'Client Delivery'],
    live: true,
  },
  {
    op: '02',
    icon: 'fa-solid fa-laptop-code',
    role: 'IT Specialist & Computer Instructor',
    date: 'Sep 2024 – Present',
    company: 'Mohammad Saad High School · Tyre, Lebanon',
    points: [
      'Managed and maintained 20+ computers and internal IT systems across departments and users.',
      'Provided technical support for hardware, software and network-related issues for end users.',
    ],
    badges: ['IT Systems', 'Technical Support', 'Network Admin'],
    live: true,
  },
  {
    op: '01',
    icon: 'fa-solid fa-globe',
    role: 'Full-Stack Web Development Intern',
    date: 'Jul 2024 – Feb 2025',
    company: 'Two of Us (Techlarious) · Beirut, Lebanon',
    points: [
      'Developed responsive MERN stack web applications and APIs for scalable production use.',
      'Contributed to 2 full-scale projects and 3+ development tasks in agile teams, working on authentication systems and database integration with secure best practices.',
    ],
    badges: ['MERN Stack', 'Authentication', 'Agile Team'],
  },
]

export default function Experience() {
  const swipe = useSwipe()
  const { isOpen, toggle } = useExpand()
  return (
    <section id="experience" className="opl">
      <HeroWave className="dep-wave" />

      <div className="fnd-wrap">
        <Reveal direction="up" className="opl-head">
          <div className="fnd-rule">
            <span className="fnd-idx">02</span>
            <span className="fnd-kicker">Career</span>
            <span className="fnd-line con-line"></span>
            <span className="con-hatch" aria-hidden="true"></span>
          </div>
          <h2 className="fnd-title">OPS LOG<span className="t-slash" aria-hidden="true">//</span></h2>
          <p className="opl-sub">Hands-on roles applying offensive security and full-stack engineering to real systems.</p>
        </Reveal>

        <div className="opl-track m-swipe" ref={swipe.ref} aria-roledescription="carousel" aria-label="Career timeline">
          <span className="opl-line" aria-hidden="true" data-swipe-ignore=""></span>
          {jobs.map((job, i) => (
            <div className={`opl-col m-card ${isOpen(i) ? 'is-open' : ''}`} key={job.role} aria-roledescription="slide" aria-label={`Operation ${job.op}: ${job.role}`}>
              <Reveal direction="up" className="opl-when" style={{ '--rd': `${i * 120}ms` }}>
                <span className="opl-date">{job.date}</span>
                <span className="opl-node" aria-hidden="true"></span>
              </Reveal>

              <Reveal direction="up" className="opl-card" style={{ '--rd': `${120 + i * 120}ms` }}>
                <div className="opl-in">
                  <div className="opl-bar">
                    <span className="opl-op">OP {job.op}</span>
                    {job.live && <span className="opl-live"><i></i> Active</span>}
                    <span className="opl-hatch" aria-hidden="true"></span>
                  </div>

                  <div className="opl-title">
                    <span className="opl-icon" aria-hidden="true"><i className={job.icon}></i></span>
                    <div>
                      <h3>{job.role}</h3>
                      <div className="opl-company">{job.company}</div>
                    </div>
                  </div>

                  <ul className="opl-points">
                    {job.points.map((p, k) => <li key={p} className={k > 0 ? 'm-extra' : undefined} id={k === 1 ? `opl-more-${i}` : undefined}>{p}</li>)}
                  </ul>

                  <div className="opl-tags m-more">
                    {job.badges.map((b) => <span key={b}>{b}</span>)}
                  </div>
                  <div className="opl-toggle">
                    <ExpandToggle open={isOpen(i)} onClick={() => toggle(i)} controls={`opl-more-${i}`} />
                  </div>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
        <SwipeDots swipe={swipe} label="Operation" />
      </div>
    </section>
  )
}
