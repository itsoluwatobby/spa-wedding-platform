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

type AttendanceProps = 'YES' | 'NO'

type ResponseObj = {
  timestamp: string;
  statusCode: number;
  message: string;
}

type ErrorResponse = ResponseObj & {
  error: {
    message: string;
    statusCode: number;
    success: boolean;
  }
}

type RSVPProps = {
  _id: string;
  date: string;
  name: string,
  email: string,
  phone: number | string,
  attending: AttendanceProps,
  guests: number,
  message: string,
  deviceFingerprint: string,
  cardId: number
  fila: string;
  gele: string;
  seats: number[];
}

type SuccessResponse <T> = ResponseObj & { data: T }
