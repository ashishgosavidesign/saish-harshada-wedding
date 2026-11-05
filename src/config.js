/** Google Form RSVP (opens in new tab from invitation) */
export const RSVP_FORM_URL = 'https://forms.gle/UiPppXfa7befkJVe6'

/** Wedding venue — Lakshminarayan Temple, Walaval */
export const MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=Lakshminarayan+Temple+Walaval+Kudal+Sindhudurg+Maharashtra+416520'

/** Local hub for “how far to Kudal” on transport rows (MSRTC stand, Kelbaiwadi) */
export const KUDAL_BUS_STAND =
  'Kudal+MSRTC+Bus+Stand,+Kelbaiwadi,+Kudal,+Sindhudurg,+Maharashtra+416520'

/** Approx. road distance to Kudal MSRTC bus stand (km) — rounded from typical driving routes */
export const TRANSPORT = [
  {
    id: 'chipi',
    icon: 'plane',
    code: 'SDW',
    distanceKm: 24,
    directionsUrl: `https://www.google.com/maps/dir/Sindhudurg+Airport,+Chipi,+Maharashtra/${KUDAL_BUS_STAND}`,
  },
  {
    id: 'mopa',
    icon: 'plane',
    code: 'GOX',
    distanceKm: 51,
    directionsUrl: `https://www.google.com/maps/dir/Manohar+International+Airport,+Mopa,+Goa/${KUDAL_BUS_STAND}`,
  },
  {
    id: 'kudal',
    icon: 'train',
    code: 'KUDL',
    distanceKm: 1,
    directionsUrl: `https://www.google.com/maps/dir/Kudal+Railway+Station,+Kudal,+Maharashtra/${KUDAL_BUS_STAND}`,
  },
]
