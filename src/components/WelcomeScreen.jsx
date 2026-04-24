import React, { useEffect, useState } from 'react'

const GREETINGS = [
  'Hello',
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
    // slide duration should match CSS (700ms) so we unmount after slide ends
    const slideMs = 700
    // start sliding up after autoDismissMs (i.e., show for autoDismissMs), then unmount after slideMs
    const timeoutStartSlide = setTimeout(() => setVisible(false), autoDismissMs)
    const timeoutFinish = setTimeout(() => onFinish && onFinish(), autoDismissMs + slideMs)

    return () => {
      clearInterval(cycle)
      clearTimeout(timeoutStartSlide)
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
