# @foxone/mixin-sdk-jsbridge

[English](./README.md) | 简体中文

### 介绍
一个基于 Mixin 生态的 JSBridge SDK。

有一个 [机器人](https://fox-one.github.io/mixin-sdk-jsbridge-rebot/#/) 使用了这个 SDK 为例子。

在 Mixin 或者 新生 App 中，搜索 `7000103847` 可以找到它。

更多的细节, 可以阅读 [文档](https://fox-one.github.io/mixin-sdk-jsbridge/#/zh-CN)


### 安装

```shell
yarn add @foxone/mixin-sdk-jsbridge
```

### 使用
`src/index.ts`：
```typescript
import Bridge from '@foxone/mixin-sdk-jsbridge';

const bridge = new Bridge({
  client_id: '此处填你的 mixin 机器人 id'
});

bridge.getContext();

// ……
```

### 开发
对于调试或维护，可以将项目 clone 到本地，然后启动项目：

```shell
git clone --depth 1 git@github.com:fox-one/mixin-sdk-jsbridge.git

cd mixin-sdk-jsbridge

npm i -g lerna yarn

yarn bootstrap

yarn dev
```

[更多详情](./DEV.zh-CN.md)