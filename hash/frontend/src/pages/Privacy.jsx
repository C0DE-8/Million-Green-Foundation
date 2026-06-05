import { FaShieldAlt } from 'react-icons/fa'
import InfoPage from '../components/InfoPage'
import Shell from '../components/Shell'

function Privacy() {
  return (
    <Shell activePage="privacy">
      <InfoPage page="privacy" icon={<FaShieldAlt />} title="Privacy Policy">
        <p>
          This frontend does not require an account. The hash path generator is used to change the browser path
          and does not need personal data.
        </p>
        <p>
          If future forms are added, only necessary information should be requested, and visitors should be told
          how that information will be used before submitting it.
        </p>
        <p>
          OPay may be used as a payout channel for approved rewards. Do not submit OPay passwords, card PINs, OTPs
          or private credentials through this site.
        </p>
      </InfoPage>
    </Shell>
  )
}

export default Privacy
