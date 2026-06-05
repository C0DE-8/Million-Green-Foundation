import { useEffect, useState } from 'react'
import {
  FaArrowRight,
  FaCheckCircle,
  FaHandHoldingHeart,
  FaMobileAlt,
  FaShieldAlt,
} from 'react-icons/fa'
import { getHashPath } from '../api/hash'
import Shell from '../components/Shell'
import { programSteps, slides, sourceCards, trustItems } from '../constants/home'

function Home({ preservePath = false }) {
  const [error, setError] = useState('')
  const [slideIndex, setSlideIndex] = useState(0)
  const [downloadMessage, setDownloadMessage] = useState('')

  async function applyNewHashPath() {
    setError('')

    try {
      const result = await getHashPath('home')
      window.history.replaceState(null, '', result.path)
    } catch (err) {
      setError(err.message)
    }
  }

  useEffect(() => {
    if (!preservePath && window.location.pathname === '/') {
      getHashPath('home')
        .then((result) => {
          window.history.replaceState(null, '', result.path)
        })
        .catch((err) => setError(err.message))
    }
  }, [preservePath])

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSlideIndex((index) => (index + 1) % slides.length)
    }, 4200)

    return () => window.clearInterval(timer)
  }, [])

  const activeSlide = slides[slideIndex]

  return (
    <Shell activePage="home">
      <main>
        <section className="hero-section">
          <div className="hero-copy">
            <p className="eyebrow">Turning shares into opportunities</p>
            <h1>Join the Million Green community and grow your reward chances.</h1>
            <p className="hero-text">
              Million Green Foundation is a community-driven initiative dedicated to empowering people through
              financial support and opportunity. Eligible users can receive rewards of up to ₦500,000 through
              our referral and community growth program.
            </p>
            <div className="hero-actions">
              <button type="button" onClick={applyNewHashPath}>
                Refresh referral page <FaArrowRight />
              </button>
              <button
                type="button"
                className="secondary-btn"
                onClick={() => setDownloadMessage('APK download will be added after safety review and signing.')}
              >
                <FaMobileAlt /> Download APK
              </button>
            </div>
            {downloadMessage && <p className="notice">{downloadMessage}</p>}
            {error && <p className="error">{error}</p>}
          </div>

          <div className="hero-card">
            <div className="phone-frame">
              <div className="phone-top"></div>
              <div className="balance-card">
                <span>Available community pool</span>
                <strong>₦48,611,570</strong>
                <small>Rewards up to ₦500,000</small>
              </div>
              <div className="mini-row">
                <span><FaShieldAlt /> Verified users</span>
                <span><FaHandHoldingHeart /> OPay payout</span>
              </div>
            </div>
          </div>
        </section>

        <section className="slider-band">
          <div className="slider-copy">
            <p className="eyebrow">How it works</p>
            <h2>{activeSlide.title}</h2>
            <p>{activeSlide.body}</p>
          </div>
          <div className="slider-dots" aria-label="Slider controls">
            {slides.map((slide, index) => (
              <button
                key={slide.title}
                type="button"
                className={index === slideIndex ? 'active' : ''}
                onClick={() => setSlideIndex(index)}
                aria-label={`Show ${slide.title}`}
              />
            ))}
          </div>
        </section>

        <section className="source-grid">
          {sourceCards.map((card) => (
            <a key={card.label} href={card.href} target="_blank" rel="noreferrer" className="source-card">
              <span>{card.label}</span>
              <strong>{card.stat}</strong>
              <p>{card.text}</p>
            </a>
          ))}
        </section>

        <section className="steps-panel">
          <div>
            <p className="eyebrow">Join today</p>
            <h2>Become part of the Million Green community.</h2>
            <p>
              Our goal is to support thousands of individuals through financial empowerment, digital inclusion,
              and community engagement.
            </p>
          </div>
          <ol>
            {programSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>

        <section className="trust-panel">
          <div>
            <p className="eyebrow">Plain commitments</p>
            <h2>Community growth with clear reward rules.</h2>
          </div>
          <div className="trust-list">
            {trustItems.map(([title, text]) => (
              <div key={title}>
                <FaCheckCircle />
                <span>
                  <strong>{title}</strong>
                  <small>{text}</small>
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </Shell>
  )
}

export default Home
