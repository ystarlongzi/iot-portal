<center><p align="center"><img src="./tuya_logo.png" width="28%" height="28%" /></p></center>

SaaS Development Framework Portal
===


[English](README.md) | [中文版](README_zh.md)


SaaS 开发框架，是涂鸦为 IoT SaaS 开发者提供的前、后端开源框架。该框架完全基于涂鸦 OpenAPI 开发，集成了一个 IoT SaaS 必备的用户登录、角色权限、设备管理、设备控制等基本功能，并提供了基于 React（Ant.Design）的前端 UI 界面。开发者只需基于源码做简单的二次开发，即可快速投入商用。

本文将介绍如何在本地配置运行 SaaS Development Framework 的前端项目，基于此您可以进行二次开发自己业务。如无二次开发定制需求，可通过 `Docker` 镜像做本地私有化部署，[Docker 镜像地址](https://hub.docker.com/r/iotportal/iot-suite) 和 [IoT Suite 后端 GitHub 源码地址](https://github.com/tuya/iot-portal/blob/feature/doc1/doc/Quick_Start_zh.md)。

## 文档

- [安装运行](./doc/Sample_Installation_zh.md)
- [调试开发](./doc/Sample_Dev_zh.md)
- [简易教程](https://developer.tuya.com/cn/docs/iot/SaaSDevelopmentFramework_ftontend?id=Kaqcwpn4p8guu)


## 特性

📦 基于 [qiankun](https://qiankun.umijs.org/zh/guide) 框架，提供了更加开箱即用的 API。
📱 技术栈无关，任意技术栈的应用均可 使用/接入，不论是 React/Vue/Angular/JQuery 还是其他等框架。
💪 HTML Entry 接入方式，让你接入微应用像使用 iframe 一样简单。
🛡​ 样式隔离，确保微应用之间样式互相不干扰。
🧳 JS 沙箱，确保微应用之间 全局变量/事件 不冲突。
⚡️ 资源预加载，在浏览器空闲时间预加载未打开的微应用资源，加速微应用打开速度。

## 技术支持

- [Tuya开发者中心](https://developer.tuya.com/cn/docs/iot/SaaSDevelopmentFramework?id=Kaps8jd0mowem)

## 问题反馈

请使用`GitHub Issue`向我们反馈


## License

[MIT License](./LICENSE)
