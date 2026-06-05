import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import { getPageFromHashPath } from './utils/hashRoutes'
import Home from './pages/Home'
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'
import Disclaimer from './pages/Disclaimer'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/disclaimer" element={<Disclaimer />} />
      <Route path="*" element={<HashOrNotFound />} />
    </Routes>
  )
}

function HashOrNotFound() {
  const { pathname } = useLocation()
  const page = getPageFromHashPath(pathname)

  if (page === 'home') {
    return <Home preservePath />
  }

  if (page === 'terms') {
    return <Terms />
  }

  if (page === 'privacy') {
    return <Privacy />
  }

  if (page === 'disclaimer') {
    return <Disclaimer />
  }

  return <NotFound />
}

export default App
