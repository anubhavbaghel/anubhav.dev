import React, { useRef, useState } from 'react'

function hexToLuminance(hex) {
  const c = hex.replace('#', '')
  const r = parseInt(c.substring(0, 2), 16) / 255
  const g = parseInt(c.substring(2, 4), 16) / 255
  const b = parseInt(c.substring(4, 6), 16) / 255
  const a = [r, g, b].map((v) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)))
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2]
}

export default function Tile({ title, subtitle, color = '#444', size = 'small', image, hoverImage, style, children, className = '', flipped = false, onActivate }) {
  const ref = useRef(null)
  const [tilt, setTilt] = useState(null)

  const luminance = hexToLuminance(color)
  let textColor = luminance > 0.5 ? '#111' : '#fff'

  // Force white text for contact tiles (icon + label should be white on accent)
  if (typeof className === 'string' && className.indexOf('tile--contact') !== -1) {
    textColor = '#fff'
  }

  const handleClick = (e) => {
    if (flipped) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Decide tilt direction: left/right -> rotateY, top/bottom -> rotateX
    const horizontal = x < rect.width * 0.35 ? -1 : x > rect.width * 0.65 ? 1 : 0
    const vertical = y < rect.height * 0.35 ? -1 : y > rect.height * 0.65 ? 1 : 0

    if (horizontal !== 0) setTilt({ axis: 'y', dir: horizontal })
    else if (vertical !== 0) setTilt({ axis: 'x', dir: -vertical })
    else setTilt({ axis: 'y', dir: x < rect.width / 2 ? -1 : 1 })

    // call activation callback if provided
    if (typeof onActivate === 'function') onActivate(e)

    // reset after animation
    window.setTimeout(() => setTilt(null), 260)
  }

  const tiltStyle = tilt
    ? tilt.axis === 'y'
      ? { transform: `perspective(600px) rotateY(${tilt.dir * 8}deg)` }
      : { transform: `perspective(600px) rotateX(${tilt.dir * 8}deg)` }
    : {}

  return (
    <div
      ref={ref}
      className={`tile ${size} ${className} ${flipped ? 'flipped' : ''}`.trim()}
      onClick={handleClick}
      style={{ background: color, color: textColor, ...(typeof style === 'object' ? style : {}), ...(!flipped ? tiltStyle : {}) }}
    >
      <div className="tile-face tile-face--front" aria-hidden>
        {image ? (
          <div className="tile-image" style={{ backgroundImage: `url(${image})` }} />
        ) : null}

        {hoverImage ? (
          <div className="tile-image-hover" style={{ backgroundImage: `url(${hoverImage})` }} />
        ) : null}

        <div className="tile-icon" aria-hidden>
        </div>
        {children ? <div className="tile-content">{children}</div> : null}
      </div>

      <div className="tile-face tile-face--back" aria-hidden>
        {/* black backface - intentionally empty to show black page */}
      </div>
    </div>
  )
}
