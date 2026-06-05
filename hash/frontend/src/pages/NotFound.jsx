import { Link } from 'react-router-dom'
import { FaExclamationTriangle } from 'react-icons/fa'
import InfoPage from '../components/InfoPage'
import Shell from '../components/Shell'

function NotFound() {
  return (
    <Shell activePage="">
      <InfoPage icon={<FaExclamationTriangle />} title="Page not found">
        <p>The page you opened does not exist. Generated page paths contain `/server/` and `/page/` segments.</p>
        <Link className="inline-action" to="/">Return home</Link>
      </InfoPage>
    </Shell>
  )
}

export default NotFound
