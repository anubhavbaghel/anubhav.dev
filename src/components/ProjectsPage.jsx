import React from 'react'
import ProjectCard from './ProjectCard'

export default function ProjectsPage() {
  const goHome = () => { if (typeof window !== 'undefined') window.location.hash = '' }

  const projects = [
    {
      id: 'p1',
      title: 'What is happening in my City',
      desc: 'City discovery app that combines nearby events, places, and map-based browsing with location-aware hooks.',
      stack: ['React', 'Maps API', 'Serverless API' , 'Vercel'],
      link: 'https://github.com/anubhavbaghel/WhatIsHappeningInMyCity'
    },
    {
      id: 'p2',
      title: 'Hydra App',
      desc: 'A product-focused app experience built with modern frontend workflows and responsive interaction patterns.',
      stack: ['React-Native', 'Frontend', 'Expo' , 'Responsive UI', 'Android'],
      link: 'https://github.com/anubhavbaghel/hydra'
    }
  ]

  return (
    <div className="projects-page" role="main">
      <div className="projects-page__inner">
        <div className="projects-page__header">
          <button aria-label="Back home" onClick={goHome} className="projects-page__close">←</button>
          <span className="projects-page__title">Projects</span>
        </div>

        <div className="projects-page__grid">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} title={p.title} desc={p.desc} stack={p.stack} link={p.link} delay={i * 180} />
          ))}
        </div>
      </div>
    </div>
  )
}
