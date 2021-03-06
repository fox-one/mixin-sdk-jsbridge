# @foxone/mixin-sdk-jsbridge

[![NPM downloads](http://img.shields.io/npm/dm/%40foxone%2Fmixin-sdk-jsbridge.svg?style=flat-square)](https://www.npmjs.com/package/@foxone/mixin-sdk-jsbridge)
[![npm version](https://badge.fury.io/js/%40foxone%2Fmixin-sdk-jsbridge.svg)](https://badge.fury.io/js/%40foxone%2Fmixin-sdk-jsbridge)
[![install size](https://packagephobia.now.sh/badge?p=%40foxone%2Fmixin-sdk-jsbridge)](https://packagephobia.now.sh/result?p=%40foxone%2Fmixin-sdk-jsbridge)
[![license](http://img.shields.io/npm/l/%40foxone%2Fmixin-sdk-jsbridge.svg)](https://github.com/fox-one/mixin-sdk-jsbridge/blob/master/LICENSE)

English | [简体中文](./README.zh-CN.md)

## Introduction
The Js Bridge SDK base on Mixin Eco.

There is a [bot](https://fox-one.github.io/mixin-sdk-jsbridge-bot/#/) which use the sdk.

You can search `7000103847` in Mixin Messenger or Reborn App to find it.

For more details, please read the [Documentation](https://fox-one.github.io/mixin-sdk-jsbridge/#/)

## Install

### NPM
```shell
npm install -S @foxone/mixin-sdk-jsbridge
# or
yarn add @foxone/mixin-sdk-jsbridge
```

`src/index.ts`：
```typescript
import Bridge from '@foxone/mixin-sdk-jsbridge';

const bridge = new Bridge();

bridge.getContext();

// ……
```

### CDN

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello MXBridge</title>
  </head>
  <body>
    <button onclick="goLogin()">login</button>
  </body>
  <script src="https://unpkg.com/@foxone/mixin-sdk-jsbridge@latest/umd/mixin.bridge.min.js"></script>
  <script>
    function goLogin () {
      const { Bridge } = $MXBridge;
      const bridge = new Bridge({
        client_id: '86cf39ad-4e63-46c6-a6db-90cea8d05c1d'
      });
      bridge.login({
        phone: true,
        assets: true
      });
    }
  </script>
</html>
```

## Dev
For debugging or maintenance, you can clone the whole git repository and then start the project.

```shell
git clone --depth 1 git@github.com:fox-one/mixin-sdk-jsbridge.git

cd mixin-sdk-jsbridge

npm i -g lerna yarn

yarn bootstrap

yarn dev
```

[More Detials](./DEV.md)