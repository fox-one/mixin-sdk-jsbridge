import { parseUrl } from 'peeler-js';
import messager from './messager';
import { getAccessCode, getAccessToken } from './token';
import scheme from './scheme';
import { getLogger, parseError, env, request, store } from '@utils/index';
/** import types */
import type { PARAMS_PAYMENT } from './scheme';
import type { AUTH } from './token';

interface Config {
  client_id?: string;
}
export class Bridge {
  private config?: Config;
  private _token?: string;
  private _userInfo?: Record<string, any>;
  private logger: ReturnType<typeof getLogger>;

  public constructor(config?: Config) {
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
   * 获取当前 jsbridge 版本号
   */
  public get version(): string {
    let pkj;
    try {
      pkj = require('../package.json');
    } catch (err) {
      this.logger('version').info(err);
    }

    return pkj?.version ?? 'unknown';
  }

  /**
   * 获取 conversation id
   */
  public get conversationId(): string | undefined {
    return this.getContext()?.conversation_id ?? void 0;
  }

  /**
   * 判断 Mixin 环境
   */
  public get isMixin(): boolean {
    const isIOS = env().isIOS;
    return !!(isIOS
      ? window?.webkit?.messageHandlers?.MixinContext
      : window?.MixinContext && typeof window?.MixinContext?.getContext === 'function');
  }

  /**
   * 获取 app 上下文
   * @returns 
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
        } catch (e) {
          this.logger('getContext').info(e);
        }
      }
      if (ctx) ctx.platform = ctx?.platform || (env().isIOS ? 'iOS' : 'Android');
      return ctx;
    } catch (err) {
      this.handlerError(err, 'getContext');
      return null;
    }
  }

  /**
   * 重载
   */
  public reloadTheme() {
    if (!this.isMixin) {
      this.logger('reloadTheme').log('Please call in reborn or mixin app!');
      return;
    }

    try {
      messager('reloadTheme')();
    } catch (err) {
      this.handlerError(err, 'reloadTheme');
    }
  }

  /**
   * 打开播放列表
   * @param src 
   * @returns 
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
   * 获取 access token
   */
  public get token() {
    return this._token ?? store.get('$_mixin-token');
  }

  /**
   * 跳转到授权登陆页
   * @param auth
   * @param params 
   * @returns 
   */
  public login(auth: AUTH, params?: {
    oauth_url?: string;
    client_id?: string;
    redirect_url?: string;
    state?: string;
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
   * 登出
   * @param reload 是否重载页面
   */
  public logout(reload = true) {
    store.clear('$_mixin-token');
    store.clear('$_mixin-code-verifier');
    store.clear('$_mixin-user-info');
    if (reload) window.location.reload();
  }

  /**
   * 根据 code 换取 access token
   * @param params 
   * @param persistence 
   * @returns 
   */
  public requestToken(params?: {
    code?: string;
    client_id?: string;
    code_verifier?: string;
  }, persistence = true): Promise<string | null> {
    const { client_id: client_id_config } = this.config || {};
    const { code: code_params, code_verifier: code_verifier_params, client_id: client_id_params } = params || {};
    const code_url = this.getCode();

    const client_id = client_id_params || client_id_config;
    const code = code_params || code_url;
    const code_verifier = code_verifier_params || store.get('$_mixin-code-verifier');

    if (!client_id || !code_verifier || !code) {
      this.logger('getToken').warn('The request parameters which contain client_id, access_code and code_verifier is not correct!');
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
        .catch(err => this.handlerError(err, 'getToken', 'get token failed!'));
    });
  }

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
      this.logger('getUserInfo').info(err);
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

  public payment(params: PARAMS_PAYMENT): boolean {
    if (!this.isMixin) {
      this.logger('payment').log('Please call in reborn or mixin app!');
      return false;
    }

    const url = scheme.pay(params);

    return !!url;
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
