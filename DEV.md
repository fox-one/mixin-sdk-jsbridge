# Dev
Please use [lerna](https://lerna.js.org/) and `npm script` to management and development the project

## install dependencies to global
  ```shell
  npm i -g lerna yarn
  ```

## init
  ```shell
  yarn bootstrap
  ```

## dev
  - start sdk server
    ```sh
    yarn dev
    ```

  - start bot server
    ```sh
    yarn dev:bot
    ```

## new
  - create a module for sdk
    ```sh
    yarn new
    ```

  - create a component for bot
    ```sh
    yarn new:bot
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

  - build bot project
    ```sh
    yarn build:bot
    ```

## release
  - release sdk project
    ```sh
    yarn release
    ```

  - release bot project
    ```sh
    git remote add bot git@github.com:fox-one/mixin-sdk-jsbridge-bot.git

    git fetch bot

    git checkout -b bot bot/main && git checkout master
    
    yarn release:bot

    # when check into bot branch
    yarn release
    ```