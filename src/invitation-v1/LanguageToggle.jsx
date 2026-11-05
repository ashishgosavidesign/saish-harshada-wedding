import { useLocale } from './LocaleContext'
import './LanguageToggle.css'

function LanguageToggle() {
  const { locale, setLocale, t } = useLocale()

  return (
    <div className="lang-toggle" role="group" aria-label="Language">
      <button
        type="button"
        className={`lang-toggle__btn ${locale === 'en' ? 'lang-toggle__btn--active' : ''}`}
        onClick={() => setLocale('en')}
        aria-pressed={locale === 'en'}
      >
        EN
      </button>
      <span className="lang-toggle__sep" aria-hidden="true">
        |
      </span>
      <button
        type="button"
        className={`lang-toggle__btn ${locale === 'mr' ? 'lang-toggle__btn--active' : ''}`}
        onClick={() => setLocale('mr')}
        aria-pressed={locale === 'mr'}
      >
        {t.ui.langMr}
      </button>
    </div>
  )
}

export default LanguageToggle
