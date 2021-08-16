import { Logger } from 'peeler-js/es/logger';

export const logger = new Logger({
  debug: true,
  logLevel: 'detail',
  logPrefix: getPrefix()
});

function getPrefix(scope?: string, suffix?: string) {
  let str = 'Mixin-JSBridge';
  if (scope && suffix) {
    str = `${str} ${scope}-${suffix}`;
  } else if (scope) {
    str = `${str} ${scope}`;
  } else if (suffix) {
    str = `${str} ${suffix}`;
  }
  return str;
}

export function getLogger(scope?: string) {
  return function (suffix?: string) {
    return logger.setPrefix(getPrefix(scope, suffix));
  };
}

export default getLogger;