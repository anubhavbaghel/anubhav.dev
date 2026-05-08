import React, { useEffect, useState } from 'react'

export default function ProjectCard({ title, desc, stack = [], link, delay = 0 }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(t)
  }, [delay])

  const cardStyle = {
    transform: visible ? 'translateY(0)' : 'translateY(32px)',
    opacity: visible ? 1 : 0,
    transition: 'transform 420ms cubic-bezier(0.2,0.9,0.2,1), opacity 360ms ease'
  }

  return (
    <article className="project-card" style={cardStyle}>
      <div className="project-card__header-icon" aria-hidden="true">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
        </svg>
      </div>

      <h4 className="project-card__title">{title}</h4>
      <p className="project-card__desc">{desc}</p>

      <div className="project-card__tags" aria-label="Tech stack">
        {stack.map((item) => (
          <span key={`${title}-${item}`} className="project-card__tag">{item}</span>
        ))}
      </div>

      <div className="project-card__footer">
        {link ? (
          <a href={link} target="_blank" rel="noopener noreferrer" className="project-card__link">View project</a>
        ) : (
          <span className="project-card__muted">Private repository</span>
        )}
      </div>
    </article>
  )
}
