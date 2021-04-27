import { parseUrl } from 'peeler-js';
import messager from './messager';
import { getAccessCode, getAccessToken } from './token';
import { getLogger, parseError, env } from '@utils/index';
import { request } from '@utils/index';
/** import types */
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
   * 获取 app 上下文
   * @returns 
   */
  public getContext() {
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
    return this._token ?? localStorage.getItem('$_mixin-token');
  }

  /**
   * 跳转到授权登陆页
   * @param auth
   * @param params 
   * @returns 
   */
  public login(auth: AUTH, params?: {
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

  public logout(reload = true) {
    localStorage.removeItem('$_mixin-token');
    localStorage.removeItem('$_mixin-code-verifier');
    localStorage.removeItem('$_mixin-user-info');
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
    const code_verifier = code_verifier_params || localStorage.getItem('$_mixin-code-verifier');

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
          if (persistence) localStorage.setItem('$_mixin-token', token);
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
      const cache = localStorage.getItem('$_mixin-user-info');
      const userInfo = this._userInfo ?? cache ? JSON.parse(cache!) : '';
      if (userInfo) return Promise.resolve(userInfo);
    } catch (err) {
      this.logger('getUserInfo').info(err);
    }


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
        localStorage.setItem('$_mixin-user-info', JSON.stringify(data));
      }
      return data;
    });
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
