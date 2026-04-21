import React, { useEffect, useState } from 'react'

const GREETINGS = [
  'Helli',
  'नमस्ते',
  'Hola',
  '你好',
  'Bonjour',
  'Ciao',
  'Hallo',
  'Olá',
  'سلام',
  'こんにちは'
]

export default function WelcomeScreen({ autoDismissMs = 3000, cycleMs = 600, onFinish }) {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const cycle = setInterval(() => setIndex(i => (i + 1) % GREETINGS.length), cycleMs)
    // ensure the welcome screen is fully removed at autoDismissMs
    const fadeMs = 280
    const fadeStart = Math.max(0, autoDismissMs - fadeMs)
    const timeoutFade = setTimeout(() => setVisible(false), fadeStart)
    const timeoutFinish = setTimeout(() => onFinish && onFinish(), autoDismissMs)

    return () => {
      clearInterval(cycle)
      clearTimeout(timeoutFade)
      clearTimeout(timeoutFinish)
    }
  }, [autoDismissMs, cycleMs, onFinish])

  return (
    <div className={`welcome-screen ${visible ? 'is-visible' : 'is-hidden'}`} role="dialog" aria-label="Welcome">
      <div className="welcome-inner">
        <div className="welcome-text" aria-live="polite">{GREETINGS[index]}</div>
      </div>
    </div>
  )
}
