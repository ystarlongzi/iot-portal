# 快速开始

## 环境依赖

- [Node.js](https://nodejs.org/en/) ， 建议安装 LTS 版本
- Git, 用来 clone 代码
- [Docker](https://www.docker.com)， 可选， 用于构建镜象
- 可用的后端 API 服务

## 下载代码

```bash
git clone git@github.com:tuya/iot-portal.git
```

### 代码结构
```
- iot-portal 开发框架前端应用
  - /main-app 微应用：基座应用
  - /account-app 微应用：账户管理
  - /asset-app 微应用：资产管理
  - /permission-app 微应用： 权限管理
  - /device-app 微应用：设备管理
  - /doc 文档
  - /conf Dockerfile 和 nginx 配置
  - /bin 命令脚本
  - /dist 构建后的静态资源
```
## 启动接口服务

在启动主应用之前，请确保后端服务已启动，配套后端项目请访问 [iot-suite-server](https://github.com/tuya/iot-suite-server/blob/feat_doc/README_zh.md)

前端项目中默认请求的后端地址为 http://localhost:8080


## 调试微应用

调试微应用的整体步骤：

1. 启动基座微应用 main-app, 默认端口为 http://localhost:3000
2. 启动需要调试的微应用，每个微应用端口不一定
3. 通过主应用代理加载子应用资源进行调试

微前端的架构，每个应用均为独立项目，有自己的独立依赖， 举个例子，如果要调试账户管理 `accont-app`， 可按下面步骤进行。

### 第一步 检查代理配置

检查 `/main-app/src/setupProxy.js`， 确保后端代理接口配置正确并启动， 确保要调试的微应用的端口配置正确；


### 第二步 启动子应用

```bash
cd account-app # 进入需要调试的子应用
npm install #安装依赖，只需执行一次
npm run start # 启动调试服务
```

### 第三步 启动主应用

```bash
cd main-app # 进入微应用
npm install #安装依赖，只需执行一次
npm run start # 启动调试服务
```

启动之后， 调试页面（端口：3000）会自动打开， 开始微应用开发之旅吧；

## 构建和发布

我们提供一些便捷的指令， 来构建完整的应用

```bash
cd path/to/iot-portal  # 回到根目录
npm install # 安装必要的依赖工具
npm run apps:install # 依次为所有子应用安装依赖
npm run apps:build # 依次构建所有子应用
npm run sync # 所有构建文件都拷贝到到 /dist

docker build -f conf/Dockerfile . -t iot-portal-fe # 构建docker镜象， 可选

```
