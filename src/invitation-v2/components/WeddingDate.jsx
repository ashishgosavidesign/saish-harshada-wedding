import { useLocale } from '../../invitation-v1/LocaleContext'

function WeddingDate() {
  const { t } = useLocale()

  return (
    <p className="wedding-date">
      <time dateTime={t.date.dateTime}>
        {t.date.weekday}
        <span className="wedding-date__sep" aria-hidden="true">
          |
        </span>
        {t.date.date}
        <span className="wedding-date__sep" aria-hidden="true">
          |
        </span>
        {t.date.time}
      </time>
    </p>
  )
}

export default WeddingDate
