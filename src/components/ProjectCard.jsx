import React, { useEffect, useState } from 'react'

function deterministicColor(seed) {
  // simple hash to deterministic pastel-ish color
  let h = 0
  for (let i = 0; i < seed.length; i++) h = (h << 5) - h + seed.charCodeAt(i)
  const hue = Math.abs(h) % 360
  return `hsl(${hue} 70% 22%)`
}

export default function ProjectCard({ title, desc, stack = [], link, screenshots = [], color, delay = 0 }) {
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

  const bg = color || deterministicColor(title || 'project')

  return (
    <article className="project-card" style={{ ...cardStyle, background: bg }}>
      {screenshots && screenshots.length ? (
        <div className="project-card__screenshots" aria-hidden>
          {screenshots.slice(0, 3).map((src, idx) => (
            <img key={src} src={src} alt={`${title} screenshot ${idx + 1}`} style={{ width: 100 / Math.min(3, screenshots.length) + '%', objectFit: 'cover', borderRadius: 6, marginRight: idx < Math.min(2, screenshots.length - 1) ? 8 : 0 }} />
          ))}
        </div>
      ) : null}

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
