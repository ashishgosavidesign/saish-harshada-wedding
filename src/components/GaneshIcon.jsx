import './GaneshIcon.css'

/** Stylised line-art Ganesh — golden brown, matching card header */
function GaneshIcon() {
  return (
    <svg className="ganesh-icon" viewBox="0 0 90 78" aria-hidden="true">
      <g
        fill="none"
        stroke="#9a7340"
        strokeWidth="1.15"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M45 8 C52 4 62 8 60 18 C58 12 52 8 45 8Z" />
        <ellipse cx="45" cy="42" rx="24" ry="28" />
        <path d="M21 42 C14 48 10 58 14 66" />
        <path d="M69 42 C76 48 80 58 76 66" />
        <path d="M33 36 C30 32 28 34 29 38" />
        <path d="M57 36 C60 32 62 34 61 38" />
        <circle cx="36" cy="38" r="1.8" fill="#9a7340" stroke="none" />
        <circle cx="54" cy="38" r="1.8" fill="#9a7340" stroke="none" />
        <path d="M38 48 Q45 52 52 48" />
        <path d="M45 56 L45 68" />
        <path d="M38 62 L52 62" />
        <path d="M45 22 C40 18 36 22 38 28" />
        <path d="M45 22 C50 18 54 22 52 28" />
      </g>
      <path d="M45 2 L45 6" stroke="#c9a227" strokeWidth="1.2" />
    </svg>
  )
}

export default GaneshIcon
