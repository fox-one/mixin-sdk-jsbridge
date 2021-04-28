# @foxone/mixin-sdk-jsbridge

[Documentation](https://fox-one.github.io/mixin-sdk-jsbridge/#/)

English | [简体中文](./README.zh-CN.md)

## Nav
- [Quick Start](https://fox-one.github.io/mixin-sdk-jsbridge/#/1)

- [API](https://fox-one.github.io/mixin-sdk-jsbridge/#/2)

- [rebot](https://fox-one.github.io/mixin-sdk-jsbridge-rebot/#/)

- [github](https://github.com/fox-one/mixin-sdk-jsbridge/tree/master/packages/sdk)

## Dev
Please use [lerna](https://lerna.js.org/) and `npm script` to management and development the project

## install dependencies to global
  ```shell
  npm i -g lerna yarn
  ```

## init
  ```shell
  lerna bootstrap && yarn
  ```

## dev
  - start sdk server
    ```sh
    yarn dev
    ```

  - start robot server
    ```sh
    yarn dev:robot
    ```

## new
  - create a module for sdk
    ```sh
    yarn new
    ```

  - create a component for robot
    ```sh
    yarn new:robot
    ```

## build
  - build sdk project
    ```sh
    yarn build
    ```

    - build sdk project document
    ```sh
    yarn build:doc
    ```

  - build robot project
    ```sh
    yarn build:robot
    ```

## release
  - release sdk project
    ```sh
    yarn release
    ```

  - release robot project
    ```sh
    yarn release:robot
    ```