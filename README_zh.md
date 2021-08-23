<center><p align="center"><img src="./tuya_logo.png" width="28%" height="28%" /></p></center>

IoT Portal（SaaS 开发框架前端项目）
===

[English](README.md) | 中文版

SaaS 开发框架，是涂鸦为 IoT SaaS 开发者提供的前、后端开源框架。该框架完全基于[涂鸦 OpenAPI](https://developer.tuya.com/cn/docs/cloud) 开发，集成了一个 IoT SaaS 必备的用户登录、角色权限、设备管理、设备控制等基本功能，并提供了基于 React 的前端 UI 界面（[Ant.Design](https://ant.design/)）。开发者只需基于源码做简单的二次开发，即可快速投入使用。

## 特性

- 📦 基于 [qiankun](https://qiankun.umijs.org/zh/guide) 框架，提供了更加开箱即用的 API；
- 📱 技术栈无关，任意技术栈的应用均可 使用/接入，不论是 React/Vue/Angular/JQuery 还是其他等框架；
- 💪 HTML Entry 接入方式，让你接入微应用像使用 iframe 一样简单；
- 🛡 样式隔离，确保微应用之间样式互相不干扰；
- 🧳 JS 沙箱，确保微应用之间 全局变量/事件 不冲突；
- ⚡️ 资源预加载，在浏览器空闲时间预加载未打开的微应用资源，加速微应用打开速度。

## 环境依赖

- [Node.js ≥ 12.0.0](https://nodejs.org/en/) （建议安装 LTS 版本）
- [Yarn](https://yarnpkg.com/)
    - 安装：`npm i yarn -g`
- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com) （可选，用于构建镜像）


##  如何使用

- [快速开始](./doc/Quick_start_zh.md)
- 阅读 [SaaS 开发框架](https://developer.tuya.com/cn/docs/iot/SaaSDevelopmentFramework?id=Kaps8jd0mowem)，可以了解完整的框架体系。
 

## 目录结构

```
. iot-portal
├── applications    ..................... 微应用项目集合
│   ├── account-app   ................... 子服务：账户管理
│   ├── asset-app   ..................... 子服务：资产管理
│   ├── device-app    ................... 子服务：设备管理
│   ├── main-app    ..................... 主服务
│   └── permission-app    ............... 子服务： 权限管理
├── bin   ............................... 命令脚本
│   ├── common.js
│   ├── server.js
│   └── sync.js
├── conf    ............................. Dockerfile 和 Nginx 配置
│   ├── Dockerfile
│   └── nginx.conf
├── dist    ............................. 构建后的静态资源
├── doc   ............................... 文档
└── setupProxy.js   ..................... API 转发代理
```


## 问题反馈

欢迎通过 [GitHub Issue](https://github.com/tuya/iot-portal/issues) 向我们反馈使用的问题和获得帮助。


## 开源协议

关于 License 的更多信息请查看 [MIT License](./LICENSE)。
