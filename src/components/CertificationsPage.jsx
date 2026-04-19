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
    {
      title: 'Advanced React',
      issuer: 'Coursera',
      url: 'https://coursera.org/share/2f580a97078e7c9c625336d2fd8629b0',
    },
    {
      title: 'Foundations: Data, Data Everywhere',
      issuer: 'Coursera',
      url: 'https://coursera.org/share/12821590d1c6903cb03921213b23638a',
    },
    { title: 'React Basics', issuer: 'Coursera', url: 'https://coursera.org/share/38641a68d966801572653d41caeac6fa' },
    { title: 'Programming with JavaScript', issuer: 'Coursera', url: 'https://coursera.org/share/661cf40c4d971027907e9b3374d8f6c5' },
    { title: 'Introduction to Front-End Development', issuer: 'Coursera', url: 'https://coursera.org/share/ccf8faae8342d65411d4e3bc4a8ef8f7' },
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
            <div key={item.title} className="certifications-page__item">
              <div className="certifications-page__item-title">{item.title}</div>
              <div className="certifications-page__item-issuer">— {item.issuer}</div>
              {item.url ? (
                <a className="certifications-page__verify" href={item.url} target="_blank" rel="noopener noreferrer">Verify</a>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
