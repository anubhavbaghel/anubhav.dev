import React, { useEffect, useRef, useState } from 'react'

export default function WelcomeScreen({ autoDismissMs = 5000, onFinish }) {
  const [visible, setVisible] = useState(true)
  const [now, setNow] = useState(new Date())
  const [bg, setBg] = useState(null)
  const [temp, setTemp] = useState(null)
  const finishedRef = useRef(false)
  const timersRef = useRef({})
  const slideMs = 700

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  // greetings removed — no rotating greeting text

  useEffect(() => {
    let mounted = true

    // try fetching Bing wallpaper (fallback to local asset)
    fetch('https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=en-US')
      .then(r => r.json())
      .then(data => {
        if (!mounted) return
        const url = data?.images?.[0]?.url
        if (url) setBg(`https://www.bing.com${url}`)
      })
      .catch(() => {
        if (!mounted) return
        setBg('/assets/bing/OHR.SpaceTrails_EN-US8009082939_1920x1080.jpg.jpg')
      })

    // Do NOT request user's location. Use a randomized temperature value for display.
    if (mounted) {
      const min = 16
      const max = 32
      const rand = Math.round(Math.random() * (max - min) + min)
      setTemp(rand)
    }

    return () => { mounted = false }
  }, [])

  useEffect(() => {
    timersRef.current.startSlide = setTimeout(() => setVisible(false), autoDismissMs)
    timersRef.current.finish = setTimeout(() => {
      if (finishedRef.current) return
      finishedRef.current = true
      onFinish && onFinish()
    }, autoDismissMs + slideMs)
    return () => {
      clearTimeout(timersRef.current.startSlide)
      clearTimeout(timersRef.current.finish)
    }
  }, [autoDismissMs, onFinish])

  const startDismiss = () => {
    if (!visible) return
    setVisible(false)
    if (timersRef.current.startSlide) clearTimeout(timersRef.current.startSlide)
    if (!finishedRef.current) {
      finishedRef.current = true
      timersRef.current.finish = setTimeout(() => onFinish && onFinish(), slideMs)
    }
  }

  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  const dayStr = now.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })

  const greeting = 'Welcome'

  const bgStyle = bg ? { backgroundImage: `url(${bg})` } : {}

  return (
    <div
      className={`welcome-screen ${visible ? 'is-visible' : 'is-hidden'}`}
      style={bgStyle}
      role="dialog"
      aria-label="Welcome"
      onClick={startDismiss}
    >
      <div className="welcome-overlay" />
      <div className="welcome-center" onClick={(e) => { e.stopPropagation(); startDismiss(); }} role="button" aria-label="Winking smiley. Click to continue.">
        <div className="smiley" aria-hidden="true" style={{ alignSelf: 'flex-end' }}>
          <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true">
            {/* no filled background per request; only facial features */}
            <g className="face" fill="none" stroke="none">
              <circle className="face-outline" cx="60" cy="60" r="54" fill="none" />
              <circle className="eye left" cx="44" cy="50" r="6" fill="#fff" />
              <circle className="eye right" cx="76" cy="50" r="6" fill="#fff" />
              <path className="wink-line" d="M70 50c6 0 10 0 14 0" stroke="#fff" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0" />
              <path className="mouth" d="M42 78c12 10 26 10 36 0" stroke="#fff" strokeWidth="5" strokeLinecap="round" fill="none" />
            </g>
          </svg>
        </div>
      </div>
      <div className="welcome-inner" onClick={(e) => e.stopPropagation()}>
        <div className="welcome-left">
          <div className="welcome-time">{timeStr}</div>
          <div className="welcome-day">{dayStr}</div>
        </div>
        <div className="welcome-right">
          <div className="welcome-greeting">{greeting}</div>
          <div className="welcome-temp">{temp !== null ? `${temp}°C` : '—'}</div>
        </div>
      </div>
    </div>
  )
}
