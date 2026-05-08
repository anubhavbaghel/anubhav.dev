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
