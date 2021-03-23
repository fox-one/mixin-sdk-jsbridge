# mixin-jsbridge-demo

## 快速开始 (quick start)
### 安装依赖 (Install dependencies)
```shell
yarn
```

### 启动项目 (Run project)
```shell
yarn start
```
or
```shell
yarn dev
```

### 新建组件 (Create a Component)
```shell
yarn new
```

*新建一个名为Button的函数组件 (Create a functional Component which name is Button) 👇*
```shell
yarn new Button -f
```

---

## 构建和发布 (Build and Release)
### 构建 (Build)
```shell
yarn build
```

*构建项目时绕过所有检查 (Bypass all pre-check before building) 👇*
```shell
yarn build -n
```

### 发布 (Release)
```shell
yarn release
```

*发布项目时忽略版本迭代 (Ignoring version of iteration) 👇*
```shell
yarn release -i
```

*发布项目时指定迭代的版本为0.3.25 (Manual specify version of iteration to 0.3.25) 👇*
```shell
yarn release -m 0.3.25
```

*发布项目时绕过所有检查 (Bypass all pre-check before release) 👇*
```shell
yarn release -n
```

**更多配置项请在 [omni.config.js](https://github.com/omni-door/cli/blob/master/docs/OMNI.zh-CN.md) 中编辑 (More powerful customizations is in [omni.config.js](https://github.com/omni-door/cli/blob/master/docs/OMNI.md))**
