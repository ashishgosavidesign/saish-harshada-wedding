import './Garland.css'

function Garland({ side, index }) {
  const leftOffsets = [28, 58]
  const rightOffsets = [28, 58]

  const style =
    side === 'left'
      ? { left: `${leftOffsets[index]}px` }
      : { right: `${rightOffsets[index]}px` }

  const delay = index * 0.45 + (side === 'left' ? 0 : 0.25)

  const yPositions = [16, 32, 48, 64, 80, 96]

  return (
    <svg
      className={`garland garland--${side}`}
      style={{ ...style, animationDelay: `${delay}s` }}
      viewBox="0 0 28 110"
      aria-hidden="true"
    >
      <line x1="14" y1="0" x2="14" y2="14" stroke="#5a7a2a" strokeWidth="1.2" />
      {yPositions.map((y, i) => (
        <g key={y} transform={`translate(14, ${y})`}>
          <circle cx="0" cy="0" r="5.5" fill={i % 2 === 0 ? '#f5a623' : '#fffef5'} />
          <circle cx="-5" cy="1.5" r="4" fill={i % 2 === 0 ? '#fffef5' : '#f5a623'} />
          <circle cx="5" cy="1.5" r="4" fill={i % 2 === 0 ? '#fffef5' : '#f5a623'} />
          <circle cx="0" cy="4" r="2" fill="#c62828" opacity="0.75" />
          <ellipse cx="0" cy="7" rx="2.5" ry="3.5" fill="#2d5016" opacity="0.55" />
        </g>
      ))}
    </svg>
  )
}

export default Garland
