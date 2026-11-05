import { useLocale } from '../../invitation-v1/LocaleContext'

function CoupleNames() {
  const { t } = useLocale()

  return (
    <h1 className="couple-names">
      <span className="couple-names__name">{t.names.first}</span>
      <span className="couple-names__ampersand">{t.names.conjunction}</span>
      <span className="couple-names__name">{t.names.second}</span>
    </h1>
  )
}

export default CoupleNames
