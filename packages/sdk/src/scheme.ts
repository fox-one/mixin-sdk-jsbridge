import base64 from 'base64-js';
import {
  uuid,
  isObject,
  getLogger,
  strToUnitArray
} from '@utils/index';

const logger = getLogger('scheme');
const SCHEME = {
  prefix: 'mixin',
  loadScheme: function (url: string) {
    if (!url) {
      logger('loadScheme').error('The URL cannot be a falsy value!');
      return;
    }
    window.location.href = url;

    return url;
  },
  getQuery: function (query: Record<string, string>) {
    if (!query) {
      return '';
    }

    let res = '';
    for (const k in query) {
      res += `&${k}=${query[k]}`;
    }
    return res.replace(/^&?/, '?');
  },
  pay: function (params: Record<string, string>) {
    const _params = this.getQuery(params);
    const _url = `${this.prefix}://pay${_params}`;

    logger().log(_url);
    return this.loadScheme(_url);
  }
};

export type PARAMS_PAYMENT = {
  recipient: string;
  asset: string;
  amount: string;
  trace?: string;
  memo?: string | Record<string, string>;
};

export default {
  prefix: SCHEME.prefix,
  pay: function (params: PARAMS_PAYMENT) {
    if (!params.recipient || !params.asset || !params.amount) {
      logger('pay').error('The "recipient", "asset" and "amount" is required!');
      return;
    }

    try {
      if (!params.trace) params.trace = uuid();

      if (params.memo) {
        if (isObject(params.memo)) {
          JSON.stringify(params.memo);
        }

        params.memo = base64.fromByteArray(strToUnitArray(params.memo as string)!);
        if (params.memo.length > 140) {
          logger('pay').warn('The memo max length is 140!');
        }
      }

      return SCHEME.pay(params as Record<string, string>);
    } catch (err) {
      logger('pay').error(err);
    }
  }
};

