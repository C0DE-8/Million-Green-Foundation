import { useState } from 'react'
import { maskUrl } from './api/mask'
import './App.css'

function App() {
  const [url, setUrl] = useState('')
  const [maskedUrl, setMaskedUrl] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setMaskedUrl('')
    setIsSubmitting(true)

    try {
      const result = await maskUrl(url)
      setMaskedUrl(result.maskedUrl)
    } catch (err) {
      setError(err.response?.data?.error || 'Could not mask this URL')
    } finally {
      setIsSubmitting(false)
    }
  }

  async function copyMaskedUrl() {
    if (!maskedUrl) return
    await navigator.clipboard.writeText(maskedUrl)
  }

  return (
    <main className="app-shell">
      <section className="masker-panel">
        <div className="heading">
          <p>URL Masker</p>
          <h1>Change a URL to your base URL</h1>
        </div>

        <form className="masker-form" onSubmit={handleSubmit}>
          <label htmlFor="url">URL to mask</label>
          <div className="input-row">
            <input
              id="url"
              name="url"
              type="url"
              value={url}
              placeholder="http://localhost:5174/"
              onChange={(event) => setUrl(event.target.value)}
              required
            />
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Masking...' : 'Mask URL'}
            </button>
          </div>
        </form>

        {error && <p className="message error">{error}</p>}

        {maskedUrl && (
          <div className="result">
            <span>Masked URL</span>
            <a href={maskedUrl} target="_blank" rel="noreferrer">
              {maskedUrl}
            </a>
            <button type="button" onClick={copyMaskedUrl}>
              Copy
            </button>
          </div>
        )}
      </section>
    </main>
  )
}

export default App
