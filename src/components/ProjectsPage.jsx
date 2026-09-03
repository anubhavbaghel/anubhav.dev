import React, { useState } from 'react'

export default function ProjectsPage() {
  const goHome = () => { if (typeof window !== 'undefined') window.location.hash = '' }

  const projects = [
    {
      id: 'p0',
      title: 'Loco — Full-Stack Web App',
      category: 'Full-Stack Web Application',
      desc: 'Built a responsive application using Next.js, React and TypeScript for exploring and sharing events, places, food and music. Integrated MongoDB/Mongoose, API routes and Zustand with Tailwind CSS for data-driven responsive interfaces.',
      stack: ['Next.js', 'React', 'TypeScript', 'MongoDB', 'Zustand', 'Tailwind CSS'],
      link: 'https://loco-wine.vercel.app/',
      github: 'https://github.com/anubhavbaghel/loco'
    },
    {
      id: 'p1',
      title: 'What is happening in my City',
      category: 'City Discovery Platform',
      desc: 'City discovery app that combines nearby events, places, and map-based browsing with location-aware hooks.',
      stack: ['React', 'Maps API', 'Serverless API', 'Vercel'],
      link: 'https://whatishappeninginmycity.vercel.app/'
    },
    {
      id: 'p2',
      title: 'Hydra — React Native Application',
      category: 'Mobile Application',
      desc: 'Developed a cross-platform mobile application using React Native and Expo, focusing on responsive mobile UI, smooth gestures, and application functionality.',
      stack: ['React Native', 'Frontend', 'Expo', 'Responsive UI', 'Android'],
      link: 'https://github.com/anubhavbaghel/hydra/releases/tag/Hydra_v1.2',
      github: 'https://github.com/anubhavbaghel/hydra',
      release: 'https://github.com/anubhavbaghel/hydra/releases/tag/Hydra_v1.2'
    },
    {
      id: 'p2b',
      title: 'AI-Assisted Web Accessibility Tool',
      category: 'AI & Web Accessibility',
      desc: 'Developed a browser-based tool and extension that analyses webpage content and images to generate meaningful alternative text to enhance web accessibility.',
      stack: ['AI', 'Accessibility', 'JavaScript', 'Browser Tool'],
      link: 'https://github.com/anubhavbaghel/siteshot/releases/tag/v1.9.10',
      github: 'https://github.com/anubhavbaghel/siteshot',
      release: 'https://github.com/anubhavbaghel/siteshot/releases/tag/v1.9.10'
    },
    {
      id: 'p3',
      title: 'Flydheera',
      category: 'Client Website & Portfolio',
      desc: 'Portfolio / studio site for Flydheera — clean visual design, responsive layout and case-study pages.',
      stack: ['Next.js', 'React', 'Vercel', 'CSS'],
      link: 'https://flydheera.com/'
    },
    {
      id: 'p4',
      title: 'Purava Bath',
      category: 'E-Commerce Brand Site',
      desc: 'E-commerce / brand site for Purava Bath showcasing products with rich imagery and product pages.',
      stack: ['Next.js', 'Shopify', 'React', 'Tailwind'],
      link: 'https://puravabath.com/'
    },
    {
      id: 'p5',
      title: 'WDC Design',
      category: 'Portfolio & Case Studies',
      desc: 'Design and portfolio site for WDC Design — showcases case studies and service pages.',
      stack: ['Gatsby', 'React', 'Netlify', 'SCSS'],
      link: 'https://wdc-design-2.vercel.app/'
    },
    {
      id: 'p6',
      title: 'GitHub User Explore',
      category: 'Developer Tool',
      desc: 'An exploration app for GitHub users and repositories with search, filters and lightweight analytics.',
      stack: ['React', 'Vite', 'GitHub API', 'Vercel'],
      link: 'https://github-user-explore-mocha.vercel.app/'
    }
  ]

  const [activeProject, setActiveProject] = useState(projects[0])

  const canEmbed = activeProject.link && !activeProject.link.includes('github.com')

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
              <p className="projects-page__subtitle">A collection of my recent work & applications</p>
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
            {activeProject.category && (
              <div className="project-showcase__category">{activeProject.category}</div>
            )}
            <h2 className="project-showcase__title">{activeProject.title}</h2>
            <p className="project-showcase__desc">{activeProject.desc}</p>

            <div className="project-showcase__tags" aria-label="Tech stack">
              {activeProject.stack.map(tech => (
                <span key={tech} className="project-showcase__tag">{tech}</span>
              ))}
            </div>

            <div className="project-showcase__footer">
              {activeProject.link && canEmbed && (
                <a href={activeProject.link} target="_blank" rel="noopener noreferrer" className="project-showcase__link">
                  Live Demo
                </a>
              )}
              {activeProject.github && (
                <a href={activeProject.github} target="_blank" rel="noopener noreferrer" className="project-showcase__link project-showcase__link--secondary">
                  GitHub
                </a>
              )}
              {activeProject.release && (
                <a href={activeProject.release} target="_blank" rel="noopener noreferrer" className="project-showcase__link project-showcase__link--secondary">
                  View Release
                </a>
              )}
              {!activeProject.link && !activeProject.github && !activeProject.release && (
                <span className="project-card__muted">Private repository</span>
              )}
            </div>
          </div>

          <div className="project-showcase__browser">
            <div className="browser-header">
              <span className="browser-dot red"></span>
              <span className="browser-dot yellow"></span>
              <span className="browser-dot green"></span>
              <span className="browser-title-bar">{activeProject.link || activeProject.github}</span>
            </div>
            <div className="browser-iframe-wrapper">
              {canEmbed ? (
                <iframe src={activeProject.link} title={`${activeProject.title} live preview`} className="browser-iframe" loading="lazy" />
              ) : (
                <div className="browser-preview-placeholder">
                  <div className="preview-placeholder-icon">
                    <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                      <line x1="8" y1="21" x2="16" y2="21"></line>
                      <line x1="12" y1="17" x2="12" y2="21"></line>
                    </svg>
                  </div>
                  <h3>{activeProject.title}</h3>
                  <p>{activeProject.category || 'Application & Project'}</p>
                  <div className="preview-placeholder-buttons">
                    {activeProject.github && (
                      <a href={activeProject.github} target="_blank" rel="noopener noreferrer" className="preview-button">
                        Open on GitHub
                      </a>
                    )}
                    {activeProject.release && (
                      <a href={activeProject.release} target="_blank" rel="noopener noreferrer" className="preview-button preview-button--accent">
                        Download / Release
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
