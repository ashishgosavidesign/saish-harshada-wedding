import './DecorativeBorder.css'

function DecorativeBorder() {
  return (
    <svg
      className="decorative-border"
      viewBox="0 0 400 780"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="borderGreen" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3d6b28" />
          <stop offset="100%" stopColor="#2d5016" />
        </linearGradient>
      </defs>
      <rect
        x="8"
        y="8"
        width="384"
        height="764"
        rx="2"
        fill="none"
        stroke="url(#borderGreen)"
        strokeWidth="1.2"
      />
      {/* Corner flourishes */}
      <path
        d="M8 28 Q8 8 28 8"
        fill="none"
        stroke="#2d5016"
        strokeWidth="1"
      />
      <path
        d="M372 8 Q392 8 392 28"
        fill="none"
        stroke="#2d5016"
        strokeWidth="1"
      />
      <path
        d="M8 752 Q8 772 28 772"
        fill="none"
        stroke="#2d5016"
        strokeWidth="1"
      />
      <path
        d="M392 752 Q392 772 372 772"
        fill="none"
        stroke="#2d5016"
        strokeWidth="1"
      />
      <path
        d="M18 8 L18 22 M8 18 L22 18"
        stroke="#2d5016"
        strokeWidth="0.6"
        opacity="0.5"
      />
      <path
        d="M382 8 L382 22 M392 18 L378 18"
        stroke="#2d5016"
        strokeWidth="0.6"
        opacity="0.5"
      />
    </svg>
  )
}

export default DecorativeBorder
