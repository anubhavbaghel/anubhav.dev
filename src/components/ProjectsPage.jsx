import React from 'react'

export default function ProjectsPage({ onClose }) {
  return (
    <div className="projects-page" role="dialog" aria-modal="true">
      <div className="projects-page__inner">
        <button className="projects-page__close" aria-label="Close projects" onClick={onClose}>✕</button>
        <h1 className="projects-page__title">Projects</h1>
        <p className="projects-page__intro">A showcase of selected projects. Click a card for details.</p>

        <div className="projects-grid">
          <article className="project-card">
            <h2>Project A</h2>
            <p>Short description of Project A.</p>
          </article>
          <article className="project-card">
            <h2>Project B</h2>
            <p>Short description of Project B.</p>
          </article>
          <article className="project-card">
            <h2>Project C</h2>
            <p>Short description of Project C.</p>
          </article>
        </div>
      </div>
    </div>
  )
}
