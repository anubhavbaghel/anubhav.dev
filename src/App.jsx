import React, { useEffect, useRef, useState } from 'react'
import Tile from './components/Tile'
import ReconstructWords from './components/ReconstructWords'
import LoadingScreen from './components/LoadingScreen'
import './index.css'

// Minimal App: render exactly 9 Tile components and nothing else
export default function App() {
  // Merge top-left 2x2 area into a single tile (replaces t1,t2,t4,t5)
  const tiles = [
    { id: 'm1', title: 'Dashboard', color: '#00A4CC' },
    // this entry becomes the large area on the right that will contain a nested 2x2 grid
    { id: 't3', title: 'Right Group', color: '#00B9FF' },
    { id: 't7', title: 'Maps', color: '#6A00FF' },
    { id: 't8', title: 'Socials', color: '#2B6CB0' },
    { id: 't9', title: 'Messaging', color: '#D400CC' },
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

  return (
    <div className="app-root">
      <LoadingScreen />
      <div className="layout-outer" id="layoutOuter">
        <main className="main-area">
          <section className="tiles-layout">
            <div className="tile-name">About Me</div>
            <div className="tile-name"></div>
            <div className="tile-name">Skills & Technologies</div>
            {tiles.map((t) => {
              if (t.id === 'm1') {
                return (
                  <Tile key={t.id} color={t.color} className="tile--dashboard tile--large" style={{ gridColumn: '1 / span 2', gridRow: '2 / span 2' }}>
                      <div>
                      <ReconstructWords words={["Namaste", "Hola", "Ciao", "Hello"]} />
                      <div style={{ color: '#000', marginTop: 8, fontWeight: 500 }}>I’m Anubhav</div>
                      <div id="description" style={{ marginTop: 8, color: '#222', fontWeight: 400, fontSize: "1.5rem" }}>
                        I am a FrontEnd Developer who views the web as a canvas for interaction. By blending robust technical logic with intuitive design, I architect seamless digital experiences that translate complex problems into elegant solutions, driving user engagement and measurable performance at every click.
                      </div>
                    </div>
                  </Tile>
                )
              }
              if (t.id === 't3') {
                return (
                  <div key="right-nested" className="technical-stack" style={{ gridColumn: '3', gridRow: '2 / span 2' }}>
                    <div className="tech-heading" aria-hidden>Skill & Technologies</div>
                    <div className="nested-grid top-right">
                      {nested.map((n) => {
                        if (n.id === 'n1') {
                          return (
                            <Tile key={n.id} title={n.title} color={'#ffffff'} className="tile--slide tile--react tile--small">
                              <div className="tile-center-logo" aria-hidden>
                                <img src={'/assets/React-icon.svg'} alt="React" />
                              </div>
                            </Tile>
                          )
                        }

                        if (n.id === 'n2') {
                          return (
                            <Tile key={n.id} title={n.title} color={n.color} className="tile--js tile--small">
                              <div className="tile-top-left" aria-hidden>
                                <div className="typing">console.log('helloworld')</div>
                              </div>
                              <div className="tile-bottom-right tile-bottom-right--big" aria-hidden>JS</div>
                            </Tile>
                          )
                        }

                        if (n.id === 'n3') {
                          return (
                            <Tile key={n.id} title={n.title} color={'#000000'} className="tile--slide tile--small">
                              <div className="tile-center-logo" aria-hidden>
                                <img src={'/assets/Wordpress-Logo.svg'} alt="Wordpress" />
                              </div>
                            </Tile>
                          )
                        }

                        if (n.id === 'n4') {
                          return (
                            <Tile key={n.id} title={n.title} color={'#96BF48'} className="tile--slide tile--small">
                              <div className="tile-center-logo" aria-hidden>
                                <img src={'/assets/shopify/shopify_glyph_black.svg'} alt="Shopify" />
                              </div>
                            </Tile>
                          )
                        }

                        return <Tile key={n.id} title={n.title} color={n.color} />
                      })}
                    </div>
                  </div>
                )
              }

              if (t.id === 't8') {
                return (
                  <div
                    key={t.id}
                    className="social-media tile"
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gridTemplateRows: '1fr 1fr',
                      gap: 'var(--tile-gap)',
                      padding: 0,
                      background: 'transparent',
                    }}
                  >
                    <div key={`${t.id}-b-1`} className="tile tile--small" style={{ background: '#ffffff', padding: '10%' }}>
                      <div className="tile-center-logo" aria-hidden>
                        <img src={'/assets/Socials/Threads_(app)_logo.svg'} alt="Threads" style={{ width: '80%', height: '80%', objectFit: 'contain' }} />
                      </div>
                    </div>
                    <div key={`${t.id}-b-2`} className="tile tile--small" style={{ background: '#ffffff', padding: 0 }}>
                      <div className="tile-center-logo" aria-hidden>
                        <img src={'/assets/Socials/GitHub_Invertocat_Black_Clearspace.svg'} alt="GitHub" style={{ width: '80%', height: '80%', objectFit: 'contain' }} />
                      </div>
                    </div>
                    <div key={`${t.id}-b-3`} className="tile tile--small" style={{ background: '#ffffff', padding: '10%' }}>
                      <div className="tile-center-logo" aria-hidden>
                        <img src={'/assets/Socials/linkedin-svgrepo-com.svg'} alt="LinkedIn" style={{ width: '80%', height: '80%', objectFit: 'contain' }} />
                      </div>
                    </div>
                    <div key={`${t.id}-b-4`} className="tile tile--small" style={{ background: '#ffffff', padding: '10%' }}>
                      <div className="tile-center-logo" aria-hidden>
                        <img src={'/assets/Socials/Gmail_icon_(2020).svg'} alt="Gmail" style={{ width: '80%', height: '80%', objectFit: 'contain' }} />
                      </div>
                    </div>
                  </div>
                )
              }

              if (t.id === 't7') return (
                <Tile key={t.id} title={'Projects'} subtitle={t.subtitle} color={t.color} className="tile--medium">
                  <div className="tile-title" style={{ fontWeight: 400 }}>Projects</div>
                  <button
                    className="ms-arrow-ne"
                    aria-label="Open external"
                    type="button"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M14 3h7v7" />
                      <path d="M10 14L21 3" />
                    </svg>
                  </button>
                </Tile>
              )
              if (t.id === 't9') return <Tile key={t.id} title={t.title} subtitle={t.subtitle} color={t.color} className="tile--small" />
              return <Tile key={t.id} title={t.title} subtitle={t.subtitle} color={t.color} />
            })}
          </section>
        </main>

        {/* right-scroller removed */}
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
