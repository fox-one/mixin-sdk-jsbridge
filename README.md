# @foxone/mixin-sdk-jsbridge

English | [简体中文](./README.zh-CN.md)

### Introduction
The Js Bridge SDK base on Mixin Eco.

There is a [rebot](https://fox-one.github.io/mixin-sdk-jsbridge-rebot/#/) which use the sdk.

You can search `7000103847` in Mixin Messenger or Reborn App to find it.

For more details, please read the [Documentation](https://fox-one.github.io/mixin-sdk-jsbridge/#/)

### Install

```shell
yarn add @foxone/mixin-sdk-jsbridge
```

### Usage
`src/index.ts`：
```typescript
import Bridge from '@foxone/mixin-sdk-jsbridge';

const bridge = new Bridge({
  client_id: 'your mixin rebot id'
});

bridge.getContext();

// ……
```

### Dev
For debugging or maintenance, you can clone the whole git repository and then start the project.

```shell
git clone --depth 1 git@github.com:fox-one/mixin-sdk-jsbridge.git

cd mixin-sdk-jsbridge

npm i -g lerna yarn

yarn bootstrap

yarn dev
```

[More Detials](./DEV.md)