import { useEffect, useRef } from 'react'

const BG_SRC = '/audio/diwali-bg.mp3'

/**
 * Looping background track — no UI controls.
 * Browsers often block autoplay until a gesture; we resume on first tap/key.
 */
function BackgroundMusic() {
  const audioRef = useRef(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return undefined

    audio.volume = 0.45

    const tryPlay = () => {
      const playPromise = audio.play()
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {
          /* Autoplay blocked until interaction */
        })
      }
    }

    tryPlay()

    const unlock = () => {
      tryPlay()
      window.removeEventListener('pointerdown', unlock)
      window.removeEventListener('keydown', unlock)
      window.removeEventListener('touchstart', unlock)
    }

    window.addEventListener('pointerdown', unlock, { passive: true })
    window.addEventListener('keydown', unlock)
    window.addEventListener('touchstart', unlock, { passive: true })

    return () => {
      window.removeEventListener('pointerdown', unlock)
      window.removeEventListener('keydown', unlock)
      window.removeEventListener('touchstart', unlock)
      audio.pause()
    }
  }, [])

  return (
    <audio
      ref={audioRef}
      className="bg-music"
      src={BG_SRC}
      loop
      preload="auto"
      playsInline
      aria-hidden="true"
    />
  )
}

export default BackgroundMusic
