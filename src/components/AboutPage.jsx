import React from 'react'

export default function AboutPage({ onClose }) {
  return (
    <div className="about-page" role="dialog" aria-modal="true">
      <button className="about-page__close" aria-label="Close about" onClick={onClose}>✕</button>
      <h1 className="about-page__heading">About</h1>
      <div className="about-page__content">
          <p>I don’t just build websites—I build experiences.</p>

          <p>What started as curiosity quickly turned into obsession. The more I explored frontend development, the more I realized it’s not just about making things work, it’s about how they feel. A fast interface, a smooth interaction, a clean layout—these aren’t small details to me, they’re the difference between something being usable and something being memorable.</p>

          <p>I’m driven by the idea of turning complex problems into simple, elegant solutions. I enjoy working at the intersection of design and development, where logic meets creativity, and every decision shapes the user’s experience. I care deeply about precision, performance, and polish—because good products aren’t just built, they’re crafted.</p>

          <p>I focus on building real-world products that push my limits and sharpen my thinking. For me, growth comes from creating, refining, and constantly questioning how things can be better.</p>

          <p>I’m also deeply curious about the future of the web—especially how AI is changing the way we build and interact with technology. I don’t just want to keep up with it, I want to understand it and use it to create smarter, more meaningful experiences.</p>

          <p>I’m not here to just write code. I’m here to build things that people actually connect with.</p>
      </div>
    </div>
  )
}
