import { FaUserShield } from 'react-icons/fa'
import InfoPage from '../components/InfoPage'
import Shell from '../components/Shell'

function Terms() {
  return (
    <Shell activePage="terms">
      <InfoPage page="terms" icon={<FaUserShield />} title="Terms of Use">
        <p>
          Million Green Foundation is a community growth and financial empowerment program. By using it, visitors
          agree to use the site lawfully, register with accurate details and avoid misleading or abusive referral activity.
        </p>
        <p>
          Rewards are not automatic. Points, referrals and participation may increase eligibility, but all rewards are
          subject to verification, available program funds, fraud checks and the current program rules.
        </p>
        <p>
          We may update these terms as the project changes. Continued use means you accept the current version.
        </p>
      </InfoPage>
    </Shell>
  )
}

export default Terms
