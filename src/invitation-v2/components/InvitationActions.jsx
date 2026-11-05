import { RSVP_FORM_URL } from '../../config'
import { useLocale } from '../../invitation-v1/LocaleContext'

function InvitationActions({ onOpenReach }) {
  const { t } = useLocale()

  return (
    <div className="invite-actions">
      <a
        className="invite-btn"
        href={RSVP_FORM_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        {t.rsvp}
      </a>
      <button type="button" className="invite-btn" onClick={onOpenReach}>
        {t.howToReach}
      </button>
    </div>
  )
}

export default InvitationActions
