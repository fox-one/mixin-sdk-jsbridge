import { Logger } from 'peeler-js/dist/logger';

const logger = new Logger({
  debug: true,
  logLevel: 'warn',
  logPrefix: getPrefix()
});

function getPrefix(scope?: string, suffix?: string) {
  let str = 'FOX-ONE-JSBridge';
  if (scope && suffix) {
    str = `${str} ${scope}-${suffix}`;
  } else if (scope) {
    str = `${str} ${scope}`;
  }
  return str;
}

export function getLogger(scope?: string) {
  return function (suffix?: string) {
    return logger.setPrefix(getPrefix(scope, suffix));
  };
}

export default getLogger;