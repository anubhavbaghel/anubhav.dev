import React from 'react'

export default function CertificationsPage({ onClose }) {
  const goHome = () => {
    if (typeof onClose === 'function') {
      onClose()
      return
    }
    if (typeof window !== 'undefined') window.location.hash = ''
  }

  const items = [
    'Advanced React — Coursera',
    'React Basics — Coursera',
    'Programming with JavaScript — Coursera',
    'Introduction to Front-End Development — Coursera',
  ]

  return (
    <div className="certifications-page" role="main">
      <div className="certifications-page__inner">
        <div className="certifications-page__header">
          <button aria-label="Back home" onClick={goHome} className="certifications-page__close">←</button>
          <h1 className="certifications-page__title">Certifications and Achievements</h1>
        </div>

        <div className="certifications-page__content">
          {items.map((item) => (
            <div key={item} className="certifications-page__item">{item}</div>
          ))}
        </div>
      </div>
    </div>
  )
}
