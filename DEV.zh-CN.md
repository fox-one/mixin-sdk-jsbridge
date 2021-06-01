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

  - 启动 bot 开发服务
    ```sh
    yarn dev:bot
    ```

## 新建模板
  - 在 sdk 中新建一个模块
    ```sh
    yarn new
    ```

  - 在 bot 中新建一个组件
    ```sh
    yarn new:bot
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

  - 构建 bot 项目
    ```sh
    yarn build:bot
    ```

## 发布项目
  - 发布 sdk 项目
    ```sh
    yarn release
    ```

  - 发布 bot 项目
    ```sh
    git remote add bot git@github.com:fox-one/mixin-sdk-jsbridge-bot.git

    git fetch bot

    git checkout -b bot bot/main && git checkout master
    
    yarn release:bot

    # 当切换到 bot 分支后
    yarn release
    ```