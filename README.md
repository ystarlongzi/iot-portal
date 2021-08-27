<center><p align="center"><img src="./tuya_logo.png" width="28%" height="28%" /></p></center>

IoT Portal（SaaS Development Framework Portal）
===

English | [中文版](README_zh.md)

The SaaS development framework is a front-end and back-end open source framework provided by Tuya for IoT SaaS developers. The framework is fully developed based on [Tuya OpenAPI](https://developer.tuya.com/en/docs/cloud) and integrates basic functions such as user login, role permissions, device management, and device control necessary for IoT SaaS. It also provides a React-based front-end UI interface ([Ant.Design](https://ant.design/)). Developers only need to do simple secondary development based on the source code, and they can quickly put it into use.


## Features

- 📦 Using the [qiankun](https://qiankun.umijs.org/zh/guide) framework to build and introduce a micro front-end architecture;
- 📱 Out of the box. Provides complete development tools; also built-in application management, permission management, device management, asset management and other basic micro-applications;
- 🌍 Support for multiple languages, with both Chinese and English available by default;
- 🦾 Optimized for secondary development: You can extend existing functions through micro-applications, and also support secondary development of built-in functions to meet specific business needs;
- 💡 Optimized for IoT environments. Based on the Tuya cloud platform and designed for IoT-type applications;
- 💼 Use yarn workspaces to manage packages of multi-apps.

## Environment dependency
- [Node.js ≥ 12.0.0](https://nodejs.org/en/) (It is recommended to install the LTS version)
- [Yarn](https://yarnpkg.com/)
    - Install CLI: `npm i yarn -g`
- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com) (Optional, used to build image)

##  How to use

- [Quick Start](./doc/Quick_start_zh.md)
- Read [SaaS Development Framework](https://developer.tuya.com/en/docs/iot/SaaSDevelopmentFramework?id=Kaps8jd0mowem) to understand the complete framework system.


## Feedback
Welcome to [GitHub Issue](https://github.com/tuya/iot-portal/issues) to give us feedback on issues and get help.

## License
[MIT](./LICENSE)
