import React, { useEffect, useRef, useState } from "react";

const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function randomChar() {
  return CHARSET[Math.floor(Math.random() * CHARSET.length)];
}

export default function ReconstructWords({ words = ["Namaste", "Hola", "Ciao", "Hello"], interval = 2500, className = "reconstruct" }) {
  const [display, setDisplay] = useState(words[0]);
  const indexRef = useRef(0);
  const rafRef = useRef(null);

  useEffect(() => {
    let mounted = true

    function animateTo(next) {
      const from = display
      const to = next
      const maxLen = Math.max(from.length, to.length)
      const start = performance.now()
      const duration = 900 // ms total for a gentler reconstruct

      // reveal characters sequentially from left to right
      function step(now) {
        const elapsed = Math.min(duration, now - start)
        const progress = elapsed / duration
        // number of chars to reveal so far (0..maxLen)
        const revealCount = Math.floor(progress * maxLen)

        let out = ''
        for (let i = 0; i < maxLen; i++) {
          if (i < revealCount) {
            out += to[i] || ''
          } else {
            // keep showing source char where available, otherwise show target slowly as placeholder
            out += from[i] ?? (to[i] ?? '')
          }
        }

        if (mounted) setDisplay(out)

        if (elapsed < duration) rafRef.current = requestAnimationFrame(step)
        else if (mounted) setDisplay(to)
      }

      rafRef.current = requestAnimationFrame(step)
    }

    function tick() {
      const nextIndex = (indexRef.current + 1) % words.length
      indexRef.current = nextIndex
      animateTo(words[nextIndex])
    }

    const id = setInterval(tick, interval)
    const startTimeout = setTimeout(() => tick(), 800)

    return () => {
      mounted = false
      clearInterval(id)
      clearTimeout(startTimeout)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [words, interval])

  return (
    <div className={className} aria-live="polite">
      {display}
    </div>
  );
}
