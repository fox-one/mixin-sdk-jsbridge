import { getUA } from 'peeler-js/dist/getUA';

export function env() {
  const ua = window?.navigator?.userAgent;

  return {
    ...getUA(ua)
  };
}

export default env;
