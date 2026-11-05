import { lazy, Suspense, useEffect, useState } from 'react'
import { useLocale } from './LocaleContext'
import './lake-hero.css'

const LakeCanvas = lazy(() => import('./hero3d/LakeCanvas'))

function LakeHero() {
  const { locale, t } = useLocale()
  const [scrollHintVisible, setScrollHintVisible] = useState(true)

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 40) setScrollHintVisible(false)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className="lake-hero" aria-labelledby="lake-hero-title">
      <Suspense fallback={<div className="lake-hero__loading" aria-hidden="true" />}>
        <LakeCanvas />
      </Suspense>

      <div className={`lake-hero__copy locale-${locale}`}>
        <p className="lake-hero__tagline" id="lake-hero-title">
          {t.hero.tagline}
        </p>
        <p className="lake-hero__couple">{t.hero.couple}</p>
      </div>

      <div
        className={`lake-hero__scroll-hint ${scrollHintVisible ? '' : 'lake-hero__scroll-hint--hidden'}`}
        aria-hidden={!scrollHintVisible}
      >
        <span className="lake-hero__scroll-text">{t.ui.scroll}</span>
        <svg className="lake-hero__chevron" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M6 9l6 6 6-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </section>
  )
}

export default LakeHero
