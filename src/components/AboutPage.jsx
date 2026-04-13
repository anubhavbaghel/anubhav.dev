import React from 'react'

export default function AboutPage({ onClose }) {
  return (
    <div className="about-page" role="dialog" aria-modal="true">
      <button className="about-page__close" aria-label="Close about" onClick={onClose}>✕</button>
      <h1 className="about-page__heading">About</h1>
      <div className="about-page__content">Frontend Developer who turns ideas into clean and functional web interfaces.</div>
    </div>
  )
}
