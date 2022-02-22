import getLogger from '../logger';

const logger = getLogger('strToUnitArray');
export function strToUnitArray(str: string) {
  if (typeof Uint8Array === 'undefined') {
    logger().warn('Your browser not support Unit8Array!');
    return null;
  }

  try {
    const ret = new Uint8Array(str.length);
    for (let i = 0; i < ret.length; i++) {
      ret[i] = str.charCodeAt(i);
    }
    return ret;
  } catch (err) {
    logger().warn(err as Error);
    return null;
  }
}

export default strToUnitArray;
