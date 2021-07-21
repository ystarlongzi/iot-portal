<center><p align="center"><img src="./tuya_logo.png" width="28%" height="28%" /></p></center>

SaaS Development Framework Portal
===


[English](README.md) | [中文版](README_zh.md)

本文将介绍如何在本地配置运行 IoT Suite 的前端项目，基于此您可以进行二次开发自己业务。如无二次开发定制需求，可通过 `Docker` 镜像做本地私有化部署，[Docker 镜像地址](https://hub.docker.com/r/iotportal/iot-suite) 和 [IoT Suite 后端 GitHub 源码地址](https://github.com/tuya/iot-portal/blob/feature/doc1/doc/Quick_Start_zh.md)。


## 准备工作

- 启动 IoT Suite 接口服务。接口服务启动方法参见[本地运行 IoT Suite 后端项目](https://github.com/tuya/iot-suite-server/blob/4a14fbb61206fcec1c578b7fe9bf133439f1661d/README_zh.md)。

	>**说明：** 前端项目中默认请求的后端地址为 `http://localhost:8080`。

- 环境依赖

	- [Node.js](https://nodejs.org/en/)（建议安装 LTS 版本）
	- [Git](https://git-scm.com/)
	- [Docker](https://www.docker.com) （可选，用于构建镜像）

- 下载代码：`git clone https://github.com/tuya/iot-portal.git`
	代码结构如下
	
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


## 调试微应用

微前端的架构，每个应用均为独立项目需要配置独立的依赖。本文以调试账户管理 `accont-app` 为例为您介绍调试流程。

### 步骤一：检查代理配置

检查 `/main-app/src/setupProxy.js`， 确保后端代理接口配置 `http://localhost:8080` 正确并启动，确保要调试的微应用的端口配置正确。

![proxy](https://images.tuyacn.com/content-platform/hestia/16256221248a0d1839b83.png)


### 步骤二：启动微应用
启动需要调试的微应用。

```bash
cd account-app # 进入需要调试的子应用
npm install #安装依赖，只需执行一次
npm run start # 启动调试服务
```

### 步骤三：启动主应用
通过主应用代理加载子应用资源进行调试。启动基座微应用 main-app， 默认打开端口 `http://localhost:3000`。

```bash
cd main-app # 进入微应用
npm install #安装依赖，只需执行一次
npm run start # 启动调试服务
```

## 构建和发布

我们提供一些便捷的指令，来构建完整的应用。

```bash
cd path/to/iot-portal  # 回到根目录
npm install # 安装必要的依赖工具
npm run apps:install # 依次为所有子应用安装依赖
npm run apps:build # 依次构建所有子应用
npm run sync # 所有构建文件都拷贝到到 /dist
docker build -f conf/Dockerfile . -t iot-portal-fe # 构建 Docker镜象， 可选

```

构建后的文件如下：
![image.png](https://airtake-public-data-1254153901.cos.ap-shanghai.myqcloud.com/content-platform/hestia/1626091739258c52fc8e0.png)