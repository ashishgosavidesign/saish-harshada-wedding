import { useState } from 'react'
import { useLocale } from '../invitation-v1/LocaleContext'
import CoupleNames from './components/CoupleNames'
import InvitationArtwork from './components/InvitationArtwork'
import InvitationMessage from './components/InvitationMessage'
import LanguageToggle from './components/LanguageToggle'
import HowToReach from './components/HowToReach'
import InvitationActions from './components/InvitationActions'
import Venue from './components/Venue'
import WeddingDate from './components/WeddingDate'
import './invitation-v2.css'

function InvitationV2Inner() {
  const { locale } = useLocale()
  const [page, setPage] = useState('invite')

  if (page === 'reach') {
    return (
      <div className={`invitation-site invitation-site--page invitation-site--${locale}`}>
        <HowToReach onBack={() => setPage('invite')} />
      </div>
    )
  }

  return (
    <div className={`invitation-site invitation-site--${locale}`}>
      <article className={`invitation invitation--${locale}`}>
        <div className="invitation__card">
          <LanguageToggle />
          <InvitationArtwork />

          <div className="invitation__canvas">
            <InvitationMessage />
            <CoupleNames />
            <WeddingDate />
            <Venue />
            <InvitationActions onOpenReach={() => setPage('reach')} />
          </div>
        </div>
      </article>
    </div>
  )
}

function InvitationV2() {
  return <InvitationV2Inner />
}

export default InvitationV2
