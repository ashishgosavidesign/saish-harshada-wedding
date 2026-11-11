import { useEffect } from 'react'
import { initBackgroundMusic } from './bgMusicController'

/** Starts background music — desktop autoplay; mobile on first tap (no extra UI). */
function BackgroundMusic() {
  useEffect(() => initBackgroundMusic(), [])
  return null
}

export default BackgroundMusic
