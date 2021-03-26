import { parseUrl } from 'peeler-js';
import messager from './messager';
import { getAccessCode, getAccessToken } from './token';
import { getLogger, parseError } from '@utils/index';
/** import types */
import type { AUTH } from './token';

interface Config {
  client_id?: string;
}
export class Bridge {
  private config?: Config;
  private _token?: string;
  private logger: ReturnType<typeof getLogger>;

  public constructor(config?: Config) {
    this.config = config;
    this._token = void 0;
    this.logger = getLogger();

    this.login = this.login.bind(this);
    this.getToken = this.getToken.bind(this);
    this.handlerError = this.handlerError.bind(this);
  }

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

  public getToken(params?: {
    code?: string;
    client_id?: string;
    persistence?: boolean;
  }) {
    const { client_id: client_id_config } = this.config || {};
    const { code: code_params, client_id: client_id_params, persistence } = params || {};
    const code_url = this.getCode();

    const client_id = client_id_params || client_id_config;
    const code = code_params || code_url;
    if (!client_id || !code) {
      const msg_part = !client_id && !code ? 'client_id and code' : !client_id ? 'client_id' : 'code';
      this.logger('getToken').warn(`Please pass ${msg_part} first!`);
      return;
    }

    return new Promise((resolve, reject) => {
      getAccessToken({
        code,
        client_id
      })
        .then(token => {
          this._token = token;
          if (persistence) {
            localStorage.setItem('token', token);
          }
          resolve(token);
        })
        .catch(err => this.handlerError(err, 'getToken', 'get token failed!'));
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
    const {
      message,
      stack,
      name
    } = parseError(err);
    this.logger(prefix).error(`👇 ${msg} ❌`, '\n', name, message, stack);
  }
}

export default Bridge;
