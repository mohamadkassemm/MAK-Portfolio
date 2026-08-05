import Reveal from './Reveal.jsx'

const projects = [
  {
    emoji: '🛡️',
    name: 'ShiftCode — MERN Stack Web Platform',
    desc: 'Developed a scalable MERN stack web platform with responsive interfaces, RESTful APIs, authentication systems, and database integration for dynamic content management.',
    tags: ['MongoDB', 'Express', 'React', 'Node.js'],
    link: 'https://shiftcode.org',
  },
  {
    emoji: '💉',
    name: 'Skincare by Zahraa — MERN Stack Business Website',
    desc: 'Built a responsive MERN stack business website with secure backend APIs and database-driven product and content management features.',
    tags: ['MongoDB', 'Express', 'React', 'Node.js'],
    link: 'https://skincarebyzahraa.onrender.com',
  },
]

export default function Projects() {
  return (
    <section id="projects">
      <div className="wrap">
        <Reveal direction="up">
          <div className="eyebrow">Selected Work</div>
          <h2 className="sec-title">Projects</h2>
          <p className="sec-sub">Full-stack builds designed and secured end-to-end, from database schema to API authentication.</p>
        </Reveal>
        <div className="proj-grid">
          {projects.map((p) => (
            <Reveal direction="up" className="proj-card" key={p.name}>
              <div className="proj-emoji">{p.emoji}</div>
              <div className="proj-name">{p.name}</div>
              <p className="proj-desc">{p.desc}</p>
              <div className="proj-tags">
                {p.tags.map((t) => <span className="tag" key={t}>{t}</span>)}
              </div>
              <a href={p.link} target="_blank" rel="noopener noreferrer" className="proj-link">
                <i className="fa-solid fa-arrow-up-right-from-square"></i> Visit site
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
