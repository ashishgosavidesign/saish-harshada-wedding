import { RSVP_FORM_URL } from '../../config'
import { useLocale } from '../../invitation-v1/LocaleContext'

function RsvpButton() {
  const { t } = useLocale()

  return (
    <a
      className="rsvp-button"
      href={RSVP_FORM_URL}
      target="_blank"
      rel="noopener noreferrer"
    >
      {t.rsvp}
    </a>
  )
}

export default RsvpButton
