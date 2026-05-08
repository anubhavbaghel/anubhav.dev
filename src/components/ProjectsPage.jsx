import React, { useState } from 'react'

export default function ProjectsPage() {
  const goHome = () => { if (typeof window !== 'undefined') window.location.hash = '' }

  const projects = [
    {
      id: 'p1',
      title: 'What is happening in my City',
      desc: 'City discovery app that combines nearby events, places, and map-based browsing with location-aware hooks.',
      stack: ['React', 'Maps API', 'Serverless API' , 'Vercel'],
      link: 'https://whatishappeninginmycity.vercel.app/'
    },
    {
      id: 'p2',
      title: 'Hydra App',
      desc: 'A product-focused app experience built with modern frontend workflows and responsive interaction patterns.',
      stack: ['React-Native', 'Frontend', 'Expo' , 'Responsive UI', 'Android'],
      link: 'https://github.com/anubhavbaghel/hydra'
    },
    {
      id: 'p3',
      title: 'Flydheera',
      desc: 'Portfolio / studio site for Flydheera — clean visual design, responsive layout and case-study pages.',
      stack: ['Next.js', 'React', 'Vercel', 'CSS'],
      link: 'https://flydheera.com/'
    },
    {
      id: 'p4',
      title: 'Purava Bath',
      desc: 'E-commerce / brand site for Purava Bath showcasing products with rich imagery and product pages.',
      stack: ['Next.js', 'Shopify', 'React', 'Tailwind'],
      link: 'https://puravabath.com/'
    },
    {
      id: 'p5',
      title: 'WDC Design',
      desc: 'Design and portfolio site for WDC Design — showcases case studies and service pages.',
      stack: ['Gatsby', 'React', 'Netlify', 'SCSS'],
      link: 'https://wdc-design-2.vercel.app/'
    },
    {
      id: 'p6',
      title: 'GitHub User Explore',
      desc: 'An exploration app for GitHub users and repositories with search, filters and lightweight analytics.',
      stack: ['React', 'Vite', 'GitHub API', 'Vercel'],
      link: 'https://github-user-explore-mocha.vercel.app/'
    }
  ]

  const [activeProject, setActiveProject] = useState(projects[0])

  return (
    <div className="projects-page" role="main">
      <div className="projects-page__inner">
        <div className="projects-page__sidebar">
          <div className="projects-page__header">
            <button aria-label="Back home" onClick={goHome} className="projects-page__close">
              <span aria-hidden="true">←</span> Home
            </button>
            <div>
              <h1 className="projects-page__title">Projects</h1>
              <p className="projects-page__subtitle">A collection of my recent work</p>
            </div>
          </div>
          
          <ul className="projects-page__list">
            {projects.map(p => (
              <li key={p.id}>
                <button
                  className={`projects-page__list-item ${activeProject.id === p.id ? 'is-active' : ''}`}
                  onClick={() => setActiveProject(p)}
                >
                  {p.title}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="projects-page__showcase" key={activeProject.id}>
          <div className="project-showcase__info">
            <div className="project-card__header-icon" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>

            <h2 className="project-showcase__title">{activeProject.title}</h2>
            <p className="project-showcase__desc">{activeProject.desc}</p>

            <div className="project-showcase__tags" aria-label="Tech stack">
              {activeProject.stack.map(tech => (
                <span key={tech} className="project-showcase__tag">{tech}</span>
              ))}
            </div>

            <div className="project-showcase__footer">
              {activeProject.link ? (
                <a href={activeProject.link} target="_blank" rel="noopener noreferrer" className="project-showcase__link">View live project</a>
              ) : (
                <span className="project-card__muted">Private repository</span>
              )}
            </div>
          </div>

          {activeProject.link && (
            <div className="project-showcase__browser">
              <div className="browser-header">
                <span className="browser-dot red"></span>
                <span className="browser-dot yellow"></span>
                <span className="browser-dot green"></span>
              </div>
              <div className="browser-iframe-wrapper">
                <iframe src={activeProject.link} title={`${activeProject.title} live preview`} className="browser-iframe" loading="lazy" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
