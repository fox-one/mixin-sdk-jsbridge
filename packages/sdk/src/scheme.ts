import { Base64 } from 'js-base64';
import {
  uuid,
  isObject,
  getLogger
} from '@utils/index';

const logger = getLogger('scheme');
const SCHEME = {
  prefix: 'mixin',
  loadScheme: function (url: string, open?: boolean) {
    if (!url) {
      logger('loadScheme').error('The URL cannot be a falsy value!');
      return;
    }
    if (open) {
      window.open(url);
    } else {
      window.location.href = url;
    }
    return url;
  },
  getQuery: function (query: Record<string, any>) {
    if (!query) {
      return '';
    }

    let res = '';
    for (const k in query) {
      const val = query[k];
      if (val === null || val === undefined) continue;
      res += `&${k}=${val}`;
    }
    return res.replace(/^&?/, '?');
  },
  pay: function (params: Record<string, string>) {
    const _params = this.getQuery(params);
    const _url = `${this.prefix}://pay${_params}`;

    logger('pay').log(_url);
    return this.loadScheme(_url);
  },
  transfer: function (recipient: string) {
    const _url = `${this.prefix}://transfer/${recipient}`;

    logger('transfer').log(_url);
    return this.loadScheme(_url);
  },
  snapshots: function (params: PARAMS_SNAPSHOTS) {
    const { trace_id, snapshot_id } = params;
    if (!trace_id && !snapshot_id) {
      logger('snapshots').error('Must contain "trace_id" or "snapshot_id"!');
      return;
    }
    const _url = `${this.prefix}://snapshots${trace_id ? `?trace=${trace_id}` : `/${snapshot_id}`}`;

    logger('snapshots').log(_url);
    return this.loadScheme(_url);
  },
  withdrawal: function (params: Record<string, string>) {
    const _params = this.getQuery(params);
    const _url = `${this.prefix}://withdrawal${_params}`;

    logger('withdrawal').log(_url);
    return this.loadScheme(_url);
  },
  address: function (params: Record<string, string>) {
    const _params = this.getQuery(params);
    const _url = `${this.prefix}://address${_params}`;

    logger('address').log(_url);
    return this.loadScheme(_url);
  },
  send: function (params: {
    category: CATEGORY_SHARE;
    data: Record<string, any> | string;
  }) {
    const data = encodeURIComponent(Base64.encode(typeof params.data === 'string' ? params.data : JSON.stringify(params.data))!);
    const _params = this.getQuery({ ...params, data });
    const _url = `${this.prefix}://send${_params}`;

    logger('send').log(_url);
    return this.loadScheme(_url, true);
  },
  users: function (user_id: string) {
    const _url = `${this.prefix}://users/${user_id}`;

    logger('users').log(_url);
    return this.loadScheme(_url);
  },
  apps: function (app_id: string, params: Record<string, any>) {
    const _params = this.getQuery(params);
    const _url = `${this.prefix}://apps/${app_id}${_params}`;

    logger('apps').log(_url);
    return this.loadScheme(_url);
  },
  conversations: function (conversation_id: string) {
    const _url = `${this.prefix}://conversations/${conversation_id}`;

    logger('conversations').log(_url);
    return this.loadScheme(_url);
  }
};

export type CATEGORY_SHARE = 'text' | 'image' | 'contact' | 'app_card' | 'live' | 'post';

export type PARAMS_SNAPSHOTS = {
  trace_id?: string;
  snapshot_id?: string;
};

export type PARAMS_SHARE_CARD = {
  action: string;
  app_id: string;
  icon_url: string;
  title?: string;
  description?: string;
};

export type PARAMS_SHARE_LIVE = {
  url: string;
  thumb_url?: string;
  height?: number;
  width?: number;
};

export type PARAMS_POPUP_BOT = {
  app_id: string;
  action?: 'open';
  [props: string]: any;
};

export type PARAMS_PAYMENT = {
  recipient: string;
  asset: string;
  amount: string;
  trace?: string;
  memo?: string | Record<string, string>;
};

export type PARAMS_WITHDRAWAL = {
  address: string;
  asset: string;
  amount: string;
  trace?: string;
  memo?: string | Record<string, string>;
};

export type PARAMS_ADDRESS_ADD = {
  asset: string;
  label: string;
  destination: string;
  tag?: string;
};

export type PARAMS_ADDRESS_DELETE = {
  asset: string;
  address: string;
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
          params.memo = JSON.stringify(params.memo);
        }

        params.memo = Base64.encode(params.memo);
        if (params.memo!.length > 140) {
          logger('pay').warn('The memo max length is 140!');
        }
      }

      return {
        url: SCHEME.pay(params as Record<string, string>),
        params
      };
    } catch (err) {
      logger('pay').error(err as Error);
    }
  },
  transfer: function (recipient: string) {
    if (!recipient) {
      logger('transfer').error('The "recipient" is required!');
      return;
    }

    try {
      return SCHEME.transfer(recipient);
    } catch (err) {
      logger('transfer').error(err as Error);
    }
  },
  snapshot: function (params: PARAMS_SNAPSHOTS) {
    try {
      return SCHEME.snapshots(params);
    } catch (err) {
      logger('snapshot').error(err as Error);
    }
  },
  withdrawal: function (params: PARAMS_WITHDRAWAL) {
    try {
      if (!params.trace) params.trace = uuid();

      if (params.memo) {
        if (isObject(params.memo)) {
          params.memo = JSON.stringify(params.memo);
        }

        params.memo = Base64.encode(params.memo);
        if (params.memo!.length > 140) {
          logger('withdrawal').warn('The memo max length is 140!');
        }
      }

      return {
        url: SCHEME.withdrawal(params as Record<string, string>),
        params
      };
    } catch (err) {
      logger('withdrawal').error(err as Error);
    }
  },
  addWithdrawalAddress: function (params: PARAMS_ADDRESS_ADD) {
    if (!params.asset || !params.label || !params.destination) {
      logger('addWithdrawalAddress').error('The "asset", "label" and "destination" is required!');
      return;
    }

    try {
      return SCHEME.address(params as Record<string, string>);
    } catch (err) {
      logger('addWithdrawalAddress').error(err as Error);
    }
  },
  delWithdrawalAddress: function (params: PARAMS_ADDRESS_DELETE) {
    if (!params.asset || !params.address) {
      logger('delWithdrawalAddress').error('The "asset" and "address" is required!');
      return;
    }

    try {
      return SCHEME.address({ ...params, action: 'delete' } as Record<string, string>);
    } catch (err) {
      logger('delWithdrawalAddress').error(err as Error);
    }
  },
  shareText: function (txt: string) {
    if (!txt) {
      logger('shareText').error('The share text is required!');
      return;
    }

    try {
      return SCHEME.send({
        category: 'text',
        data: txt
      });
    } catch (err) {
      logger('shareText').error(err as Error);
    }
  },
  shareImage: function (url: string) {
    if (!url) {
      logger('shareImage').error('The share image url is required!');
      return;
    }

    try {
      return SCHEME.send({
        category: 'image',
        data: { url }
      });
    } catch (err) {
      logger('shareImage').error(err as Error);
    }
  },
  shareContact: function (user_id: string) {
    if (!user_id) {
      logger('shareContact').error('The "user_id" is required!');
      return;
    }

    try {
      return SCHEME.send({
        category: 'contact',
        data: { user_id }
      });
    } catch (err) {
      logger('shareContact').error(err as Error);
    }
  },
  shareCard: function (data: PARAMS_SHARE_CARD) {
    if (!data.action || !data.app_id) {
      logger('shareCard').error('The "action" and "app_id" is required!');
      return;
    }

    try {
      return SCHEME.send({
        category: 'app_card',
        data
      });
    } catch (err) {
      logger('shareCard').error(err as Error);
    }
  },
  shareLive: function (data: PARAMS_SHARE_LIVE) {
    if (!data.url) {
      logger('shareLive').error('The "url" is required!');
      return;
    }

    try {
      if (!data.height) data.height = 720;
      if (!data.width) data.width = 1280;
      return SCHEME.send({
        category: 'live',
        data
      });
    } catch (err) {
      logger('shareLive').error(err as Error);
    }
  },
  sharePost: function (content: string) {
    if (!content) {
      logger('sharePost').error('The share content is required!');
      return;
    }

    try {
      return SCHEME.send({
        category: 'post',
        data: content
      });
    } catch (err) {
      logger('sharePost').error(err as Error);
    }
  },
  popupUser: function (user_id: string) {
    if (!user_id) {
      logger('popupUser').error('The "user_id" is required!');
      return;
    }

    try {
      return SCHEME.users(user_id);
    } catch (err) {
      logger('popupUser').error(err as Error);
    }
  },
  popupBot: function (params: PARAMS_POPUP_BOT) {
    const { app_id, ...rest } = params;
    if (!app_id) {
      logger('popupBot').error('The "app_id" is required!');
      return;
    }

    try {
      return SCHEME.apps(app_id, rest);
    } catch (err) {
      logger('popupBot').error(err as Error);
    }
  },
  conversation: function (conversation_id: string) {
    if (!conversation_id) {
      logger('conversation').error('The "conversation_id" is required!');
      return;
    }

    try {
      return SCHEME.conversations(conversation_id);
    } catch (err) {
      logger('conversation').error(err as Error);
    }
  }
};

