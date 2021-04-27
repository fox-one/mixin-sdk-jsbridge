import base64 from 'base64-js';
import EncBase64 from 'crypto-js/enc-base64';
import sha256 from 'crypto-js/sha256';
import { request, strToUnitArray } from '@utils/index';


export type AUTH = {
  phone?: boolean | number;
  profile?: boolean | number;
  contacts?: boolean | number;
  assets?: boolean | number;
  snapshots?: boolean | number;
  messages?: boolean | number;
};

export type SCOPE = keyof typeof AUTHSCOPE;

const AUTHSCOPE = {
  phone: 'PHONE:READ',
  profile: 'PROFILE:READ',
  contacts: 'CONTACTS:READ',
  assets: 'ASSETS:READ',
  snapshots: 'SNAPSHOTS:READ',
  messages: 'MESSAGES:REPRESENT'
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
  let { client_id, redirect_url = window.location.href, state, auth = {} } = params;
  const randomCode = generateRandomString(32);
  const randomArr = strToUnitArray(randomCode);
  let challenge;
  if (randomArr) {
    const verifier = base64URLEncode(base64.fromByteArray(randomArr));
    challenge = base64URLEncode(sha256(randomCode).toString(EncBase64));
    verifier && localStorage.setItem('$_mixin-code-verifier', verifier);
  }

  let SCOPESTR = '';
  Object.keys(auth).forEach(scope => {
    if (!auth[scope as SCOPE]) return;
    const scopeValue = AUTHSCOPE[scope as SCOPE];
    if (!SCOPESTR)
      SCOPESTR = scopeValue;
    else
      SCOPESTR += `+${scopeValue}`;
  });

  client_id = client_id ? `&client_id=${client_id}` : '';
  redirect_url = redirect_url ? `&redirect_url=${encodeURIComponent(redirect_url)}` : '';
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
  code_verifier: string;
}) {
  const data = { ...params };
  return request({
    url: 'https://mixin-api.zeromesh.net/oauth/token',
    method: 'POST',
    data,
    withCredentials: false
  })
    .then(res => res.data.access_token);
}