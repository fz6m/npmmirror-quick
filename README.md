# npmmirror-quick

全方位转换到新的 [Taobao npm](https://npmmirror.com/) 源的快速工具。

## Install

```bash
  npm i -g npmmirror-quick
  # or
  yarn global add npmmirror-quick
  # or
  pnpm add -g npmmirror-quick
```

## Usage

在项目根目录下执行：

```bash
  nq
```

将自动进行三件事：

### 更新全局配置

更新全局 `npm` / `yarn` / `pnpm` 的 registry 设定到新 Taobao 源

### 更新 .npmrc

若该项目含有 `.npmrc` registry 配置，更新他为新 Taobao 源

### 更新 lock 文件

更新该项目的依赖锁定文件（不限 `package-lock.json` / `yarn.lock` / `pnpm-lock.yaml`，支持 monorepo 独立锁定文件）内的旧 Taobao 链接替换到新 Taobao 源链接

更新 lock 文件后，请删除 `node_modules`，重新执行一遍依赖安装确保依赖都可以下载正确。

## Options

### -f, --force

强制更新配置，两种情况下你需要使用该选项：

1. 使用本工具更新过一次全局配置，由于本工具只会设定一次，但是之后你又更改了全局源配置，还想让本工具帮你设定一次时。

2. 项目根目录下 `.npmrc` 内没有 `registry` 配置，或者他是一个非旧 Taobao 源的配置（比如私有源），你又想强制设定他为新 Taobao 源时。
