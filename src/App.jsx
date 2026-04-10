import React from 'react'
import Tile from './components/Tile'
import './index.css'

// Minimal App: render exactly 9 Tile components and nothing else
export default function App() {
  const tiles = [
    { id: 't1', title: 'Mail', color: '#00A4CC' },
    { id: 't2', title: 'Calendar', color: '#6A00FF' },
    // this entry becomes the large area on the right that will contain a nested 2x2 grid
    { id: 't3', title: 'Right Group', color: '#00B9FF' },
    { id: 't4', title: 'Store', color: '#0A7F00' },
    { id: 't5', title: 'People', color: '#FF6A00' },
    // removed the separate middle-right tile (was t6) because the right column top+middle
    // will be occupied by the nested 2x2 grid.
    { id: 't7', title: 'Maps', color: '#6A00FF' },
    { id: 't8', title: 'OneDrive', color: '#2B6CB0' },
    { id: 't9', title: 'Messaging', color: '#D400CC' },
  ]

  // tiles for the nested 2x2 area (they will share the same gap)
  const nested = [
    { id: 'n1', title: 'Photos', color: '#8AD4FF' },
    { id: 'n2', title: 'Notes', color: '#FFD36B' },
    { id: 'n3', title: 'Tasks', color: '#FFB3B3' },
    { id: 'n4', title: 'News', color: '#C8A2FF' },
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

  return (
    <div className="app-root">
      <div className="layout-outer" id="layoutOuter">
        <main className="main-area">
          <section className="tiles-layout">
            {tiles.map((t) => {
              if (t.id === 't3') {
                return (
                  <div key="right-nested" className="nested-grid-wrapper" style={{ gridColumn: '3', gridRow: 'span 2' }}>
                    <div className="nested-grid">
                      {nested.map((n) => (
                        <Tile key={n.id} title={n.title} color={n.color} />
                      ))}
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

    const handler = (e) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return
      e.preventDefault()
      el.scrollLeft += e.deltaY
    }

    const matchesDesktop = () => window.matchMedia('(pointer: fine) and (min-width: 900px)').matches

    const update = () => {
      // remove first to avoid duplicate listeners
      el.removeEventListener('wheel', handler)
      if (matchesDesktop()) el.addEventListener('wheel', handler, { passive: false })
    }

    update()
    window.addEventListener('resize', update)
  })
}
