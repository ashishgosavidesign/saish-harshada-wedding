import { useLocale } from '../../invitation-v1/LocaleContext'

function Venue() {
  const { t } = useLocale()

  return (
    <address className="venue">
      <p className="venue__name">{t.venue.name}</p>
      <p className="venue__line">{t.venue.line2}</p>
      <p className="venue__line">{t.venue.line3}</p>
    </address>
  )
}

export default Venue
