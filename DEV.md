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
    git remote add rebot git@github.com:fox-one/mixin-sdk-jsbridge-rebot.git

    git fetch rebot

    git checkout -b rebot rebot/main && git checkout master
    
    yarn release:robot

    # when check into rebot branch
    yarn release
    ```