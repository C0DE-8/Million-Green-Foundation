import { useState } from 'react'
import { shortenUrl } from './api/links'
import './App.css'

function App() {
  const [url, setUrl] = useState('')
  const [shortLink, setShortLink] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setShortLink('')
    setIsSubmitting(true)

    try {
      const result = await shortenUrl(url)
      setShortLink(result.shortUrl)
    } catch (err) {
      setError(err.response?.data?.error || 'Could not shorten this URL')
    } finally {
      setIsSubmitting(false)
    }
  }

  async function copyShortLink() {
    if (!shortLink) return
    await navigator.clipboard.writeText(shortLink)
  }

  return (
    <main className="app-shell">
      <section className="shortener">
        <div className="heading">
          <p>Simple URL shortener</p>
          <h1>Make a short link</h1>
        </div>

        <form className="shortener-form" onSubmit={handleSubmit}>
          <label htmlFor="url">Long URL</label>
          <div className="input-row">
            <input
              id="url"
              name="url"
              type="url"
              value={url}
              placeholder="http://localhost:5173/"
              onChange={(event) => setUrl(event.target.value)}
              required
            />
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Shortening...' : 'Shorten'}
            </button>
          </div>
        </form>

        {error && <p className="message error">{error}</p>}

        {shortLink && (
          <div className="result">
            <span>Short URL</span>
            <a href={shortLink} target="_blank" rel="noreferrer">
              {shortLink}
            </a>
            <button type="button" onClick={copyShortLink}>
              Copy
            </button>
          </div>
        )}
      </section>
    </main>
  )
}

export default App
