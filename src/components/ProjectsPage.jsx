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
    },
    {
      id: 'p3',
      title: 'Flydheera',
      desc: 'Portfolio / studio site for Flydheera — clean visual design, responsive layout and case-study pages.',
      stack: ['Next.js', 'React', 'Vercel', 'CSS'],
      link: 'https://flydheera.com/'
    },
    {
      id: 'p4',
      title: 'Purava Bath',
      desc: 'E-commerce / brand site for Purava Bath showcasing products with rich imagery and product pages.',
      stack: ['Next.js', 'Shopify', 'React', 'Tailwind'],
      link: 'https://puravabath.com/'
    },
    {
      id: 'p5',
      title: 'WDC Design',
      desc: 'Design and portfolio site for WDC Design — showcases case studies and service pages.',
      stack: ['Gatsby', 'React', 'Netlify', 'SCSS'],
      link: 'https://wdc-design-2.vercel.app/'
    },
    {
      id: 'p6',
      title: 'GitHub User Explore',
      desc: 'An exploration app for GitHub users and repositories with search, filters and lightweight analytics.',
      stack: ['React', 'Vite', 'GitHub API', 'Vercel'],
      link: 'https://github-user-explore-mocha.vercel.app/'
    }
  ]

  return (
    <div className="projects-page" role="main">
      <div className="projects-page__inner">
        <div className="projects-page__header">
          <button aria-label="Back home" onClick={goHome} className="projects-page__close">
            <span aria-hidden="true">←</span> Home
          </button>
          <div>
            <h1 className="projects-page__title">Projects</h1>
            <p className="projects-page__subtitle">A collection of my recent work</p>
          </div>
        </div>

        <div className="projects-page__grid">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} title={p.title} desc={p.desc} stack={p.stack} link={p.link} delay={i * 120} />
          ))}
        </div>
      </div>
    </div>
  )
}
