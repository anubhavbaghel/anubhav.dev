import React from 'react'

export default function ProjectsPage() {
  const goHome = () => { if (typeof window !== 'undefined') window.location.hash = '' }

  return (
    <div className="projects-page" role="main">
      <div style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button aria-label="Back home" onClick={goHome} style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: 28, cursor: 'pointer' }}>←</button>
          <span style={{ fontSize: '4rem', fontWeight: 400, lineHeight: 1 }}>Projects</span>
        </div>
      </div>
    </div>
  )
}
