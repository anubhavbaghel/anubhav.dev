import React, { useState } from 'react'
import LoadingScreen from './components/LoadingScreen'
import ProjectsPage from './components/ProjectsPage'
import AboutPage from './components/AboutPage'
import TilesLayout from './components/TilesLayout'
import './index.css'

// Minimal App: render exactly 9 Tile components and nothing else
export default function App() {
  const [projectsOpen, setProjectsOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)
  const [noFlip, setNoFlip] = useState(false)

  const closeProjects = () => {
    setNoFlip(true)
    setProjectsOpen(false)
    // remove the noFlip flag shortly after render to restore transitions
    requestAnimationFrame(() => {
      setTimeout(() => setNoFlip(false), 80)
    })
  }
  const closeAbout = () => {
    setNoFlip(true)
    setAboutOpen(false)
    requestAnimationFrame(() => {
      setTimeout(() => setNoFlip(false), 80)
    })
  }
  // Merge top-left 2x2 area into a single tile (replaces t1,t2,t4,t5)
  const tiles = [
    { id: 'm1', title: 'Dashboard', color: '#00A4CC' },
    // this entry becomes the large area on the right that will contain a nested 2x2 grid
    { id: 't3', title: 'Right Group', color: '#00B9FF' },
    { id: 't7', title: 'Maps', color: '#6A00FF' },
    { id: 't8', title: 'Socials', color: '#2B6CB0' },
    { id: 't9', title: 'Messaging', color: '#D400CC' },
    { id: 't10', title: 'Resume', color: '#222222' },
  ]

  // tiles for the nested 2x2 area (they will share the same gap)
  const nested = [
    { id: 'n1', title: 'React', color: '#8AD4FF' },
    { id: 'n2', title: 'Javascript', color: '#F0DB4F' },
    { id: 'n3', title: 'Wordpress', color: '#FFB3B3' },
    { id: 'n4', title: 'Shopify', color: '#C8A2FF' },
  ]

  // right-scroller removed — live tiles handled elsewhere if needed

  // RoleRotator removed per request

  const overlayOpen = projectsOpen || aboutOpen

  return (
    <div className={`app-root ${overlayOpen ? 'projects-open' : ''} ${noFlip ? 'no-flip' : ''}`}>
      <LoadingScreen />
      <div className="layout-outer" id="layoutOuter">
        <main className="main-area">
          <TilesLayout tiles={tiles} nested={nested} flipped={projectsOpen} onOpenProjects={() => setProjectsOpen(true)} onOpenAbout={() => setAboutOpen(true)} />
        </main>

        {projectsOpen ? <ProjectsPage onClose={closeProjects} /> : null}
        {aboutOpen ? <AboutPage onClose={closeAbout} /> : null}

        {/* RightGrid removed per request */}
      </div>
    </div>
  )
}

// convert vertical wheel to horizontal scroll for the layoutOuter container
if (typeof window !== 'undefined') {
  window.requestAnimationFrame(() => {
    const el = document.getElementById('layoutOuter')
    if (!el) return

    // smooth scroll animator using requestAnimationFrame
    let target = el.scrollLeft
    let isRunning = false

    const animate = () => {
      if (!isRunning) return
      const current = el.scrollLeft
      const dist = target - current
      // gentler easing for a smoother feel
      const delta = dist * 0.08
      if (Math.abs(dist) < 0.3) {
        el.scrollLeft = target
        isRunning = false
        return
      }
      el.scrollLeft = current + delta
      requestAnimationFrame(animate)
    }

    const handler = (e) => {
      // only intercept when vertical intent is stronger
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return
      e.preventDefault()
      const max = el.scrollWidth - el.clientWidth
      // accumulate target with a gentler multiplier
      target = Math.max(0, Math.min(max, target + e.deltaY * 1.2))
      if (!isRunning) {
        isRunning = true
        requestAnimationFrame(animate)
      }
    }

    const matchesDesktop = () => window.matchMedia('(pointer: fine) and (min-width: 900px)').matches

    const update = () => {
      el.removeEventListener('wheel', handler)
      // reset target to current scroll position to avoid jumps
      target = el.scrollLeft
      if (matchesDesktop()) el.addEventListener('wheel', handler, { passive: false })
    }

    update()
    window.addEventListener('resize', update)
  })
}

// close on Escape when open — attach via event listener to avoid multiple handlers
if (typeof window !== 'undefined') {
  const _escHandler = (e) => {
    if (e.key !== 'Escape') return
    const root = document.querySelector('.app-root')
    if (!root || !root.classList.contains('projects-open')) return
    // trigger closeProjects by clicking the close button if present, else simulate overlay click
    const closeBtn = document.querySelector('.projects-page__close')
    if (closeBtn) closeBtn.click()
    else {
      const overlay = document.querySelector('.projects-overlay')
      if (overlay) overlay.click()
    }
  }
  window.addEventListener('keydown', _escHandler)
}

// Microsoft-style northeast arrow button (bottom-right)
// placed outside the tiles layout so it overlays the page
const insertMsArrow = () => {
  if (typeof document === 'undefined') return
  const root = document.querySelector('.app-root')
  if (!root || root.querySelector('.ms-arrow-ne')) return
  const btn = document.createElement('button')
  btn.className = 'ms-arrow-ne'
  btn.setAttribute('aria-label', 'Open external')
  btn.type = 'button'
  btn.innerHTML = `
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden>
      <path d="M14 3h7v7" />
      <path d="M10 14L21 3" />
    </svg>
  `
  // no-op click for now; user can attach behavior later
  btn.addEventListener('click', (e) => e.stopPropagation())
  root.appendChild(btn)
}

// removed DOM-insert helper; arrow is now rendered inside the Projects tile
