import './CornerLeaves.css'

function CornerLeaves() {
  return (
    <>
      <svg
        className="corner-leaves corner-leaves--tl"
        viewBox="0 0 120 80"
        aria-hidden="true"
      >
        <g className="corner-leaves__sway">
          <path
            d="M0 10 C20 5 40 15 55 8 C35 25 25 45 15 55 C10 35 5 20 0 10Z"
            fill="#3d7a32"
            opacity="0.85"
          />
          <path
            d="M10 0 C25 8 35 20 45 12 C30 28 18 38 8 50 C5 30 8 12 10 0Z"
            fill="#2d5016"
          />
          <path
            d="M25 5 C40 12 50 22 60 18 C45 32 30 42 20 52"
            fill="none"
            stroke="#4a8f3a"
            strokeWidth="1.5"
          />
          <ellipse cx="48" cy="14" rx="8" ry="4" fill="#5cb848" transform="rotate(-20 48 14)" />
          <ellipse cx="62" cy="22" rx="7" ry="3.5" fill="#3d7a32" transform="rotate(-35 62 22)" />
        </g>
      </svg>
      <svg
        className="corner-leaves corner-leaves--tr"
        viewBox="0 0 120 80"
        aria-hidden="true"
      >
        <g className="corner-leaves__sway corner-leaves__sway--reverse">
          <path
            d="M120 10 C100 5 80 15 65 8 C85 25 95 45 105 55 C110 35 115 20 120 10Z"
            fill="#3d7a32"
            opacity="0.85"
          />
          <path
            d="M110 0 C95 8 85 20 75 12 C90 28 102 38 112 50 C115 30 112 12 110 0Z"
            fill="#2d5016"
          />
          <ellipse cx="72" cy="14" rx="8" ry="4" fill="#5cb848" transform="rotate(20 72 14)" />
          <ellipse cx="58" cy="22" rx="7" ry="3.5" fill="#3d7a32" transform="rotate(35 58 22)" />
        </g>
      </svg>
    </>
  )
}

export default CornerLeaves
