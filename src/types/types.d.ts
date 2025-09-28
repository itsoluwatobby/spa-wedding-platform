// @types

type AppConfig = {
  name: string;
  date: string;
  contacts: {
    phone: {
      first: [string, string],
      second: [string, string],
    },
    email: any
  },
  location: {
    address: string;
    googleMapsLink: string;
  }
}

type IsIntersectingType = 'SWITCH' | 'STOP'

type Toggle = 'OPEN' | 'CLOSE'