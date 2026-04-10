import React, { useEffect, useRef, useState } from 'react'
import Tile from './components/Tile'
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
    { id: 't8', title: 'OneDrive', color: '#2B6CB0' },
    { id: 't9', title: 'Messaging', color: '#D400CC' },
  ]

  // tiles for the nested 2x2 area (they will share the same gap)
  const nested = [
    { id: 'n1', title: 'React', color: '#8AD4FF' },
    { id: 'n2', title: 'Javascript', color: '#F0DB4F' },
    { id: 'n3', title: 'Wordpress', color: '#FFB3B3' },
    { id: 'n4', title: 'Shopify', color: '#C8A2FF' },
  ]

  // right-scroller live tiles (dynamic metro shapes)
  const rightTiles = [
    { id: 'r1', title: 'Live A', color: '#FF8A65', col: 2, row: 2 },
    { id: 'r2', title: 'Live B', color: '#4DB6AC', col: 1, row: 1 },
    { id: 'r3', title: 'Live C', color: '#BA68C8', col: 1, row: 2 },
    { id: 'r4', title: 'Live D', color: '#90CAF9', col: 2, row: 1 },
    { id: 'r5', title: 'Live E', color: '#FFD54F', col: 1, row: 1 },
    { id: 'r6', title: 'Live F', color: '#A5D6A7', col: 1, row: 1 },
    { id: 'r7', title: 'Live G', color: '#FFAB91', col: 2, row: 1 },
    { id: 'r8', title: 'Live H', color: '#CE93D8', col: 1, row: 2 },
  ]

  function RoleRotator({ items = ['Developer', 'Problem Solver'], hold = 1500, slide = 600 }) {
    const [translatePx, setTranslatePx] = useState(0) // pixel translate value
    const [itemHeight, setItemHeight] = useState(0)
    const [transitionMs, setTransitionMs] = useState(slide)
    const containerRef = useRef(null)
    const ulRef = useRef(null)
    const firstItemRef = useRef(null)

    // measure item height and set container height to match
    useEffect(() => {
      const measure = () => {
        const first = firstItemRef.current || (ulRef.current && ulRef.current.querySelector('li'))
        if (first && containerRef.current) {
          const h = Math.ceil(first.getBoundingClientRect().height)
          setItemHeight(h)
          containerRef.current.style.height = `${h}px`
        }
      }
      measure()
      window.addEventListener('resize', measure)
      return () => window.removeEventListener('resize', measure)
    }, [items])

    // control timing once we know the item height — cycle through all items sequentially
    useEffect(() => {
      if (!itemHeight) return
      const timerIds = []
      let index = 0

      const itemsCount = items.length

      const schedule = () => {
        // hold current index
        timerIds.push(setTimeout(() => {
          const next = index + 1
          // translate to next (allow transition)
          setTransitionMs(slide)
          setTranslatePx(-next * itemHeight)

          // after slide finishes
          timerIds.push(setTimeout(() => {
            if (next === itemsCount) {
              // reached duplicate of first item — snap back to 0 without transition
              setTransitionMs(0)
              setTranslatePx(0)
              // force reflow then re-enable transition for next cycle
              timerIds.push(setTimeout(() => {
                index = 0
                setTransitionMs(slide)
                schedule()
              }, 20))
            } else {
              index = next
              schedule()
            }
          }, slide))
        }, hold))
      }

      // start
      setTransitionMs(slide)
      setTranslatePx(0)
      index = 0
      schedule()

      return () => timerIds.forEach((id) => clearTimeout(id))
    }, [itemHeight, items.length, hold, slide])

    const ulStyle = { transform: `translateY(${translatePx}px)`, transition: `transform ${transitionMs}ms ease` }

    return (
      <div className="role-rotator" ref={containerRef} aria-hidden>
        <ul ref={ulRef} style={ulStyle}>
          {items.concat(items[0]).map((it, i) => (
            <li ref={i === 0 ? firstItemRef : undefined} className="role-item" key={i}>
              {it}
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <div className="app-root">
      <LoadingScreen />
      <div className="layout-outer" id="layoutOuter">
        <main className="main-area">
          <section className="tiles-layout">
            {tiles.map((t) => {
              if (t.id === 'm1') {
                return (
                  <Tile key={t.id} color={t.color} style={{ gridColumn: '1 / span 2', gridRow: '1 / span 2' }}>
                    <div>
                      <span>Hello</span>
                      <div style={{ color: '#000', marginTop: 8, fontWeight: 500 }}>I’m Anubhav Baghel</div>

                      <RoleRotator items={["Developer", "Problem Solver", "Builder", "Strategist", "Navigator", "Thinker", "Debugger"]} hold={1500} slide={600} />
                    </div>
                  </Tile>
                )
              }
              if (t.id === 't3') {
                return (
                  <div key="right-nested" className="nested-grid-wrapper" style={{ gridColumn: '3', gridRow: 'span 2' }}>
                    <div className="nested-grid">
                      {nested.map((n) => {
                        if (n.id === 'n2') {
                          return (
                            <Tile key={n.id} title={n.title} color={n.color}>
                              <div className="tile-bottom-right tile-bottom-right--big" aria-hidden>JS</div>
                            </Tile>
                          )
                        }
                        return <Tile key={n.id} title={n.title} color={n.color} />
                      })}
                    </div>
                  </div>
                )
              }

              return <Tile key={t.id} title={t.title} subtitle={t.subtitle} color={t.color} />
            })}
          </section>
        </main>

        <aside className="right-scroller">
          <div className="live-grid">
            {rightTiles.map((r) => (
              <Tile
                key={r.id}
                title={r.title}
                color={r.color}
                style={{ gridColumn: `span ${r.col || 1}`, gridRow: `span ${r.row || 1}` }}
              />
            ))}
          </div>
        </aside>
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
