import { useEffect } from 'react'
import { initBackgroundMusic } from './bgMusicController'

/**
 * Starts the shared music controller (desktop autoplay / mobile muted prime).
 * Mobile unmute happens via InviteOpenGate on first tap.
 */
function BackgroundMusic() {
  useEffect(() => initBackgroundMusic(), [])
  return null
}

export default BackgroundMusic
