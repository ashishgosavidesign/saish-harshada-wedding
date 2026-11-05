import LanguageToggle from './LanguageToggle'
import LakeHero from './LakeHero'
import { LocaleProvider, useLocale } from './LocaleContext'
import './invitation-v1.css'

function StubSection() {
  const { locale, t } = useLocale()

  return (
    <section className={`stub-section locale-${locale}`} aria-label="Preview">
      <p className="stub-section__text">{t.ui.stub}</p>
    </section>
  )
}

function InvitationV1Inner() {
  return (
    <>
      <header className="invitation-v1__header">
        <LanguageToggle />
      </header>
      <main className="invitation-v1__main">
        <LakeHero />
        <div className="invitation-v1__content">
          <StubSection />
        </div>
      </main>
    </>
  )
}

function InvitationV1() {
  return (
    <LocaleProvider>
      <div className="invitation-v1">
        <InvitationV1Inner />
      </div>
    </LocaleProvider>
  )
}

export default InvitationV1
