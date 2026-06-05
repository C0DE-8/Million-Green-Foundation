import { FaExclamationTriangle } from 'react-icons/fa'
import InfoPage from '../components/InfoPage'
import Shell from '../components/Shell'

function Disclaimer() {
  return (
    <Shell activePage="disclaimer">
      <InfoPage page="disclaimer" icon={<FaExclamationTriangle />} title="Disclaimer">
        <p>
          Million Green Foundation is independent. OPay is referenced only as a possible payout channel for approved
          beneficiaries. This site is not owned, operated or endorsed by OPay.
        </p>
        <p>
          Nobody is forced to use this project. Participation is voluntary, and reward amounts depend on eligibility,
          verification, referral activity, program rules and available funds.
        </p>
        <p>
          Always verify program instructions and payout details before acting. Never share OTPs, passwords or private
          wallet credentials with anyone claiming to process a reward.
        </p>
      </InfoPage>
    </Shell>
  )
}

export default Disclaimer
