import './LeafFlourish.css'

function LeafFlourish({ className = '' }) {
  return (
    <svg
      className={`leaf-flourish ${className}`}
      viewBox="0 0 32 20"
      aria-hidden="true"
    >
      <path
        d="M2 10 C8 2 14 2 18 6 C12 4 6 8 4 14 C6 12 8 10 2 10Z"
        fill="#d4af37"
        opacity="0.9"
      />
      <path
        d="M30 10 C24 2 18 2 14 6 C20 4 26 8 28 14 C26 12 24 10 30 10Z"
        fill="#c9a227"
        opacity="0.9"
      />
    </svg>
  )
}

export default LeafFlourish
