import { useLocale } from '../../invitation-v1/LocaleContext'

function LanguageToggle() {
  const { locale, setLocale } = useLocale()

  return (
    <div className="lang-toggle" role="group" aria-label="Language">
      <button
        type="button"
        className={`lang-toggle__opt ${locale === 'en' ? 'is-active' : ''}`}
        onClick={() => setLocale('en')}
        aria-label="English"
        aria-pressed={locale === 'en'}
      >
        <span className="lang-toggle__mark lang-toggle__mark--en" aria-hidden="true">
          A
        </span>
      </button>
      <button
        type="button"
        className={`lang-toggle__opt ${locale === 'mr' ? 'is-active' : ''}`}
        onClick={() => setLocale('mr')}
        aria-label="Marathi"
        aria-pressed={locale === 'mr'}
      >
        <span className="lang-toggle__mark lang-toggle__mark--mr" aria-hidden="true">
          अ
        </span>
      </button>
    </div>
  )
}

export default LanguageToggle
