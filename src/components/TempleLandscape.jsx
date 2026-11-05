import './TempleLandscape.css'

function TempleLandscape() {
  return (
    <div className="landscape" aria-hidden="true">
      <svg className="landscape__svg" viewBox="0 0 400 175" preserveAspectRatio="xMidYMax slice">
        <defs>
          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c5e4ed" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#e8f0dc" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="hillFar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8ec98c" />
            <stop offset="100%" stopColor="#6fa86d" />
          </linearGradient>
          <linearGradient id="hillNear" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5a9e58" />
            <stop offset="100%" stopColor="#3d7a32" />
          </linearGradient>
          <linearGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8fd4ea" />
            <stop offset="55%" stopColor="#6ec0de" />
            <stop offset="100%" stopColor="#4fa8c9" />
          </linearGradient>
        </defs>

        <rect x="0" y="0" width="400" height="100" fill="url(#skyGrad)" />
        <path
          d="M0 82 Q90 48 180 68 T360 58 L400 72 L400 102 L0 102Z"
          fill="url(#hillFar)"
          opacity="0.5"
        />
        <path
          d="M0 92 Q110 62 210 80 T400 78 L400 102 L0 102Z"
          fill="url(#hillNear)"
          opacity="0.65"
        />

        {/* Left grove */}
        <ellipse cx="38" cy="78" rx="32" ry="24" fill="#3d7a32" opacity="0.9" />
        <ellipse cx="68" cy="74" rx="24" ry="19" fill="#2d5016" opacity="0.75" />
        <rect x="52" y="86" width="5" height="16" fill="#5c4033" />
        <ellipse cx="22" cy="82" rx="18" ry="14" fill="#4a8f3a" opacity="0.7" />

        {/* Palms */}
        <g className="landscape__palm">
          <path d="M300 102 L303 58" stroke="#6b4423" strokeWidth="3.2" fill="none" />
          <path d="M303 62 C282 52 270 55 262 63" stroke="#2d5016" strokeWidth="2.2" fill="none" />
          <path d="M303 58 C326 48 340 52 348 60" stroke="#2d5016" strokeWidth="2.2" fill="none" />
          <path d="M303 54 C296 36 306 28 318 36" stroke="#3d7a32" strokeWidth="2" fill="none" />
          <path d="M303 56 C310 40 318 42 322 50" stroke="#4a8f3a" strokeWidth="1.6" fill="none" />
        </g>
        <g className="landscape__palm landscape__palm--delay">
          <path d="M348 104 L351 66" stroke="#6b4423" strokeWidth="2.8" fill="none" />
          <path d="M351 70 C334 62 326 64 318 72" stroke="#2d5016" strokeWidth="1.8" fill="none" />
          <path d="M351 66 C368 58 378 62 386 70" stroke="#2d5016" strokeWidth="1.8" fill="none" />
        </g>

        {/* Temple complex */}
        <g className="landscape__temple">
          <rect x="252" y="72" width="18" height="22" fill="#f0dcc0" stroke="#b88860" strokeWidth="0.6" />
          <path d="M248 72 L261 58 L274 72Z" fill="#e89440" />
          <rect x="278" y="62" width="58" height="42" fill="#f5e8d0" stroke="#c4956a" strokeWidth="0.8" />
          <path d="M268 62 L307 26 L346 62Z" fill="#e07a2a" stroke="#c46520" strokeWidth="0.7" />
          <path d="M285 62 L307 40 L329 62Z" fill="#f09440" />
          <path d="M296 62 L307 48 L318 62Z" fill="#ffb74d" opacity="0.85" />
          <rect x="296" y="74" width="22" height="30" fill="#6d3b1a" rx="1" />
          <rect x="282" y="78" width="10" height="10" fill="#e07a2a" />
          <rect x="322" y="78" width="10" height="10" fill="#e07a2a" />
          <path d="M246 104 L352 104 L356 112 L242 112Z" fill="#d9cbb0" />
        </g>

        <rect x="0" y="102" width="400" height="73" fill="url(#waterGrad)" />

        <g className="landscape__ripples">
          <ellipse cx="110" cy="125" rx="38" ry="4.5" fill="none" stroke="#fff" strokeWidth="0.9" opacity="0.4" />
          <ellipse cx="210" cy="138" rx="50" ry="5.5" fill="none" stroke="#fff" strokeWidth="0.8" opacity="0.28" />
          <ellipse cx="290" cy="128" rx="34" ry="4" fill="none" stroke="#fff" strokeWidth="0.7" opacity="0.32" />
        </g>
        <g className="landscape__ripples landscape__ripples--slow">
          <ellipse cx="155" cy="132" rx="28" ry="3.5" fill="none" stroke="#fff" strokeWidth="0.65" opacity="0.22" />
          <ellipse cx="250" cy="142" rx="42" ry="4.5" fill="none" stroke="#fff" strokeWidth="0.55" opacity="0.2" />
        </g>

        <ellipse cx="88" cy="136" rx="16" ry="7" fill="#3d7a32" opacity="0.88" />
        <ellipse cx="168" cy="146" rx="18" ry="8" fill="#2d5016" opacity="0.82" />
        <ellipse cx="228" cy="132" rx="14" ry="6" fill="#4a8f3a" opacity="0.78" />
        <ellipse cx="310" cy="140" rx="12" ry="5" fill="#3d7a32" opacity="0.7" />

        <g className="landscape__lotus landscape__lotus--1">
          <ellipse cx="88" cy="129" rx="7" ry="9" fill="#f48fb1" />
          <ellipse cx="81" cy="131" rx="5" ry="7" fill="#ec407a" opacity="0.85" />
          <ellipse cx="95" cy="131" rx="5" ry="7" fill="#ec407a" opacity="0.85" />
          <circle cx="88" cy="128" r="3.5" fill="#fff59d" opacity="0.85" />
        </g>
        <g className="landscape__lotus landscape__lotus--2">
          <ellipse cx="170" cy="141" rx="8" ry="10" fill="#f48fb1" />
          <ellipse cx="162" cy="143" rx="5.5" ry="8" fill="#e91e63" opacity="0.8" />
          <ellipse cx="178" cy="143" rx="5.5" ry="8" fill="#e91e63" opacity="0.8" />
          <circle cx="170" cy="139" r="4" fill="#ffeb3b" opacity="0.75" />
        </g>
        <g className="landscape__lotus landscape__lotus--3">
          <ellipse cx="230" cy="127" rx="6" ry="8" fill="#f48fb1" />
          <circle cx="230" cy="126" r="3" fill="#fff59d" opacity="0.8" />
        </g>
        <g className="landscape__lotus landscape__lotus--4">
          <ellipse cx="128" cy="122" rx="5" ry="7" fill="#f8bbd0" opacity="0.95" />
          <circle cx="128" cy="121" r="2.5" fill="#ffeb3b" opacity="0.7" />
        </g>
      </svg>
    </div>
  )
}

export default TempleLandscape
