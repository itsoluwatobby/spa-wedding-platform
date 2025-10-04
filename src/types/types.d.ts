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

type ErrorResponse = ResponseObj & { error: null }

type SuccessResponse = ResponseObj & {
	data: {
		Date: string;
		Name: string,
		Email: string,
		Phone: number | string,
		Attending: AttendanceProps,
		Guests: number,
		Message: string,
		DeviceFingerprint: string,
		CardId: number
	}
}