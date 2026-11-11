import { useEffect, useRef, useState } from 'react'
import { useLocale } from '../../invitation-v1/LocaleContext'
import {
  initBackgroundMusic,
  isBackgroundMusicPlaying,
  isMobileDevice,
  onBackgroundMusicPlaying,
  unlockBackgroundMusic,
} from './bgMusicController'

/**
 * Mobile-only open screen. Browsers block unmuted autoplay; this first tap
 * both opens the invite and starts music so it feels intentional, not delayed.
 */
function InviteOpenGate() {
  const { t, locale } = useLocale()
  const openedRef = useRef(false)
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return false
    if (!isMobileDevice()) return false
    return !isBackgroundMusicPlaying()
  })

  useEffect(() => {
    initBackgroundMusic()
    if (!isMobileDevice()) {
      setVisible(false)
      return undefined
    }
    return onBackgroundMusicPlaying(() => setVisible(false))
  }, [])

  if (!visible) return null

  const open = () => {
    if (openedRef.current) return
    openedRef.current = true
    unlockBackgroundMusic()
    setVisible(false)
  }

  return (
    <button
      type="button"
      className={`invite-open-gate invite-open-gate--${locale}`}
      onPointerUp={open}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          open()
        }
      }}
      aria-label={t.ui.openInvite}
    >
      <span className="invite-open-gate__names">
        <span className="invite-open-gate__name">{t.names.first}</span>
        <span className="invite-open-gate__amp">{t.names.conjunction}</span>
        <span className="invite-open-gate__name">{t.names.second}</span>
      </span>
      <span className="invite-open-gate__cta">{t.ui.openInvite}</span>
      <span className="invite-open-gate__hint">{t.ui.openInviteHint}</span>
    </button>
  )
}

export default InviteOpenGate
