import { parseUrl } from 'peeler-js/es/parseUrl';
import messager from './messager';
import { getAccessCode, getAccessToken } from './token';
import scheme from './scheme';
import { logger, getLogger, parseError, env, request, store } from '@utils/index';
/** import types */
import type {
  CATEGORY_SHARE,
  PARAMS_SHARE_CARD,
  PARAMS_SHARE_LIVE,
  PARAMS_POPUP_BOT,
  PARAMS_PAYMENT,
  PARAMS_SNAPSHOTS,
  PARAMS_WITHDRAWAL,
  PARAMS_ADDRESS_ADD,
  PARAMS_ADDRESS_DELETE
} from './scheme';
import type { AUTH } from './token';
import type { TlogLevelStr } from 'peeler-js/es/logger';

interface Config {
  client_id?: string;
  debug?: boolean;
  logLevel?: TlogLevelStr;
}

const SUPPORT_APIS = {
  address_add: false,
  address_del: false,
  conversation: false,
  getContext: false,
  getUserInfo: true,
  login: true,
  logout: true,
  payment: false,
  playlist: false,
  popup_user: false,
  popup_bot: false,
  reloadTheme: false,
  requestToken: true,
  share_text: false,
  share_image: false,
  share_contact: false,
  share_app_card: false,
  share_live: false,
  share_post: false,
  showToast: false,
  snapshot: false,
  transfer: false,
  withdrawal: false,
};

export class Bridge {
  private config?: Config;
  private _token?: string;
  private _userInfo?: Record<string, any>;
  private logger: ReturnType<typeof getLogger>;

  public constructor(config?: Config) {
    const { debug, logLevel } = config || {};
    if (debug !== void 0) logger.setDebug(debug);
    if (logLevel !== void 0) logger.setLevel(logLevel);

    this.config = config;
    this._token = void 0;
    this._userInfo = void 0;
    this.logger = getLogger();

    // public
    this.getContext = this.getContext.bind(this);
    this.reloadTheme = this.reloadTheme.bind(this);
    this.playlist = this.playlist.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.requestToken = this.requestToken.bind(this);
    this.getUserInfo = this.getUserInfo.bind(this);

    // private
    this.getCode = this.getCode.bind(this);
    this.handlerError = this.handlerError.bind(this);
  }

  /**
   * get the app version
   */
  public get version(): string | undefined {
    let app;
    try {
      app = this.getContext();
    } catch (err) {
      this.logger('version').info(err as Error);
    }

    return app?.app_version;
  }

  /**
   * get the code which be used to get access-token
   */
  public get code(): string | undefined {
    return this.getCode();
  }

  /**
   * get the code-verifier which be used to get access-token
   */
  public get codeVerifier(): string | null | undefined {
    return store.get('$_mixin-code-verifier');
  }

  /**
   * get conversation id
   */
  public get conversationId(): string | undefined {
    return this.getContext()?.conversation_id ?? void 0;
  }

  /**
   * get API support info
   */
  public get supportAPIs(): typeof SUPPORT_APIS {
    const res = { ...SUPPORT_APIS };

    if (this.isMixin) {
      const featVersion = {
        mixin: {
          address_add: 0,
          address_del: 0,
          conversation: 311,
          getContext: 0,
          getUserInfo: 0,
          login: 0,
          logout: 0,
          payment: 0,
          playlist: 300,
          popup_user: 0,
          popup_bot: 290,
          reloadTheme: 0,
          requestToken: 0,
          share_text: 0,
          share_image: 0,
          share_contact: 0,
          share_app_card: 0,
          share_live: 0,
          share_post: 0,
          showToast: 0,
          snapshot: 0,
          transfer: 0,
          withdrawal: 0
        },
        reborn: {
          address_add: 0,
          address_del: 0,
          conversation: 1121,
          getContext: 0,
          getUserInfo: 0,
          login: 0,
          logout: 0,
          payment: 0,
          playlist: 1100,
          popup_user: 0,
          popup_bot: 1100,
          reloadTheme: 0,
          requestToken: 0,
          share_text: 0,
          share_image: 0,
          share_contact: 0,
          share_app_card: 0,
          share_live: 0,
          share_post: 0,
          showToast: 0,
          snapshot: 0,
          transfer: 0,
          withdrawal: 0
        }
      };
      const verNum = +this.version!.split('.').join('');
      const featList = featVersion[this.isReborn ? 'reborn' : 'mixin'];
      Object.keys(featList).forEach(feat => {
        res[feat as keyof typeof res] = verNum >= featList[feat as keyof typeof res];
      });
    }

    return res;
  }

  /**
   * judgement whether or not in mixin or reborn app
   */
  public get isMixin(): boolean {
    const isIOS = env().isIOS;
    return !!(isIOS
      ? window?.webkit?.messageHandlers?.MixinContext
      : window?.MixinContext && typeof window?.MixinContext?.getContext === 'function');
  }

  /**
   * judgement whether or not in reborn app
   */
  public get isReborn(): boolean {
    return /XUEXI/.test(navigator.userAgent);
  }

  /**
 * get access token
 */
  public get token() {
    return this._token ?? store.get('$_mixin-token');
  }

  /**
   * get mixin app context
   */
  public getContext() {
    if (!this.isMixin) {
      this.logger('getContext').log('Please call in reborn or mixin app!');
      return;
    }

    try {
      let ctx = messager('getContext')();
      if (typeof ctx === 'string') {
        try {
          ctx = JSON.parse(ctx);
        } catch (err) {
          this.logger('getContext').info(err as Error);
        }
      }
      if (ctx) ctx.platform = ctx?.platform || (env().isIOS ? 'iOS' : 'Android');
      return ctx;
    } catch (err) {
      this.handlerError(err, 'getContext');
      return;
    }
  }

  /**
   * reload the theme according to theme-color
   */
  public reloadTheme() {
    if (!this.isMixin) {
      this.logger('reloadTheme').log('Please call in reborn or mixin app!');
      return;
    }

    try {
      const reloadTheme = messager('reloadTheme');
      env().isIOS ? reloadTheme('') : reloadTheme();
    } catch (err) {
      this.handlerError(err, 'reloadTheme');
    }
  }

  /**
   * call native message window
   * Android Only
   */
  public showToast(msg: string) {
    if (!this.isMixin) {
      this.logger('showToast').log('Please call in reborn or mixin app!');
      return;
    }

    try {
      messager('showToast')(msg);
    } catch (err) {
      this.handlerError(err, 'showToast');
    }
  }

  /**
   * play audio by mixin native player
   */
  public playlist(src: string[]) {
    if (!this.isMixin) {
      this.logger('playlist').log('Please call in reborn or mixin app!');
      return;
    }

    try {
      messager('playlist')(src);
    } catch (err) {
      this.handlerError(err, 'playlist');
    }
  }

  /**
   * go login page
   * @type { phone?: boolean | number; profile?: boolean | number; contacts?: boolean | number; assets?: boolean | number; snapshots?: boolean | number; messages?: boolean | number; code_challenge?: boolean; } AUTH
   */
  public login(auth: AUTH, params?: {
    oauth_url?: string;
    client_id?: string;
    redirect_url?: string;
    state?: string;
    code_challenge?: boolean;
  }) {
    const { client_id } = this.config || {};
    const cid = params?.client_id || client_id;
    if (!cid) {
      this.logger('login').warn('Please pass client_id first!');
      return;
    }
    getAccessCode({
      ...params,
      client_id: cid,
      auth
    });
  }

  /**
   * do logout
   * @param reload whether reload the page
   */
  public logout(reload = true) {
    store.clear('$_mixin-token');
    store.clear('$_mixin-code-verifier');
    store.clear('$_mixin-user-info');
    if (reload) window.location.reload();
  }

  /**
   * request access-token by code
   * @param params request params
   * @param persistence whether persist the code
   * @returns 
   */
  public requestToken(params?: {
    code?: string;
    client_id?: string;
    code_verifier?: string;
  }, persistence = true): Promise<string | null> {
    const { client_id: client_id_config } = this.config || {};
    const { code: code_params, code_verifier: code_verifier_params, client_id: client_id_params } = params || {};

    const client_id = client_id_params || client_id_config;
    const code = code_params || this.getCode();
    const code_verifier = code_verifier_params || store.get('$_mixin-code-verifier');

    if (!client_id || !code_verifier || !code) {
      this.logger('requestToken').warn('The request parameters which contain client_id, access_code and code_verifier is not correct!');
      return Promise.resolve(null);
    }

    return new Promise((resolve, reject) => {
      getAccessToken({
        code,
        code_verifier,
        client_id
      })
        .then(token => {
          this._token = token;
          if (persistence) store.set('$_mixin-token', token);
          resolve(token);
        })
        .catch(err => {
          this.handlerError(err, 'requestToken', 'get token failed!');
          reject(err);
        });
    });
  }

  /**
   * get user infomations by request https://api.mixin.one/me API
   */
  public getUserInfo(token: string = this.token ?? ''): Promise<Record<string, any> | null> {
    if (!token) {
      this.logger('getUserInfo').warn('The access_token is invalid!');
      return Promise.resolve(null);
    }

    try {
      const cache = store.get('$_mixin-user-info');
      const userInfo = this._userInfo ?? cache ? JSON.parse(cache!) : '';
      if (userInfo) {
        this.logger('getUserInfo').log('through cache!');
        return Promise.resolve(userInfo);
      }
    } catch (err) {
      this.logger('getUserInfo').info(err as Error);
    }

    this.logger('getUserInfo').log('http request!');
    return request({
      url: 'https://api.mixin.one/me',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      withCredentials: false
    }).then(res => {
      const data = res.data;
      if (data) {
        this._userInfo = data;
        store.set('$_mixin-user-info', JSON.stringify(data));
      }
      return data;
    });
  }

  /**
   * evoke payment checkout by generate pay scheme-url
   * @type { recipient: string; asset: string; amount: string; trace?: string; memo?: string | Record<string, string>; } PARAMS_PAYMENT
   */
  public payment(params: PARAMS_PAYMENT): { url?: string, params: PARAMS_PAYMENT } | undefined {
    return scheme.pay(params);
  }

  /**
   * evoke transfer checkout by generate pay scheme-url
   * @param recipient recipient id
   */
  public transfer(recipient: string): string | undefined {
    return scheme.transfer(recipient);
  }

  /**
   * evoke transfer detail by generate snapshots scheme-url
   * @type { trace_id?: string; snapshot_id?: string; } PARAMS_SNAPSHOTS
   */
  public snapshot(params: PARAMS_SNAPSHOTS): string | undefined {
    return scheme.snapshot(params);
  }

  /**
   * evoke withdrawal of an asset by generate withdrawal scheme-url
   * @type { address: string; asset: string; amount: string; trace?: string; memo?: string | Record<string, string>; } PARAMS_WITHDRAWAL
   */
  public withdrawal(params: PARAMS_WITHDRAWAL): { url?: string, params: PARAMS_WITHDRAWAL } | undefined {
    return scheme.withdrawal(params);
  }

  /**
   * evoke withdrawal-address action by generate address scheme-url
   * @param type 'add' | 'del'
   * @param params PARAMS_ADDRESS_ADD | PARAMS_ADDRESS_DELETE
   */
  public address(type: 'add', params: PARAMS_ADDRESS_ADD): string | undefined;
  public address(type: 'del', params: PARAMS_ADDRESS_DELETE): string | undefined;
  public address(type: 'add' | 'del', params: any): string | undefined {
    switch (type) {
      case 'add':
        return scheme.addWithdrawalAddress(params);
      case 'del':
        return scheme.delWithdrawalAddress(params);
    }
  }

  /**
   * evoke share action by generate share scheme-url
   * @param category 'text' | 'image' | 'contact' | 'app_card' | 'live' | 'post'
   * @param params string | PARAMS_SHARE_CARD | PARAMS_SHARE_LIVE
   */
  public share(category: 'text', txt: string): string | undefined;
  public share(category: 'image', url: string): string | undefined;
  public share(category: 'contact', user_id: string): string | undefined;
  public share(category: 'post', content: string): string | undefined;
  public share(category: 'app_card', params: PARAMS_SHARE_CARD): string | undefined;
  public share(category: 'live', params: PARAMS_SHARE_LIVE): string | undefined;
  public share(category: CATEGORY_SHARE, params: any): string | undefined {
    let shareAction;
    switch (category) {
      case 'text':
        shareAction = scheme.shareText;
        break;
      case 'post':
        shareAction = scheme.sharePost;
        break;
      case 'live':
        shareAction = scheme.shareLive;
        break;
      case 'image':
        shareAction = scheme.shareImage;
        break;
      case 'app_card':
        shareAction = scheme.shareCard;
        break;
      case 'contact':
        shareAction = scheme.shareContact;
        break;
    }
    return shareAction?.(params);
  }

  /**
   * evoke user or bot's pop-up by generate scheme-url
   * @param type 'user' | 'bot'
   * @param params user_id | PARAMS_POPUP_BOT
   */
  public popup(type: 'user', user_id: string): string | undefined;
  public popup(type: 'bot', params: PARAMS_POPUP_BOT): string | undefined;
  public popup(type: 'user' | 'bot', params: any): string | undefined {
    switch (type) {
      case 'user':
        return scheme.popupUser(params);
      case 'bot':
        return scheme.popupBot(params);
    }
  }

  /**
   * evoke conversation by generate conversations scheme-url
   * @param recipient conversation id
   */
  public conversation(conversation_id: string): string | undefined {
    return scheme.conversation(conversation_id);
  }

  private getCode() {
    const parseData = parseUrl(window.location.href);
    if (typeof parseData !== 'string') {
      const { hash, search } = parseData;
      const regExp = /code=([^&#]*)/g;
      const code = regExp.exec(search)?.[1] ?? regExp.exec(hash)?.[1];

      return code;
    }
  }

  private handlerError(err: any, prefix = '', msg = 'oops! some error has ocurred!') {
    let {
      // eslint-disable-next-line prefer-const
      message = '',
      stack = '',
      name = ''
    } = parseError(err);
    if (name) name = `(${name}): `;
    if (stack) stack = ` at ${stack}`;
    this.logger(prefix).error(`👇 ${msg} ❌`, '\n', name, message, stack);
  }
}

export default Bridge;
