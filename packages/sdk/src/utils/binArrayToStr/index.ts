import getLogger from '../logger';

const logger = getLogger('binArrayToStr');
export function binArrayToStr(
  binArray: number[]
) {
  if (!binArray) {
    logger().warn('Please pass correct params!');
    return null;
  }

  if (!String.fromCharCode) {
    logger().warn('Your browser not support [String.fromCharCode]!');
    return null;
  }

  try {
    let str = '';
    for (let i = 0; i < binArray.length; i++) {
      str += String.fromCharCode(
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        parseInt('' + binArray[i])
      );
    }

    return JSON.parse(str);
  } catch (err) {
    logger().warn(err as Error);
    return null;
  }
}

export default binArrayToStr;
