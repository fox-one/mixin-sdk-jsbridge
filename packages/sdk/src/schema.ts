import base64 from 'base64-js';
import {
  uuid,
  isObject,
  getLogger,
  strToUnitArray
} from '@utils/index';

const logger = getLogger('schema');
const SCHEMA = {
  prefix: 'mixin://',
  loadSchema: function (url: string) {
    if (!url) {
      logger('loadSchema').error('The URL cannot be a falsy value!');
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

    return this.loadSchema(_url);
  }
};

export type PARAMS_PAYMENT = {
  recipient: string;
  assetId: string;
  amount: string;
  traceId?: string;
  memo?: string | Record<string, string>;
};

export default {
  prefix: SCHEMA.prefix,
  pay: function (params: PARAMS_PAYMENT) {
    if (!params.recipient || !params.assetId || !params.amount) {
      logger('pay').warn('The "recipient", "assetId" and "amount" is required!');
      return;
    }

    try {
      if (!params.traceId) params.traceId = uuid();

      if (isObject(params.memo)) {
        JSON.stringify(params.memo);
      }

      params.memo = base64.fromByteArray(strToUnitArray(params.memo as string)!);

      return SCHEMA.pay(params as Record<string, string>);
    } catch (err) {
      logger('pay').warn(err);
    }
  }
};

