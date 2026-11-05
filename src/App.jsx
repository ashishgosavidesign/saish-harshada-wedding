import { LocaleProvider } from './invitation-v1/LocaleContext'
import InvitationV2 from './invitation-v2/InvitationV2'

function App() {
  return (
    <LocaleProvider>
      <InvitationV2 />
    </LocaleProvider>
  )
}

export default App
