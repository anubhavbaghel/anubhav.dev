import React from 'react'

const projects = [
  { id: 'p1', title: 'Portfolio Website', desc: 'Personal site built with React and custom CSS.', link: '#' },
  { id: 'p2', title: 'E‑commerce Theme', desc: 'Shopify theme and storefront prototypes.', link: '#' },
  { id: 'p3', title: 'Design System', desc: 'Reusable UI components and tokens.', link: '#' },
]

export default function ProjectsPage() {
  const close = () => { if (typeof window !== 'undefined') window.location.hash = '' }

  return (
    <div className="projects-page" role="main">
      <div className="projects-page__inner">
        <div className="projects-header" style={{ marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button className="projects-home-btn" aria-label="Back home" onClick={close} style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: 18, cursor: 'pointer' }}>←</button>
            <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>Projects</div>
          </div>

          <div>
            <button className="projects-page__close" aria-label="Close projects" onClick={close} style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: 20 }}>✕</button>
          </div>
        </div>

        <section className="projects-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '18px' }}>
          {projects.map((p) => (
            <article key={p.id} className="project-card" style={{ background: 'rgba(255,255,255,0.03)', padding: 18, borderRadius: 8 }}>
              <h3 style={{ margin: '0 0 8px 0' }}>{p.title}</h3>
              <p style={{ margin: 0, color: 'rgba(255,255,255,0.85)' }}>{p.desc}</p>
              <div style={{ marginTop: 12 }}>
                <a href={p.link} target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'underline' }}>View</a>
              </div>
            </article>
          ))}
        </section>
      </div>
    </div>
  )
}
