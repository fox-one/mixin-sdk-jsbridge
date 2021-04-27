# @foxone/mixin-sdk-jsbridge

[文档地址](https://fox-one.github.io/mixin-sdk-jsbridge/#/zh-CN)

[English](./README.md) | 简体中文

## 导航
- [快速开始](https://fox-one.github.io/mixin-sdk-jsbridge/#/zh-CN/1)

- [API](https://fox-one.github.io/mixin-sdk-jsbridge/#/zh-CN/2)

- [机器人](https://fox-one.github.io/mixin-sdk-jsbridge-debug/#/)

- [github](https://github.com/fox-one/mixin-sdk-jsbridge/tree/master/packages/mixin-jsbridge-sdk)

## 开发
请使用 [lerna](https://lerna.js.org/) 结合 npm script 进行项目管理和开发

## 全局安装依赖
  ```shell
  npm i -g lerna yarn
  ```

## 初始化项目
  ```shell
  lerna bootstrap && yarn
  ```

## 开发服务
  - 启动 sdk 开发服务
    ```sh
    yarn dev
    ```

  - 启动 demo 开发服务
    ```sh
    yarn dev:demo
    ```

## 新建模板
  - 在 sdk 中新建一个模块
    ```sh
    yarn new
    ```

  - 在 demo 中新建一个组件
    ```sh
    yarn new:demo
    ```

## 构建项目
  - 构建 sdk 项目
    ```sh
    yarn build
    ```

    - 构建 sdk 文档
    ```sh
    yarn build:doc
    ```

  - 构建 demo 项目
    ```sh
    yarn build:demo
    ```

## 发布项目
  - 发布 sdk 项目
    ```sh
    yarn release
    ```

  - 发布 demo 项目
    ```sh
    yarn release:demo
    ```