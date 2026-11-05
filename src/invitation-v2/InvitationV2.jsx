import { LocaleProvider, useLocale } from '../invitation-v1/LocaleContext'
import CoupleNames from './components/CoupleNames'
import InvitationArtwork from './components/InvitationArtwork'
import InvitationMessage from './components/InvitationMessage'
import LanguageToggle from './components/LanguageToggle'
import RsvpButton from './components/RsvpButton'
import Venue from './components/Venue'
import WeddingDate from './components/WeddingDate'
import './invitation-v2.css'

function InvitationV2Inner() {
  const { locale } = useLocale()

  return (
    <article className={`invitation invitation--${locale}`}>
      <div className="invitation__card">
        <LanguageToggle />
        <InvitationArtwork />

        <div className="invitation__canvas">
          <InvitationMessage />
          <CoupleNames />
          <WeddingDate />
          <Venue />
          <RsvpButton />
        </div>
      </div>
    </article>
  )
}

function InvitationV2() {
  return (
    <LocaleProvider>
      <InvitationV2Inner />
    </LocaleProvider>
  )
}

export default InvitationV2
