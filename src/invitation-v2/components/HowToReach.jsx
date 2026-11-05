import { MAPS_URL, TRANSPORT } from '../../config'
import { useLocale } from '../../invitation-v1/LocaleContext'

/** Material Symbols — flight (Google, Apache 2.0) */
function FlightIcon() {
  return (
    <svg className="reach-row__mode-glyph" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
      />
    </svg>
  )
}

/** Material Symbols — train (Google, Apache 2.0) */
function TrainIcon() {
  return (
    <svg className="reach-row__mode-glyph" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M4 15.5V6q0-1.325.688-2.113t1.812-1.2t2.563-.55T12 2q1.65 0 3.113.138t2.55.55t1.712 1.2T20 6v9.5q0 1.475-1.012 2.488T16.5 19l1.5 1.5v.5h-2l-2-2h-4l-2 2H6v-.5L7.5 19q-1.475 0-2.488-1.012T4 15.5M6 10h5V7H6zm7 0h5V7h-5zm-3.425 5.575Q10 15.15 10 14.5t-.425-1.075T8.5 13t-1.075.425T7 14.5t.425 1.075T8.5 16t1.075-.425m7 0Q17 15.15 17 14.5t-.425-1.075T15.5 13t-1.075.425T14 14.5t.425 1.075T15.5 16t1.075-.425"
      />
    </svg>
  )
}

/** Material Symbols — arrow_outward (Google, Apache 2.0) */
function ArrowOutwardIcon({ className = 'reach-row__link-glyph' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M6 6v2h8.59L5 17.59 6.41 19 16 9.41V18h2V6H6z"
      />
    </svg>
  )
}

/** Material Symbols — arrow_back (Google, Apache 2.0) */
function BackArrowIcon() {
  return (
    <svg className="reach__back-glyph" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M19 11H7.83l4.88-4.88c.39-.39.39-1.03 0-1.42-.39-.39-1.02-.39-1.41 0l-6.59 6.59c-.39.39-.39 1.02 0 1.41l6.59 6.59c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L7.83 13H19c.55 0 1-.45 1-1s-.45-1-1-1z"
      />
    </svg>
  )
}

function MapPinIcon() {
  return (
    <svg className="reach__map-glyph" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21s6-4.35 6-10a6 6 0 1 0-12 0c0 5.65 6 10 6 10z"
      />
      <circle
        cx="12"
        cy="11"
        r="2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  )
}

function HowToReach({ onBack }) {
  const { t } = useLocale()
  const copy = t.reach

  return (
    <section className="reach" aria-labelledby="reach-title">
      <div className="reach__inner">
        <button type="button" className="reach__back" onClick={onBack}>
          <BackArrowIcon />
          <span className="reach__back-label">{copy.back}</span>
        </button>
        <h1 className="reach__about-title">{copy.aboutTitle}</h1>
        <div className="reach__about">
          {copy.about.split('\n\n').map((part) => (
            <p key={part}>{part}</p>
          ))}
        </div>

        <h2 className="reach__title" id="reach-title">
          {copy.title}
        </h2>
        <p className="reach__distance-note" id="reach-distance-note">
          {copy.distanceNote}
        </p>

        <ul className="reach__list" aria-describedby="reach-distance-note">
          {TRANSPORT.map((item) => {
            const row = copy.rows[item.id]
            if (!row) return null
            return (
              <li key={item.id}>
                <a
                  className="reach-row"
                  href={item.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${row.name}, ${item.code}. ${copy.rowDirectionsLabel}`}
                >
                  <span className="reach-row__copy">
                    <span className="reach-row__mode" aria-hidden="true">
                      {item.icon === 'train' ? <TrainIcon /> : <FlightIcon />}
                    </span>
                    <span className="reach-row__body">
                      <span className="reach-row__title-line">
                        <span className="reach-row__headline">
                          <span className="reach-row__name">{row.name}</span>
                          <span className="reach-row__link-hint" aria-hidden="true">
                            <ArrowOutwardIcon />
                          </span>
                        </span>
                      </span>
                      <span className="reach-row__label">
                        <span className="reach-row__place">{row.label}</span>
                        <span className="reach-row__code">({item.code})</span>
                      </span>
                    </span>
                  </span>
                  <span
                    className="reach-row__distance"
                    title={copy.distanceNote}
                  >
                    <span className="reach-row__km">
                      {String(item.distanceKm).padStart(2, '0')}
                    </span>
                    <span className="reach-row__unit">km</span>
                  </span>
                </a>
              </li>
            )
          })}
        </ul>

        <div className="reach__venue-action">
          <a
            className="invite-btn reach__map"
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MapPinIcon />
            <span>{copy.venueMapLabel}</span>
          </a>
        </div>
      </div>
      <div className="reach__coast" aria-hidden="true">
        <img
          className="reach__coast-img"
          src="/invitation-v2/konkan-coast.png?v=2"
          alt=""
          decoding="async"
        />
      </div>
    </section>
  )
}

export default HowToReach
