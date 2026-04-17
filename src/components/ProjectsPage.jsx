import React from 'react'
import ProjectCard from './ProjectCard'

export default function ProjectsPage() {
  const goHome = () => { if (typeof window !== 'undefined') window.location.hash = '' }

  const projects = [
    { id: 'p1', title: 'Portfolio Website', desc: 'Personal site built with React and custom CSS.', link: '#' },
    { id: 'p2', title: 'E‑commerce Theme', desc: 'Shopify theme and storefront prototypes.', link: '#' },
    { id: 'p3', title: 'Design System', desc: 'Reusable UI components and tokens.', link: '#' },
  ]

  return (
    <div className="projects-page" role="main" style={{ minHeight: '100vh', position: 'relative' }}>
      <div style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button aria-label="Back home" onClick={goHome} style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: 28, cursor: 'pointer' }}>←</button>
          <span style={{ fontSize: '4rem', fontWeight: 400, lineHeight: 1 }}>Projects</span>
        </div>
      </div>

      <div style={{ position: 'absolute', left: 0, right: 0, bottom: '18vh', display: 'flex', justifyContent: 'center', gap: 18 }}>
        {projects.map((p, i) => (
          <ProjectCard key={p.id} title={p.title} desc={p.desc} link={p.link} delay={i * 220} />
        ))}
      </div>
    </div>
  )
}
