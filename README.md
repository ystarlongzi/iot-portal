<center><p align="center"><img src="./tuya_logo.png" width="28%" height="28%" /></p></center>

IoT Portal（SaaS 开发框架前端项目）
===

English | [中文版](README_zh.md)

The SaaS development framework is a front-end and back-end open source framework provided by Tuya for IoT SaaS developers. The framework is fully developed based on [Tuya OpenAPI](https://developer.tuya.com/en/docs/cloud) and integrates basic functions such as user login, role permissions, device management, and device control necessary for IoT SaaS. It also provides a React-based front-end UI interface ([Ant.Design](https://ant.design/)). Developers only need to do simple secondary development based on the source code, and they can quickly put it into use.


## Features

- 📦 Based on the [qiankun](https://qiankun.umijs.org/zh/guide) framework, provides a more out-of-the-box API;
- 📱 The technology stack is irrelevant, and any technology stack application can be used/accessed, whether it is React/Vue/Angular/JQuery or other frameworks;
- 💪 HTML Entry access method, allowing you to access micro applications as easy as using iframe;
- 🛡 Style isolation to ensure that the styles of micro-applications do not interfere with each other;
- 🧳 JS sandbox to ensure that global variables/events do not conflict between micro-applications;
- ⚡️ Resource pre-loading, pre-load the unopened micro-app resources during the idle time of the browser to speed up the opening speed of the micro-apps.


## Environment dependency
- [Node.js ≥ 12.0.0](https://nodejs.org/en/) (It is recommended to install the LTS version)
- [Yarn](https://yarnpkg.com/)
    - Install CLI: `npm i yarn -g`
- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com) (Optional, used to build image)

##  How to use

- [Quick Start](./doc/Quick_start_zh.md)
- Read [SaaS Development Framework](https://developer.tuya.com/en/docs/iot/SaaSDevelopmentFramework?id=Kaps8jd0mowem) to understand the complete framework system.

## Architecture

```
. iot-portal
├── applications    ..................... Micro applications
│   ├── account-app   ................... Sub app：account management
│   ├── asset-app   ..................... Sub app：asset management
│   ├── device-app    ................... Sub app：permission management
│   ├── main-app    ..................... Main app: base application
│   └── permission-app    ............... Sub app： permission management
├── bin   ............................... Command scripts
│   ├── common.js
│   ├── server.js
│   └── sync.js
├── conf    ............................. Dockerfile and NGINX configuration
│   ├── Dockerfile
│   └── nginx.conf
├── dist    ............................. Static resources after building
├── doc   ............................... Documentation
└── setupProxy.js   ..................... API service proxy configuration
```

## Feedback
Welcome to [GitHub Issue](https://github.com/tuya/iot-portal/issues) to give us feedback on issues and get help.

## License
[MIT](./LICENSE)
