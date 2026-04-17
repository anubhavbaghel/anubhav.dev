import React, { useEffect, useState } from 'react'

export default function ProjectCard({ title, desc, link = '#', delay = 0 }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(t)
  }, [delay])

  const cardStyle = {
    background: 'rgba(255,255,255,0.03)',
    padding: 24,
    borderRadius: 0,
    minWidth: 320,
    maxWidth: 420,
    width: 'min(420px, 34vw)',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    transform: visible ? 'translateX(0)' : 'translateX(80px)',
    opacity: visible ? 1 : 0,
    transition: 'transform 420ms cubic-bezier(0.2,0.9,0.2,1), opacity 360ms ease',
    boxShadow: '0 10px 30px rgba(0,0,0,0.35)'
  }

  return (
    <div className="project-card" style={cardStyle}>
      <h4 style={{ margin: '0 0 8px 0' , fontWeight: 400}}>{title}</h4>
      <p style={{ margin: 0, color: 'rgba(255,255,255,0.85)' , fontWeight: 400 }}>{desc}</p>
      <div style={{ marginTop: 12 }}>
        <a href={link} target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'underline', fontWeight: 400 }}>View</a>
      </div>
    </div>
  )
}
