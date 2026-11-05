import { useLocale } from '../../invitation-v1/LocaleContext'

function InvitationMessage() {
  const { t } = useLocale()

  return (
    <header className="invitation-message">
      <p className="invitation-message__text">
        <span className="invitation-message__line invitation-message__line--nowrap">
          {t.message.line1}
        </span>
        <br />
        <span className="invitation-message__line">{t.message.line2}</span>
        <br />
        <span className="invitation-message__line">{t.message.line3}</span>
      </p>
    </header>
  )
}

export default InvitationMessage
