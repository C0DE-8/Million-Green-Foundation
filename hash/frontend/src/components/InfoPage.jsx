import { useEffect, useState } from 'react'
import { getHashPath } from '../api/hash'
import { getPageFromHashPath } from '../utils/hashRoutes'

function InfoPage({ page, icon, title, children }) {
  const [error, setError] = useState('')

  useEffect(() => {
    if (!page || getPageFromHashPath(window.location.pathname)) {
      return
    }

    getHashPath(page)
      .then((result) => {
        window.history.replaceState(null, '', result.path)
      })
      .catch((err) => setError(err.message))
  }, [page])

  return (
    <main className="info-page">
      <section className="info-card">
        <div className="info-icon">{icon}</div>
        <h1>{title}</h1>
        <div className="info-content">{children}</div>
        {error && <p className="error">{error}</p>}
      </section>
    </main>
  )
}

export default InfoPage
