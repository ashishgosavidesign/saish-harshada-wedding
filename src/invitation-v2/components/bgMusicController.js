const BG_SRC_DESKTOP = '/audio/diwali-bg.mp3'
const BG_SRC_MOBILE = '/audio/diwali-bg-mobile.mp3'
const VOLUME = 0.45

function isMobileDevice() {
  if (typeof window === 'undefined') return false
  if (/Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)) return true
  return window.matchMedia('(pointer: coarse)').matches && navigator.maxTouchPoints > 0
}

function isIos() {
  if (typeof navigator === 'undefined') return false
  return (
    /iPhone|iPad|iPod/i.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  )
}

/** Module singleton — survives React StrictMode remounts (critical on iOS/Android). */
let audio = null
let started = false
let gestured = false
let wired = false
let warming = false

function ensureAudio() {
  if (audio) return audio

  const mobile = isMobileDevice()
  const el = new Audio()
  el.loop = true
  el.preload = 'auto'
  el.volume = VOLUME
  el.playsInline = true
  el.setAttribute('playsinline', '')
  el.setAttribute('webkit-playsinline', '')
  el.setAttribute('aria-hidden', 'true')
  el.className = 'bg-music'
  el.src = mobile ? BG_SRC_MOBILE : BG_SRC_DESKTOP

  el.addEventListener('playing', () => {
    started = true
    el.muted = false
    el.volume = VOLUME
    detachGestures()
  })

  el.addEventListener('error', () => {
    if (mobile && el.src.includes('diwali-bg-mobile')) {
      el.src = BG_SRC_DESKTOP
      el.load()
      warmSource(el, BG_SRC_DESKTOP)
    }
  })

  document.body.appendChild(el)
  audio = el

  if (mobile) {
    warmSource(el, el.src)
  } else {
    el.load()
  }

  return el
}

/** Prefetch into a blob URL so mobile starts from local buffer (Android + iOS). */
function warmSource(el, url) {
  if (warming) return
  warming = true

  fetch(url, { credentials: 'same-origin', cache: 'force-cache' })
    .then((res) => {
      if (!res.ok) throw new Error(`audio ${res.status}`)
      return res.blob()
    })
    .then((blob) => {
      // Don't interrupt active / starting playback
      if (started || !el.paused) return
      const objectUrl = URL.createObjectURL(blob)
      const resume = gestured
      el.src = objectUrl
      el.load()
      if (resume) tryPlay(el)
    })
    .catch(() => {
      /* Keep original src — network will stream it */
      if (!el.src) {
        el.src = url
        el.load()
      }
    })
    .finally(() => {
      warming = false
    })
}

function tryPlay(el) {
  if (!el || started) return

  const run = () => {
    const result = el.play()
    if (result && typeof result.then === 'function') {
      result.catch(() => {
        /* Need gesture or more buffer — keep listeners */
      })
    }
  }

  run()

  // iOS: if still blocked, unlock with muted play in the same turn, then unmute
  if (isIos() && el.paused) {
    el.muted = true
    const mutedPlay = el.play()
    if (mutedPlay && typeof mutedPlay.then === 'function') {
      mutedPlay
        .then(() => {
          el.muted = false
          el.volume = VOLUME
        })
        .catch(() => {
          el.muted = false
        })
    } else {
      el.muted = false
    }
  }
}

function onGesture() {
  gestured = true
  const el = ensureAudio()
  tryPlay(el)
}

function onReady() {
  if (!gestured || started) return
  tryPlay(audio)
}

function detachGestures() {
  document.removeEventListener('touchstart', onGesture, true)
  document.removeEventListener('touchend', onGesture, true)
  document.removeEventListener('pointerdown', onGesture, true)
  document.removeEventListener('pointerup', onGesture, true)
  document.removeEventListener('click', onGesture, true)
  document.removeEventListener('keydown', onGesture)
  if (audio) {
    audio.removeEventListener('canplay', onReady)
    audio.removeEventListener('loadeddata', onReady)
  }
}

/**
 * Wire once for the page lifetime. Safe to call from React effects repeatedly.
 */
export function initBackgroundMusic() {
  if (typeof window === 'undefined') return () => {}

  const el = ensureAudio()

  if (!wired) {
    wired = true
    document.addEventListener('touchstart', onGesture, { passive: true, capture: true })
    document.addEventListener('touchend', onGesture, { passive: true, capture: true })
    document.addEventListener('pointerdown', onGesture, { passive: true, capture: true })
    document.addEventListener('pointerup', onGesture, { passive: true, capture: true })
    document.addEventListener('click', onGesture, { passive: true, capture: true })
    document.addEventListener('keydown', onGesture)
    el.addEventListener('canplay', onReady)
    el.addEventListener('loadeddata', onReady)
  }

  // Desktop often allows autoplay; mobile will no-op until gesture
  tryPlay(el)

  // Do NOT pause/detach on React unmount — StrictMode remount would kill iOS unlock
  return () => {}
}
