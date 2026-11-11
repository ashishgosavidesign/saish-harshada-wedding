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
    if (el.muted) return
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

function warmSource(el, url) {
  if (warming) return
  warming = true

  fetch(url, { credentials: 'same-origin', cache: 'force-cache' })
    .then((res) => {
      if (!res.ok) throw new Error(`audio ${res.status}`)
      return res.blob()
    })
    .then((blob) => {
      if (started || !el.paused) return
      const objectUrl = URL.createObjectURL(blob)
      const resume = gestured
      el.src = objectUrl
      el.load()
      if (resume) tryPlay(el)
    })
    .catch(() => {
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

  el.muted = false
  el.volume = VOLUME
  const result = el.play()
  if (result && typeof result.then === 'function') {
    result
      .then(() => {
        if (!el.paused) {
          started = true
          detachGestures()
        }
      })
      .catch(() => {
        /* Need gesture — keep listeners */
      })
  } else if (!el.paused) {
    started = true
    detachGestures()
  }

  if (isIos() && el.paused) {
    el.muted = true
    const mutedPlay = el.play()
    if (mutedPlay && typeof mutedPlay.then === 'function') {
      mutedPlay
        .then(() => {
          el.muted = false
          el.volume = VOLUME
          started = true
          detachGestures()
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
  tryPlay(ensureAudio())
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
 * Desktop: autoplay. Mobile: starts on first tap anywhere on the invite (no extra UI).
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

  tryPlay(el)

  return () => {}
}
