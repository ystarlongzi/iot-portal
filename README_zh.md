<center><p align="center"><img src="./tuya_logo.png" width="28%" height="28%" /></p></center>

IoT Portal（SaaS 开发框架前端项目）
===

[English](README.md) | 中文版

SaaS 开发框架，是涂鸦为 IoT SaaS 开发者提供的前、后端开源框架。该框架完全基于[涂鸦 OpenAPI](https://developer.tuya.com/cn/docs/cloud) 开发，集成了一个 IoT SaaS 必备的用户登录、角色权限、设备管理、设备控制等基本功能，并提供了基于 React 的前端 UI 界面（[Ant.Design](https://ant.design/)）。开发者只需基于源码做简单的二次开发，即可快速投入使用。

## 特性

- 📦 使用 [qiankun](https://qiankun.umijs.org/zh/guide) 构建，引入微前端架构；
- 📱 开箱即用, 提供完善的开发工具；提供基础功能包含应用管理、权限管理、设备管理， 资产管理等基础微应用；
- 🌍 多语言 默认提供中英两种语言；
- 🦾 面向二次开发优化： 可以通过微应用方式扩展现有功能，也支持对内置功能二次开发满足特有业务需求；
- 💡 面向 IoT 基于涂鸦的云平台，专为物联网类应用设计；
- 💼 使用 Yarn workspace 管理多个子应用依赖。

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
