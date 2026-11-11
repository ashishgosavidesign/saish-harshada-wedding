import { useEffect } from 'react'
import { initBackgroundMusic } from './bgMusicController'

/**
 * Mounts the shared background-music controller.
 * Actual <audio> lives outside React so iOS/Android unlock survives remounts.
 */
function BackgroundMusic() {
  useEffect(() => initBackgroundMusic(), [])
  return null
}

export default BackgroundMusic
