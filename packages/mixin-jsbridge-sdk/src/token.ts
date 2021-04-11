import base64 from 'base64-js';
import sha256 from 'crypto-js/sha256';
import { request, strToUnitArray } from '@utils/index';


export type AUTH = {
  phone?: boolean;
  profile?: boolean;
  contacts?: boolean;
  assets?: boolean;
  snapshots?: boolean;
};

const AUTHSCOPE = {
  phone: 'PHONE%3AREAD',
  profile: 'PROFILE%3AREAD',
  contacts: 'CONTACTS%3AREAD',
  assets: 'ASSETS%3AREAD',
  snapshots: 'SNAPSHOTS%3AREAD'
};

function base64URLEncode(str: string) {
  return str
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

function generateRandomString(len: number) {
  let text = '';
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < len; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

export function getAccessCode(params: {
  client_id: string;
  redirect_url?: string;
  state?: string;
  auth?: AUTH;
}) {
  // eslint-disable-next-line prefer-const
  let { client_id, redirect_url, state, auth = {} } = params;
  const randomStr = generateRandomString(32);
  const randomCode = btoa(randomStr);
  // const randomArr = strToUnitArray(randomStr);
  // const hashArr = strToUnitArray(sha256(randomStr).toString());
  const verifier = base64URLEncode(randomCode);
  let challenge = base64URLEncode(sha256(randomCode).toString());
  localStorage.setItem('_mixin-code-verifier', verifier);

  let SCOPESTR = '';
  Object.keys(auth).forEach(scope => {
    const scopeValue = AUTHSCOPE[scope as keyof typeof AUTHSCOPE];
    if (!SCOPESTR)
      SCOPESTR = scopeValue;
    else
      SCOPESTR += `+${scopeValue}`;
  });

  client_id = client_id ? `&client_id=${client_id}` : '';
  redirect_url = redirect_url ? `&redirect_url=${redirect_url}` : '';
  SCOPESTR = SCOPESTR ? `&scope=${SCOPESTR}` : '';
  challenge = challenge ? `&code_challenge=${challenge}` : '';

  let url = `https://mixin-oauth.firesbox.com/?response_type=code${client_id}${redirect_url}${SCOPESTR}${challenge}`;
  if (state) {
    const str = encodeURIComponent(JSON.stringify(state));
    url += `&state=${str}`;
  }
  window.location.href = url;
}

export function getAccessToken(params: {
  code: string;
  client_id: string;
}) {
  const verifier = localStorage.getItem('_mixin-code-verifier');
  const data = { ...params, code_verifier: verifier };
  return request({
    url: 'https://mixin-api.zeromesh.net/oauth/token',
    method: 'POST',
    data
  })
    .success(res => res.access_token);
}