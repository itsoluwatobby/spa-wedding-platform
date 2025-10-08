
export function setCustomBackgroundImage(url: string, props: object = {}) {
  return { 
    backgroundImage: `url(${url})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'local',
    ...props
  }
}

export const dateCountDown = () => {
  const month = new Date().getDate()
  return {
    days: month.toString(),
    hours: month.toString(),
    mins: month.toString(),
    seconds: month.toString(),
  }
}

export function sanitizeString(entry: string) {
  const val =  entry.trim()
  val.replace(/</g, '&lt;') // Replace less-than sign
    .replace(/>/g, '&gt;') // Replace greater-than sign
    .replace(/"/g, '&quot;') // Replace double quote
    .replace(/'/g, '&#39;'); // Replace single quote
  return val
}

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export function sanitizeEntries<T extends object>(entries: T): T {
  const sanitizedValues = Object.entries(entries).map(([key, value]) => {
    if (typeof value === 'string') return [key, sanitizeString(value)]
    else return [key, value]
  })
  return Object.fromEntries(sanitizedValues)
}

export function getDeviceFingerprint() {
  let deviceId = localStorage.getItem('deviceId');
  if (!deviceId) {
      const navigator = window.navigator;
      const screen = window.screen;
      const fingerprint = [
          navigator.userAgent,
          navigator.language,
          screen.width,
          screen.height,
          new Date().getTimezoneOffset()
      ].join('|');
      let hash = 0;
      for (let i = 0; i < fingerprint.length; i++) {
          hash = ((hash << 5) - hash) + fingerprint.charCodeAt(i);
          hash = hash & hash;
      }
      deviceId = 'device_' + Math.abs(hash).toString(36);
      localStorage.setItem('deviceId', deviceId);
  }
  return deviceId;
}