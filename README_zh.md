<center><p align="center"><img src="./tuya_logo.png" width="28%" height="28%" /></p></center>

IOT Portal（SaaS开发框架前端项目）
===

[English](README.md) | [中文版](README_zh.md)


SaaS 开发框架，是涂鸦为 IoT SaaS 开发者提供的前、后端开源框架。该框架完全基于涂鸦 OpenAPI 开发，集成了一个 IoT SaaS 必备的用户登录、角色权限、设备管理、设备控制等基本功能，并提供了基于 React（Ant.Design）的前端 UI 界面。开发者只需基于源码做简单的二次开发，即可快速投入使用。


##  如何使用 IOT Portal
  我们为您准备了一篇[快速入门IOT Portal](https://developer.tuya.com/cn/docs/iot/SaaSDevelopmentFramework_ftontend?id=Kaqcwpn4p8guu)的文档

  您也可以了解完整的 SaaS 开发框架体系[SaaS 开发框架](https://developer.tuya.com/cn/docs/iot/SaaSDevelopmentFramework?id=Kaps8jd0mowem)的文档

## IOT Portal 目录结构

```
- iot-portal 开发框架前端应用
  - /applications 微应用项目集合
    - /main-app 主服务
    - /account-app 子服务：账户管理
    - /asset-app 子服务：资产管理
    - /permission-app 子服务： 权限管理
    - /device-app 子服务：设备管理
  - /doc 文档
  - /conf Dockerfile 和 nginx 配置
  - /bin 命令脚本
  - /dist 构建后的静态资源
  - /server http服务：提供静态文件托管服务和api转发代理
```


## 特性
📦 基于 [qiankun](https://qiankun.umijs.org/zh/guide) 框架，提供了更加开箱即用的 API。
📱 技术栈无关，任意技术栈的应用均可 使用/接入，不论是 React/Vue/Angular/JQuery 还是其他等框架。
💪 HTML Entry 接入方式，让你接入微应用像使用 iframe 一样简单。
🛡​ 样式隔离，确保微应用之间样式互相不干扰。
🧳 JS 沙箱，确保微应用之间 全局变量/事件 不冲突。
⚡️ 资源预加载，在浏览器空闲时间预加载未打开的微应用资源，加速微应用打开速度。


## 问题反馈

您可以通过`GitHub Issue`向我们反馈使用的问题和获得帮助。


## License

关于License的更多信息请查看[MIT License](./LICENSE)。
