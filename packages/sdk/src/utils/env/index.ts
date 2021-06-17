import { getUA } from 'peeler-js/es/getUA';

export function env() {
  const ua = window?.navigator?.userAgent;

  return {
    ...getUA(ua)
  };
}

export default env;
