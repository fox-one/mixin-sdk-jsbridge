# 开发
请使用 [lerna](https://lerna.js.org/) 结合 npm script 进行项目管理和开发

## 全局安装依赖
  ```shell
  npm i -g lerna yarn
  ```

## 初始化项目
  ```shell
  yarn bootstrap
  ```

## 开发服务
  - 启动 sdk 开发服务
    ```sh
    yarn dev
    ```

  - 启动 robot 开发服务
    ```sh
    yarn dev:robot
    ```

## 新建模板
  - 在 sdk 中新建一个模块
    ```sh
    yarn new
    ```

  - 在 robot 中新建一个组件
    ```sh
    yarn new:robot
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

  - 构建 robot 项目
    ```sh
    yarn build:robot
    ```

## 发布项目
  - 发布 sdk 项目
    ```sh
    yarn release
    ```

  - 发布 robot 项目
    ```sh
    git remote add rebot git@github.com:fox-one/mixin-sdk-jsbridge-rebot.git

    git fetch rebot

    git checkout -b rebot rebot/main && git checkout master
    
    yarn release:robot

    # 当切换到 rebot 分支后
    yarn release
    ```