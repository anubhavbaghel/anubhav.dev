import React from 'react'
import Tile from './Tile'
import ReconstructWords from './ReconstructWords'

export default function TilesLayout({ tiles = [], nested = [], flipped = false, onOpenProjects = () => {}, onOpenAbout = () => {}, showLabels = true }) {
  const renderNested = (items) => items.map((n) => {
    switch (n.id) {
      case 'n1':
        return (
          <Tile key={n.id} title={n.title} color={'#ffffff'} className="tile--slide tile--react tile--small" flipped={flipped}>
            <div className="tile-center-logo" aria-hidden>
              <img src={'/assets/React-icon.svg'} alt="React" />
            </div>
          </Tile>
        )
      case 'n2':
        return (
          <Tile key={n.id} title={n.title} color={n.color} className="tile--js tile--small" flipped={flipped}>
            <div className="tile-top-left" aria-hidden>
              <div className="typing">console.log('helloworld')</div>
            </div>
            <div className="tile-bottom-right tile-bottom-right--big" aria-hidden>JS</div>
          </Tile>
        )
      case 'n3':
        return (
          <Tile key={n.id} title={n.title} color={'#000000'} className="tile--slide tile--small" flipped={flipped}>
            <div className="tile-center-logo" aria-hidden>
              <img src={'/assets/Wordpress-Logo.svg'} alt="Wordpress" />
            </div>
          </Tile>
        )
      case 'n4':
        return (
          <Tile key={n.id} title={n.title} color={'#96BF48'} className="tile--slide tile--small" flipped={flipped}>
            <div className="tile-center-logo" aria-hidden>
              <img src={'/assets/shopify/shopify_glyph_black.svg'} alt="Shopify" />
            </div>
          </Tile>
        )
      default:
        return <Tile key={n.id} title={n.title} color={n.color} flipped={flipped} />
    }
  })

  const renderTile = (t) => {
    if (t.id === 'm1') {
      return (
        <Tile key={t.id} color={t.color} className="tile--dashboard tile--large" style={{ gridColumn: '1 / span 2', gridRow: '2 / span 2' }} flipped={flipped} onActivate={onOpenAbout}>
          <div>
            <ReconstructWords words={["Namaste", "Hola", "Ciao", "Hello"]} />
            <div style={{ color: '#000', marginTop: 8, fontWeight: 400 }}>I’m Anubhav</div>
            <div id="description" style={{ marginTop: 8, color: '#222', fontWeight: 400, fontSize: '1.5rem' }}>
              Frontend Developer who turns ideas into clean and functional web interfaces.
            </div>
          </div>
        </Tile>
      )
    }

    if (t.id === 't3') {
      return (
        <div key="right-nested" className="technical-stack" style={{ gridColumn: '3', gridRow: '2 / span 2' }}>
          {showLabels ? <div className="tech-heading" aria-hidden>Skill & Technologies</div> : null}
          <div className="nested-grid top-right">{renderNested(nested)}</div>
        </div>
      )
    }

    if (t.id === 't8') {
      return (
        <div key={t.id} className="social-media" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 'var(--tile-gap)', padding: 0, background: 'transparent' }}>
          <a key={`${t.id}-b-1`} href="https://www.threads.com/@code.anubhav" target="_blank" rel="noopener noreferrer" style={{ display: 'block', width: '100%', height: '100%' }}>
            <Tile color={'#ffffff'} className="tile--small tile--threads" style={{ background: '#ffffff', padding: '10%' }} flipped={flipped}>
              <div className="tile-center-logo" aria-hidden>
                <img src={'/assets/Socials/Threads_(app)_logo.svg'} alt="Threads" style={{ width: '50%', height: '50%', objectFit: 'contain' }} />
              </div>
            </Tile>
          </a>
          <a key={`${t.id}-b-2`} href="https://github.com/anubhavbaghel" target="_blank" rel="noopener noreferrer" style={{ display: 'block', width: '100%', height: '100%' }}>
            <Tile color={'#ffffff'} className="tile--small tile--github" style={{ background: '#ffffff', padding: 0 }} flipped={flipped}>
              <div className="tile-center-logo" aria-hidden>
                <img src={'/assets/Socials/GitHub_Invertocat_Black_Clearspace.svg'} alt="GitHub" style={{ width: '80%', height: '80%', objectFit: 'contain' }} />
              </div>
            </Tile>
          </a>
          <a key={`${t.id}-b-3`} href="https://www.linkedin.com/in/anubhav-baghel/" target="_blank" rel="noopener noreferrer" style={{ display: 'block', width: '100%', height: '100%' }}>
            <Tile color={'#ffffff'} className="tile--small tile--linkedin" style={{ background: '#ffffff', padding: '10%' }} flipped={flipped}>
              <div className="tile-center-logo" aria-hidden>
                <img src={'/assets/Socials/linkedin-svgrepo-com.svg'} alt="LinkedIn" style={{ width: '50%', height: '50%', objectFit: 'contain' }} />
              </div>
            </Tile>
          </a>
          <a key={`${t.id}-b-4`} href="mailto:code.anubhavbaghel@gmail.com" style={{ display: 'block', width: '100%', height: '100%' }}>
            <Tile color={'#ffffff'} className="tile--small" style={{ background: '#ffffff', padding: '10%' }} flipped={flipped}>
              <div className="tile-center-logo" aria-hidden>
                <img src={'/assets/Socials/Gmail_icon_(2020).svg'} alt="Gmail" style={{ width: '50%', height: '50%', objectFit: 'contain' }} />
              </div>
            </Tile>
          </a>
        </div>
      )
    }

    if (t.id === 't7') {
      return (
        <Tile key={t.id} title={'Projects'} subtitle={t.subtitle} color={t.color} className="tile--medium" flipped={flipped} onActivate={onOpenProjects}>
          <div className="tile-title" style={{ fontWeight: 400 }}>Projects</div>
          <button className="ms-arrow-ne" aria-label="Open external" type="button" onClick={(e) => e.stopPropagation()}>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M14 3h7v7" />
              <path d="M10 14L21 3" />
            </svg>
          </button>
        </Tile>
      )
    }

    if (t.id === 't9') {
      return (
        <Tile key={t.id} title={t.title} subtitle={t.subtitle} color={'#000000'} className="tile--small" flipped={flipped} style={{ gridColumn: '1', gridRow: '4' }}>
          <div className="tile-caption" style={{ marginTop: 8, fontWeight: 400, fontSize: '1.05rem', color: 'inherit', opacity: 0.95, fontStyle: 'italic' }}>
            "Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work."
            <div style={{ marginTop: 6, fontStyle: 'normal', fontWeight: 500 }}>— Steve Jobs</div>
          </div>
        </Tile>
      )
    }

    if (t.id === 't10') {
      return (
        <div key={t.id} style={{ gridColumn: '2', gridRow: '4', display: 'grid', gridTemplateRows: '1fr 1fr', gap: 'var(--tile-gap)', width: '100%', height: '100%' }}>
          <a href="/assets/Anubhav_Baghel_Resume.pdf" download="Anubhav_Baghel_Resume.pdf" style={{ display: 'block', width: '100%', height: '100%' }}>
            <Tile title={t.title} color={t.color} className="tile--small" flipped={flipped} style={{ height: '100%' }}>
              <div style={{ padding: 12 }}>
                <div className="tile-title" style={{ fontWeight: 400, fontSize: '2rem' }}>Resume</div>
              </div>
            </Tile>
          </a>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--tile-gap)', width: '100%', height: '100%' }}>
            <a href="tel:+919873181404" style={{ display: 'block', width: '100%', height: '100%' }}>
              <Tile title="Phone" color={'#111'} className="tile--small" flipped={flipped} style={{ height: '100%' }}>
                <div style={{ padding: 12 }}>
                  <div className="tile-title" style={{ fontWeight: 400, fontSize: '2rem' }}>Phone</div>
                </div>
              </Tile>
            </a>

            <a href="mailto:code.anubhavbaghel@gmail.com" style={{ display: 'block', width: '100%', height: '100%' }}>
              <Tile title="Mail" color={'#111'} className="tile--small" flipped={flipped} style={{ height: '100%' }}>
                <div style={{ padding: 12 }}>
                  <div className="tile-title" style={{ fontWeight: 400, fontSize: '2rem' }}>Mail</div>
                </div>
              </Tile>
            </a>
          </div>
        </div>
      )
    }

    return <Tile key={t.id} title={t.title} subtitle={t.subtitle} color={t.color} flipped={flipped} />
  }

  return (
    <section className="tiles-layout">
      {showLabels ? (
        <>
          <div className="tile-name">About Me</div>
          <div className="tile-name"></div>
          <div className="tile-name">Skills & Technologies</div>
          <div className="tile-name">Projects</div>
        </>
      ) : null}
      {tiles.map((t) => renderTile(t))}
    </section>
  )
}
