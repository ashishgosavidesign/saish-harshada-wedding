import './PlainFallback.css'

/** CSS-only fallback if WebGL is unavailable or fails */
export default function PlainFallback() {
  return <div className="plain-fallback" aria-hidden="true" />
}
