import { RSVP_FORM_URL } from '../config'
import DecorativeBorder from './DecorativeBorder'
import CornerLeaves from './CornerLeaves'
import Garland from './Garland'
import GaneshIcon from './GaneshIcon'
import TempleLandscape from './TempleLandscape'
import LeafFlourish from './LeafFlourish'
import './WeddingInvitation.css'

function WeddingInvitation() {
  const openRsvp = () => {
    window.open(RSVP_FORM_URL, '_blank', 'noopener,noreferrer')
  }

  return (
    <article className="invitation">
      <div className="invitation__paper" />
      <DecorativeBorder />
      <CornerLeaves />
      <div className="invitation__garlands" aria-hidden="true">
        <Garland side="left" index={0} />
        <Garland side="left" index={1} />
        <Garland side="right" index={0} />
        <Garland side="right" index={1} />
      </div>

      <div className="invitation__content">
        <GaneshIcon />
        <p className="invitation__ganesh-mantra">॥ श्री गणेशाय नमः ॥</p>

        <p className="invitation__intro">
          आमच्या येथे परमेश्वराच्या कृपेने आमचा मुलगा
        </p>

        <div className="invitation__name-row">
          <LeafFlourish className="leaf-flourish--left" />
          <h1 className="invitation__name">साईश</h1>
          <LeafFlourish className="leaf-flourish--right" />
        </div>

        <p className="invitation__parents">
          दि. श्री. सुरेंद्र गोसावी आणि सौ. शुभदा गोसावी यांचा चिरंजीव
        </p>

        <div className="invitation__and">
          <span>आणि</span>
        </div>

        <div className="invitation__name-row">
          <LeafFlourish className="leaf-flourish--left" />
          <h1 className="invitation__name">हर्षदा</h1>
          <LeafFlourish className="leaf-flourish--right" />
        </div>

        <p className="invitation__parents invitation__parents--bride">
          सौ. शुभदा गावडे यांची कन्या
        </p>

        <h2 className="invitation__event-title">यांचा शुभविवाह सोहळा</h2>

        <div className="invitation__datetime">
          <div className="invitation__datetime-row">
            <CalendarIcon />
            <span>सोमवार, दि. १४ डिसेंबर २०२६</span>
          </div>
          <div className="invitation__datetime-row">
            <ClockIcon />
            <span>मुहूर्त : सकाळी ९.५० वाजता</span>
          </div>
        </div>

        <div className="invitation__venue">
          <div className="invitation__venue-label">
            <PinIcon />
            <span>विवाहस्थळ</span>
          </div>
          <p className="invitation__venue-name">
            श्री लक्ष्मी नारायण मंदिर, वालावल
          </p>
          <p className="invitation__venue-address">
            ता. कुडाळ, जि. सिंधुदुर्ग – ४१६५२४
          </p>
        </div>

        <p className="invitation__closing">
          या मंगल प्रसंगी आपण सहकुटुंब, सहपरिवार उपस्थित राहून वधू-वरांना
          शुभाशिर्वाद द्यावेत, ही विनंती.
        </p>

        <button type="button" className="invitation__rsvp" onClick={openRsvp}>
          RSVP
        </button>
      </div>

      <TempleLandscape />
    </article>
  )
}

function CalendarIcon() {
  return (
    <svg className="invitation__icon" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="5" width="18" height="16" rx="2" fill="#c62828" />
      <rect x="3" y="5" width="18" height="5" fill="#b71c1c" />
      <rect x="7" y="2" width="2" height="4" rx="1" fill="#fff" />
      <rect x="15" y="2" width="2" height="4" rx="1" fill="#fff" />
      <rect x="7" y="13" width="3" height="3" rx="0.5" fill="#fff" opacity="0.9" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg className="invitation__icon" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" fill="#c62828" />
      <circle cx="12" cy="12" r="7.5" fill="#fff" />
      <path
        d="M12 7v5l3.5 2"
        stroke="#c62828"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}

function PinIcon() {
  return (
    <svg className="invitation__icon invitation__icon--pin" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 2C8.5 2 6 4.2 6 7.5c0 4.5 6 12.5 6 12.5s6-8 6-12.5C18 4.2 15.5 2 12 2z"
        fill="#c62828"
      />
      <circle cx="12" cy="7.5" r="2.5" fill="#fff" />
    </svg>
  )
}

export default WeddingInvitation
