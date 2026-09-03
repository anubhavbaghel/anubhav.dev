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
      title: 'Google – Solution Challenge',
      issuer: 'Google / Hack2skill',
      year: '2026',
      url: 'https://certificate.hack2skill.com/verify/2026H2S07SCBWAI-PS02140',
    },
    {
      title: 'Hack2skill – PromptWars: Virtual Challenge 3',
      issuer: 'Hack2skill',
      year: '2026',
      url: 'https://certificate.hack2skill.com/verify/2026H2S06PWVCHL3-A00601',
    },
    {
      title: 'GitHub Foundations',
      issuer: 'DataCamp',
      year: '2026',
      url: 'https://www.datacamp.com/completed/statement-of-accomplishment/track/f868408724fb10af808611b17f96ab1f47d22b70?utm_medium=organic_social&utm_campaign=sharewidget&utm_content=soa',
    },
    {
      title: 'Advanced React',
      issuer: 'Meta / Coursera',
      year: '2026',
      url: 'https://coursera.org/share/2f580a97078e7c9c625336d2fd8629b0',
    },
    {
      title: 'React Basics, Programming with JavaScript, Introduction to Front-End Development',
      issuer: 'Meta / Coursera',
      year: '2025',
      url: 'https://coursera.org/share/661cf40c4d971027907e9b3374d8f6c5',
    },
    {
      title: 'Foundations: Data, Data Everywhere',
      issuer: 'Google / Coursera',
      year: '2025',
      url: 'https://coursera.org/share/12821590d1c6903cb03921213b23638a',
    },
    {
      title: 'React Basics',
      issuer: 'Meta / Coursera',
      year: '2025',
      url: 'https://coursera.org/share/38641a68d966801572653d41caeac6fa',
    },
    {
      title: 'Programming with JavaScript',
      issuer: 'Meta / Coursera',
      year: '2025',
      url: 'https://coursera.org/share/661cf40c4d971027907e9b3374d8f6c5',
    },
    {
      title: 'Introduction to Front-End Development',
      issuer: 'Meta / Coursera',
      year: '2025',
      url: 'https://coursera.org/share/ccf8faae8342d65411d4e3bc4a8ef8f7',
    },
  ]

  return (
    <div className="certifications-page" role="main">
      <div className="certifications-page__inner">
        <div className="certifications-page__header">
          <button aria-label="Back home" onClick={goHome} className="certifications-page__close">
            <span aria-hidden="true">←</span> Home
          </button>
          <div>
            <h1 className="certifications-page__title">Certifications & Challenges</h1>
            <p className="certifications-page__subtitle">Verified credentials, hackathons and certificates</p>
          </div>
        </div>

        <div className="certifications-page__content">
          {items.map((item, index) => (
            <div key={index} className="certifications-page__item">
              <div className="certifications-page__item-info">
                <div className="certifications-page__item-title">{item.title}</div>
                <div className="certifications-page__item-meta">
                  <span className="certifications-page__item-issuer">— {item.issuer}</span>
                  {item.year && <span className="certifications-page__item-year">({item.year})</span>}
                </div>
              </div>
              {item.url ? (
                <a className="certifications-page__verify" href={item.url} target="_blank" rel="noopener noreferrer">
                  Verify Certificate
                </a>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
