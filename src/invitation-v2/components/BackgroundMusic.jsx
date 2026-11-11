import { useEffect, useRef } from 'react'

const BG_SRC_DESKTOP = '/audio/diwali-bg.mp3'
const BG_SRC_MOBILE = '/audio/diwali-bg-mobile.mp3'

function isMobileDevice() {
  if (typeof window === 'undefined') return false
  const coarse = window.matchMedia('(pointer: coarse)').matches
  const touch = navigator.maxTouchPoints > 0
  const ua = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)
  return ua || (touch && coarse)
}

/**
 * Looping background track — no UI controls.
 * Mobile: lighter file + early buffer + unlock-on-gesture so playback
 * starts as soon as enough data is ready (avoids long post-tap delays).
 */
function BackgroundMusic() {
  const audioRef = useRef(null)
  const mobile = isMobileDevice()

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return undefined

    audio.volume = 0.45

    let unlocked = false
    let wantPlay = true
    let playing = false

    const clearReadyWait = () => {
      audio.removeEventListener('canplay', onCanPlay)
      audio.removeEventListener('loadeddata', onCanPlay)
    }

    const start = () => {
      if (playing || !wantPlay) return
      const playPromise = audio.play()
      if (playPromise && typeof playPromise.then === 'function') {
        playPromise
          .then(() => {
            playing = true
            clearReadyWait()
          })
          .catch(() => {
            /* Autoplay / gesture policy — wait for unlock or buffer */
          })
      }
    }

    const onCanPlay = () => {
      if (wantPlay) start()
    }

    const tryPlay = () => {
      wantPlay = true
      // HAVE_FUTURE_DATA / HAVE_ENOUGH_DATA — start immediately
      if (audio.readyState >= 3) {
        start()
        return
      }
      // HAVE_CURRENT_DATA — often enough to begin
      if (audio.readyState >= 2) {
        start()
      }
      audio.addEventListener('canplay', onCanPlay)
      audio.addEventListener('loadeddata', onCanPlay)
    }

    // Mobile: kick off fetch right away so the first tap isn't waiting on a cold load
    if (mobile) {
      audio.load()
    }

    tryPlay()

    const unlock = () => {
      if (unlocked) return
      unlocked = true
      // Must call play() inside the gesture to unlock iOS/Android audio
      tryPlay()
      window.removeEventListener('pointerdown', unlock)
      window.removeEventListener('touchstart', unlock)
      window.removeEventListener('keydown', unlock)
    }

    // touchstart first on mobile — fires sooner than click/pointerup
    window.addEventListener('touchstart', unlock, { passive: true, capture: true })
    window.addEventListener('pointerdown', unlock, { passive: true, capture: true })
    window.addEventListener('keydown', unlock)

    return () => {
      wantPlay = false
      clearReadyWait()
      window.removeEventListener('pointerdown', unlock, true)
      window.removeEventListener('touchstart', unlock, true)
      window.removeEventListener('keydown', unlock)
      audio.pause()
    }
  }, [mobile])

  return (
    <audio
      ref={audioRef}
      className="bg-music"
      src={mobile ? BG_SRC_MOBILE : BG_SRC_DESKTOP}
      loop
      preload="auto"
      playsInline
      aria-hidden="true"
    />
  )
}

export default BackgroundMusic
