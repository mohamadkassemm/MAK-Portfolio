import Reveal from './Reveal.jsx'

const jobs = [
  {
    role: 'Co-Founder, Penetration Tester & Full Stack Web Developer',
    date: 'August 2025 – Present',
    company: 'ShiftCode · Beirut, Lebanon',
    desc: 'Developed and deployed 2+ secure full-stack web applications from design to production. Conducted penetration testing and security assessments for 4+ projects using standard tools, identifying and remediating API security flaws and access control vulnerabilities across systems. Managed client communication, project planning, and technical delivery to ensure timelines.',
    badges: ['Penetration Testing', 'API Security', 'Full-Stack Development', 'Client Delivery'],
  },
  {
    role: 'IT Specialist & Computer Instructor',
    date: 'September 2024 – Present',
    company: 'Mohammad Saad High School · Tyre, Lebanon',
    desc: 'Managed and maintained 20+ computers and internal IT systems across departments and users, providing technical support for hardware, software, and network-related issues for end users.',
    badges: ['IT Systems Management', 'Technical Support', 'Network Administration'],
  },
  {
    role: 'Full-Stack Web Development Intern',
    date: 'July 2024 – February 2025',
    company: 'Two of Us (Techlarious) · Beirut, Lebanon',
    desc: 'Developed responsive MERN stack web applications and APIs for scalable production use. Contributed to 2 full-scale projects and 3+ development tasks within agile team environments, working on authentication systems and database integration using secure best practices.',
    badges: ['MERN Stack', 'Authentication', 'Agile Team'],
  },
]

export default function Experience() {
  return (
    <section id="experience">
      <div className="wrap">
        <Reveal direction="up">
          <div className="eyebrow">Career</div>
          <h2 className="sec-title">Professional Experience</h2>
          <p className="sec-sub">Hands-on roles applying offensive security and full-stack engineering to real systems.</p>
        </Reveal>
        <div className="timeline">
          {jobs.map((job) => (
            <Reveal as="div" direction="left" className="tl-item" key={job.role}>
              <div className="tl-card">
                <div className="tl-head">
                  <span className="tl-role">{job.role}</span>
                  <span className="tl-date">{job.date}</span>
                </div>
                <div className="tl-company">{job.company}</div>
                <p className="tl-desc">{job.desc}</p>
                <div className="tl-badges">
                  {job.badges.map((b) => <span className="badge" key={b}>{b}</span>)}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
