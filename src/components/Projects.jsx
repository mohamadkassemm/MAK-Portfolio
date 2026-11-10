import Reveal from './Reveal.jsx'
import HeroWave from './HeroWave.jsx'
import { useSwipe, SwipeDots, useExpand, ExpandToggle } from '../mobile.jsx'

// Small inline Google Ads mark (not in the icon fonts we load)
const GoogleAds = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
    <path d="M9.2 3.6 2.3 15.5a3.9 3.9 0 1 0 6.8 3.9L16 7.5z" fill="#fbbc04" />
    <path d="M14.8 3.6a3.9 3.9 0 0 0-6.8 3.9l6.9 11.9a3.9 3.9 0 1 0 6.8-3.9z" fill="#4285f4" />
    <circle cx="5.7" cy="17.5" r="3.9" fill="#34a853" />
  </svg>
)

const tech = {
  MongoDB: <i className="devicon-mongodb-plain colored"></i>,
  Express: <i className="devicon-express-original"></i>,
  React: <i className="devicon-react-original colored"></i>,
  'Node.js': <i className="devicon-nodejs-plain colored"></i>,
  SEO: <i className="devicon-google-plain colored"></i>,
  'Google Ads': <GoogleAds />,
  'Search Console': <i className="fa-solid fa-toolbox" style={{ color: '#9aa4b2' }}></i>,
  'Technical SEO': <i className="fa-solid fa-gear" style={{ color: '#ff2d40' }}></i>,
  'Local SEO': <i className="fa-solid fa-location-dot" style={{ color: '#ff2d40' }}></i>,
}

const projects = [
  {
    icon: 'fa-solid fa-laptop-code',
    kind: 'MERN Platform',
    name: 'ShiftCode',
    desc: 'Scalable MERN stack web platform with responsive interfaces, RESTful APIs, authentication systems and database integration for dynamic content management.',
    tags: ['MongoDB', 'Express', 'React', 'Node.js'],
    link: 'https://shiftcode.org',
  },
  {
    icon: 'fa-solid fa-basket-shopping',
    kind: 'Business Website',
    name: 'Skincare by Zahraa',
    desc: 'Responsive MERN stack business website with secure backend APIs and database-driven product and content management.',
    tags: ['MongoDB', 'Express', 'React', 'Node.js'],
    link: 'https://skincarebyzahraa.onrender.com',
  },
  {
    icon: 'fa-solid fa-chart-column',
    kind: 'SEO Optimization',
    name: 'Bostondinio Coach',
    desc: 'Improved local search visibility through technical SEO, schema markup, accessibility fixes and conversion tracking with GA4 and Search Console.',
    tags: ['SEO', 'Google Ads', 'Search Console'],
    link: 'https://bostondiniocoach.com',
  },
  {
    icon: 'fa-solid fa-car',
    kind: 'SEO Optimization',
    name: 'Dedham Airport Taxi',
    desc: 'Improved local search visibility through technical and on-page SEO, schema markup, performance optimization and local search enhancements.',
    tags: ['SEO', 'Technical SEO', 'Local SEO'],
    link: 'https://dedhamairporttaxi.com',
  },
]

export default function Projects() {
  const swipe = useSwipe()
  const { isOpen, toggle } = useExpand()
  return (
    <section id="projects" className="dep">
      <img src="/hero/laptop.jpg" alt="" className="dep-art" aria-hidden="true" />
      <HeroWave className="dep-wave" />

      <div className="fnd-wrap">
        <Reveal direction="up" className="dep-head">
          <div className="fnd-rule">
            <span className="fnd-idx">03</span>
            <span className="fnd-kicker">Selected Work</span>
            <span className="fnd-line"></span>
          </div>
          <h2 className="fnd-title">DEPLOY<span className="t-red">MENTS</span><span className="t-slash" aria-hidden="true">//</span></h2>
          <p className="fnd-sub">
            Full-stack builds designed and secured end-to-end, from database
            schema to API authentication.
          </p>
        </Reveal>

        <div className="dep-grid m-swipe" ref={swipe.ref} aria-roledescription="carousel" aria-label="Projects">
          {projects.map((p, i) => (
            <Reveal direction="up" className={`dcard m-card ${isOpen(i) ? 'is-open' : ''}`} key={p.name} style={{ '--rd': `${i * 100}ms` }} aria-roledescription="slide" aria-label={`Project ${i + 1} of ${projects.length}: ${p.name}`}>
              <div className="dcard-in">
                <span className="dcard-num">{String(i + 1).padStart(2, '0')}</span>

                <div className="dcard-banner" aria-hidden="true">
                  <i className={p.icon}></i>
                </div>

                <div className="dcard-body">
                  <div className="dcard-kind">{p.kind}</div>
                  <h3 className="dcard-name">{p.name}</h3>
                  <p className="dcard-desc m-clamp" id={`dep-desc-${i}`}>{p.desc}</p>
                  <ExpandToggle open={isOpen(i)} onClick={() => toggle(i)} controls={`dep-desc-${i}`} />

                  <div className="dcard-tech">
                    {p.tags.map((t) => (
                      <span key={t}>{tech[t]}{t}</span>
                    ))}
                  </div>

                  <a href={p.link} target="_blank" rel="noopener noreferrer" className="dcard-visit">
                    Visit Site <i className="fa-solid fa-arrow-up-right-from-square"></i>
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <SwipeDots swipe={swipe} label="Project" />
      </div>
    </section>
  )
}
