import React from 'react'

export default function ProjectsPage({ onClose }) {
  return (
    <div className="projects-overlay" role="dialog" aria-modal="true">
      <div className="projects-page">
        <div className="projects-page__inner">
          <div className="projects-main">
            <div className="projects-left">
              <div className="projects-header">
                <h2 className="projects-page__heading">Projects</h2>
                <button className="projects-page__close" aria-label="Close projects" onClick={onClose}>✕</button>
              </div>

              <div className="projects-left-body">
                <div className="projects-icons">
                  <button className="projects-icon">•</button>
                  <button className="projects-icon">•</button>
                  <button className="projects-icon">•</button>
                  <button className="projects-icon">•</button>
                </div>
              </div>
            </div>

            <div className="projects-right">
              <div className="projects-showcase">Project showcase placeholder</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
