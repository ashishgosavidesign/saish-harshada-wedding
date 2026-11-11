const BG_SRC_DESKTOP = '/audio/diwali-bg.mp3'
const BG_SRC_MOBILE = '/audio/diwali-bg-mobile.mp3'
const VOLUME = 0.45

export function isMobileDevice() {
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
let mutedPrimed = false
const playingListeners = new Set()

function notifyPlaying() {
  playingListeners.forEach((fn) => {
    try {
      fn()
    } catch {
      /* ignore */
    }
  })
}

export function onBackgroundMusicPlaying(fn) {
  playingListeners.add(fn)
  if (started) fn()
  return () => playingListeners.delete(fn)
}

export function isBackgroundMusicPlaying() {
  return started
}

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
    el.volume = VOLUME
    detachGestures()
    notifyPlaying()
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
      if (started || (!el.paused && !el.muted)) return
      const objectUrl = URL.createObjectURL(blob)
      const resume = gestured || mutedPrimed
      const keepMuted = el.muted
      el.src = objectUrl
      el.muted = keepMuted
      el.load()
      if (resume) {
        if (keepMuted) primeMuted(el)
        else tryPlay(el)
      }
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
  if (!el || started) return Promise.resolve(false)

  el.muted = false
  el.volume = VOLUME
  const result = el.play()
  if (result && typeof result.then === 'function') {
    return result
      .then(() => {
        if (!el.paused && !el.muted) {
          started = true
          detachGestures()
          notifyPlaying()
          return true
        }
        return false
      })
      .catch(() => false)
  }
  if (!el.paused) {
    started = true
    detachGestures()
    notifyPlaying()
    return Promise.resolve(true)
  }
  return Promise.resolve(false)
}

/** Mobile browsers allow muted autoplay — warms the audio pipeline for instant unmute. */
function primeMuted(el) {
  if (!el || started) return
  mutedPrimed = true
  el.muted = true
  el.volume = 0
  const result = el.play()
  if (result && typeof result.catch === 'function') {
    result.catch(() => {
      mutedPrimed = false
    })
  }
}

/**
 * Call from a real user gesture (open gate / tap). Unmutes if primed, else plays.
 * Required on iOS/Android — browsers block unmuted autoplay without this.
 */
export function unlockBackgroundMusic() {
  gestured = true
  const el = ensureAudio()

  if (mutedPrimed && !el.paused) {
    el.muted = false
    el.volume = VOLUME
    started = true
    detachGestures()
    notifyPlaying()
    return Promise.resolve(true)
  }

  if (isIos()) {
    el.muted = true
    return el
      .play()
      .then(() => {
        el.muted = false
        el.volume = VOLUME
        started = true
        detachGestures()
        notifyPlaying()
        return true
      })
      .catch(() => tryPlay(el))
  }

  return tryPlay(el)
}

function onGesture() {
  unlockBackgroundMusic()
}

function onReady() {
  if (started) return
  if (gestured) tryPlay(audio)
  else if (isMobileDevice() && !mutedPrimed) primeMuted(audio)
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
 * Desktop: unmuted autoplay. Mobile: muted prime + open-gate unmute (browser policy).
 */
export function initBackgroundMusic() {
  if (typeof window === 'undefined') return () => {}

  const el = ensureAudio()
  const mobile = isMobileDevice()

  if (!wired) {
    wired = true
    // Fallback unlock if user taps invite before/without the gate
    document.addEventListener('touchstart', onGesture, { passive: true, capture: true })
    document.addEventListener('touchend', onGesture, { passive: true, capture: true })
    document.addEventListener('pointerdown', onGesture, { passive: true, capture: true })
    document.addEventListener('pointerup', onGesture, { passive: true, capture: true })
    document.addEventListener('click', onGesture, { passive: true, capture: true })
    document.addEventListener('keydown', onGesture)
    el.addEventListener('canplay', onReady)
    el.addEventListener('loadeddata', onReady)
  }

  if (mobile) {
    // Muted autoplay is allowed — music is running silently until open gate unmutes
    primeMuted(el)
  } else {
    tryPlay(el)
  }

  return () => {}
}
