import { LocaleProvider } from './invitation-v1/LocaleContext'
import InvitationV2 from './invitation-v2/InvitationV2'
import BackgroundMusic from './invitation-v2/components/BackgroundMusic'

function App() {
  return (
    <LocaleProvider>
      <BackgroundMusic />
      <InvitationV2 />
    </LocaleProvider>
  )
}

export default App
