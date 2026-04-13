import React from 'react'

export default function ProjectsPage({ onClose }) {
  return (
    <div className="projects-page" role="dialog" aria-modal="true">
      <button className="projects-page__close" aria-label="Close projects" onClick={onClose}>✕</button>
      <h1 className="projects-page__heading">projects</h1>
      <ol className="projects-list">
        <li className="projects-list__item">Whatishappeninginmycity</li>
        <li className="projects-list__item">Hydra (Hydration Reminder App)</li>
        <li className="projects-list__item">Flydheera</li>
        <li className="projects-list__item">The Wedding Design Company</li>
        <li className="projects-list__item">Aerohire</li>
      </ol>
    </div>
  )
}
