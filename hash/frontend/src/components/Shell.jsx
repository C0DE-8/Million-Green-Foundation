import { Link, useNavigate } from 'react-router-dom'
import { FaTint } from 'react-icons/fa'
import { getHashPath } from '../api/hash'
import { directPagePaths, pageLabels } from '../constants/pages'

function Shell({ activePage = 'home', children }) {
  const navigate = useNavigate()

  async function goToPage(page) {
    try {
      const result = await getHashPath(page)
      window.history.pushState(null, '', result.path)
      navigate(result.path, { replace: true })
    } catch {
      navigate(directPagePaths[page])
    }
  }

  return (
    <div className="site-shell">
      <header className="topbar">
        <Link className="brand" to="/" onClick={(event) => {
          event.preventDefault()
          goToPage('home')
        }}>
          <span className="brand-mark"><FaTint /></span>
          <span>
            <strong>Million Green Foundation</strong>
            <small>Financial empowerment community</small>
          </span>
        </Link>
        <nav>
          {Object.entries(pageLabels).map(([page, label]) => (
            <button
              key={page}
              type="button"
              className={page === activePage ? 'active' : ''}
              onClick={() => goToPage(page)}
            >
              {label}
            </button>
          ))}
        </nav>
      </header>
      {children}
      <footer>
        <span>Million Green Foundation rewards are subject to eligibility, verification and program rules.</span>
        <button type="button" onClick={() => goToPage('disclaimer')}>Read disclaimer</button>
      </footer>
    </div>
  )
}

export default Shell
