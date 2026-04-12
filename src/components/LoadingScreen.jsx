import React, { useEffect, useState } from 'react'

export default function LoadingScreen({ minMs = 800 }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const hide = () => setTimeout(() => setVisible(false), minMs)

    if (document.readyState === 'complete') {
      hide()
      return
    }

    window.addEventListener('load', hide)
    return () => window.removeEventListener('load', hide)
  }, [minMs])

  if (!visible) return null

  return (
    <div className="win8-loader" role="status" aria-label="Loading">
      <div className="win8-box">
          <div className="win8-message" aria-hidden>Hang On</div>
          <div className="win8-spinner" aria-hidden>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
        </div>
        <div className="win8-text">Loading</div>
      </div>
    </div>
  )
}
