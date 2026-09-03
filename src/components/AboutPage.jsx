import React, { useState } from 'react'

export default function AboutPage({ onClose }) {
  const [activeTab, setActiveTab] = useState('all')

  const experiences = [
    {
      company: 'Adaan Digital Solutions',
      role: 'SaaS Web Builder Intern',
      period: 'June 2026 – Present',
      points: [
        'Contributed to 60+ client websites, implementing requirements across page layouts, content, images and responsive behaviour.',
        'Build and maintain websites using Wix, Wix CMS and WordPress, handling UI implementation, content updates, responsive layouts, accessibility, SEO and QA.',
        'Translate project requirements and UI/UX references into production-ready website pages across desktop, tablet and mobile.',
        'Troubleshoot layout and functional issues using browser developer tools and perform responsive and cross-browser testing.'
      ]
    },
    {
      company: 'DI Infotech Leaders Pvt. Ltd.',
      role: 'WordPress Intern',
      period: 'Jan 2026 – May 2026',
      points: [
        'Developed and delivered 10+ websites using WordPress and custom web development, covering UI/UX implementation, responsive development, testing and delivery.',
        'Built and customised WordPress websites and custom components from designer wireframes, maintaining responsive layouts, UI/UX consistency and performance.',
        'Worked on forms, SMTP integration, SEO and Core Web Vitals, while identifying and resolving UI and functional issues.',
        'Used HTML, CSS and JavaScript to customise WordPress websites and build custom web interfaces.'
      ]
    }
  ]

  const skillCategories = [
    {
      category: 'Web Development',
      skills: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Responsive Web Development', 'Web Components']
    },
    {
      category: 'CMS & Platforms',
      skills: ['WordPress', 'Wix', 'Wix CMS', 'Website Building', 'Website Maintenance']
    },
    {
      category: 'Tools & Backend',
      skills: ['Git', 'GitHub', 'MongoDB', 'REST APIs', 'SMTP Integration', 'Browser DevTools']
    },
    {
      category: 'Design & Quality',
      skills: ['UI/UX Implementation', 'Design-to-Code', 'Responsive Design', 'Accessibility', 'SEO', 'QA Testing', 'Performance Optimisation', 'Cross-Browser Compatibility']
    },
    {
      category: 'AI & Automation',
      skills: ['AI-assisted Development', 'Prompt Engineering', 'AI-assisted Design']
    }
  ]

  return (
    <div className="about-page" role="dialog" aria-modal="true">
      <div className="about-page__inner">
        <div className="about-page__header">
          <button className="about-page__close" aria-label="Close about" onClick={onClose}>
            <span aria-hidden="true">←</span> Home
          </button>
          <div>
            <h1 className="about-page__heading">About Me</h1>
            <p className="about-page__subheading">Web Developer &bull; WordPress &bull; React &bull; Next.js</p>
          </div>
        </div>

        <div className="about-page__tabs">
          <button 
            className={`about-page__tab ${activeTab === 'all' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            Overview
          </button>
          <button 
            className={`about-page__tab ${activeTab === 'story' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('story')}
          >
            Philosophy & Story
          </button>
          <button 
            className={`about-page__tab ${activeTab === 'experience' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('experience')}
          >
            Experience
          </button>
          <button 
            className={`about-page__tab ${activeTab === 'skills' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('skills')}
          >
            Skills & Education
          </button>
        </div>

        <div className="about-page__grid">
          {/* Philosophy & Story Section */}
          {(activeTab === 'all' || activeTab === 'story') && (
            <div className="about-section about-card">
              <h2 className="about-section__title">Philosophy & Approach</h2>
              <div className="about-page__story">
                <p>I don’t just build websites—I build experiences.</p>
                <p>What started as curiosity quickly turned into obsession. The more I explored frontend development, the more I realized it’s not just about making things work, it’s about how they feel. A fast interface, a smooth interaction, a clean layout—these aren’t small details to me, they’re the difference between something being usable and something being memorable.</p>
                <p>I’m driven by the idea of turning complex problems into simple, elegant solutions. I enjoy working at the intersection of design and development, where logic meets creativity, and every decision shapes the user’s experience. I care deeply about precision, performance, and polish—because good products aren’t just built, they’re crafted.</p>
                <p>I focus on building real-world products that push my limits and sharpen my thinking. For me, growth comes from creating, refining, and constantly questioning how things can be better.</p>
                <p>I’m also deeply curious about the future of the web—especially how AI is changing the way we build and interact with technology. I don’t just want to keep up with it, I want to understand it and use it to create smarter, more meaningful experiences.</p>
                <p>I’m not here to just write code. I’m here to build things that people actually connect with.</p>
              </div>
            </div>
          )}

          {/* Profile & Professional Experience */}
          {(activeTab === 'all' || activeTab === 'experience') && (
            <div className="about-section about-card">
              <h2 className="about-section__title">Professional Profile</h2>
              <p className="about-profile__text">
                Web Developer with hands-on experience building, maintaining and delivering websites using <strong>WordPress, Wix, HTML, CSS, JavaScript, React and Next.js</strong>. Experienced in responsive implementation, UI/UX development, website maintenance, troubleshooting, accessibility, SEO and QA. Currently contributing to <strong>60+ client websites</strong> and seeking a full-time Web Developer role.
              </p>

              <h2 className="about-section__title" style={{ marginTop: '32px' }}>Experience</h2>
              <div className="experience-timeline">
                {experiences.map((exp, index) => (
                  <div key={index} className="experience-card">
                    <div className="experience-card__header">
                      <div>
                        <h3 className="experience-card__company">{exp.company}</h3>
                        <div className="experience-card__role">{exp.role}</div>
                      </div>
                      <span className="experience-card__period">{exp.period}</span>
                    </div>
                    <ul className="experience-card__list">
                      {exp.points.map((pt, pIdx) => (
                        <li key={pIdx}>{pt}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills & Education */}
          {(activeTab === 'all' || activeTab === 'skills') && (
            <div className="about-section about-card">
              <h2 className="about-section__title">Technical Skills</h2>
              <div className="skills-container">
                {skillCategories.map((cat, idx) => (
                  <div key={idx} className="skill-category">
                    <h3 className="skill-category__title">{cat.category}</h3>
                    <div className="skill-tags">
                      {cat.skills.map((skill, sIdx) => (
                        <span key={sIdx} className="skill-tag">{skill}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <h2 className="about-section__title" style={{ marginTop: '32px' }}>Education</h2>
              <div className="education-card">
                <div className="education-card__header">
                  <div>
                    <h3 className="education-card__degree">Bachelor of Computer Applications (BCA)</h3>
                    <div className="education-card__institution">Indira Gandhi National Open University (IGNOU), Delhi</div>
                  </div>
                  <span className="education-card__period">2026 – 2029</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
