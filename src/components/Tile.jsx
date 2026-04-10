import React from 'react'

function hexToLuminance(hex) {
  const c = hex.replace('#', '')
  const r = parseInt(c.substring(0, 2), 16) / 255
  const g = parseInt(c.substring(2, 4), 16) / 255
  const b = parseInt(c.substring(4, 6), 16) / 255
  const a = [r, g, b].map((v) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)))
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2]
}

export default function Tile({ title, subtitle, color = '#444', size = 'small', image, hoverImage, style, children, className = '' }) {
  const luminance = hexToLuminance(color)
  const textColor = luminance > 0.5 ? '#111' : '#fff'

  return (
    <div className={`tile ${size} ${className}`.trim()} style={{ background: color, color: textColor, ...(typeof style === 'object' ? style : {}) }}>
      {image ? (
        <div className="tile-image" style={{ backgroundImage: `url(${image})` }} />
      ) : null}

      {hoverImage ? (
        <div className="tile-image-hover" style={{ backgroundImage: `url(${hoverImage})` }} />
      ) : null}

      <div className="tile-icon" aria-hidden>
        {/* placeholder icon - replace with SVG or image */}
      </div>
      {/* title/subtitle intentionally omitted — tiles show no text */}
      {children ? <div className="tile-content">{children}</div> : null}
    </div>
  )
}
