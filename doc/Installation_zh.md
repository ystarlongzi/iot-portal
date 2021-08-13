# 开始

## 前言

本仓库提供的管理控制台是基于 `Tuya IoT Cloud` ，如无二次开发定制需求，可通过 `Docker` 镜像做本地私有化部署，[Docker 镜像地址](https://hub.docker.com/r/iotportal/iot-suite)

## 开发环境

1. 安装 [Node](https://nodejs.org/) ，请确保版本不低于 V12

2. 安装 [Yarn](https://yarnpkg.com/)

   ```
   npm install -g yarn
   ```

3. 如果是大陆用户，请更换 yarn 默认仓库地址，其他地区用户请忽略

   ```
   yarn config set registry https://registry.npm.taobao.org/
   ```

## 快速体验

1. 克隆 SaaS 开发框架代码仓库到本地

   ```
   git clone https://github.com/tuya/iot-portal.git
   ```

2. 进入根目录 iot-portal,执行如下命令：

   ```
   yarn
   ```

   安装相关依赖

3. 根目录下 iot-portal,执行如下命令：

   ```
   yarn build
   ```

   构建打包相关微应用

4. 跟目录下 iot-portal,执行如下命令：

   ```
   yarn start
   ```

   注（假设后端服务地址为：http://localhost:8080,如何启动后端服务,请参考 [iot-server](https://github.com/tuya/iot-server)）
