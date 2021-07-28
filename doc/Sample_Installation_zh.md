## 安装运行

- 环境依赖

  - [Node.js](https://nodejs.org/en/)（建议安装 LTS 版本）
  - [Git](https://git-scm.com/)
  - [Docker](https://www.docker.com) （可选，用于构建镜像）

- 下载代码：`git clone https://github.com/tuya/iot-portal.git`
  
  代码结构如下

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

### 准备工作

启动 SaaS 开发框架接口服务。
接口服务启动方法参见[本地运行 SaaS 开发框架后端项目](https://github.com/tuya/iot-suite-server/blob/4a14fbb61206fcec1c578b7fe9bf133439f1661d/README_zh.md)。

或者

使用[SaaS开发框架Docker镜像](https://developer.tuya.com/cn/docs/iot/SaaSDevelopmentFramework_Image?id=Kapsg7pttb8f2)启动SaaS开发框架后端服务

	**说明** 前端项目中默认请求的后端地址为 `http://localhost:8080`。

#### 步骤一：安装项目依赖

> 打开命令行工具

初始化项目快捷命令依赖
```bash
# 跳转到项目所在目录
cd path/to/iot-portal
# 安装项目依赖
npm install
or
# 如果有安装yarn
yarn
```

安装完成快捷命令依赖后，继续初始化子项目依赖
```bash
# 初始化所有子项目的依赖
npm run apps:install
```

#### 步骤二：编译前端项目

```bash
npm run build
```

#### 步骤三：启动http服务

> 目前http服务后台运行支持Mac，Linux用户, **其他系统**暂不支持后台长期运行
其他系统如需后台长期运行，请参考使用 `forever` 或者 `pm2` 等优秀的业界解决方案

```bash
# Mac or Linux
npm run start:server

# Other Systems
npm run start
```
项目默认监听 `8888` 端口，在后端服务运行后

> 说明： http 服务提供静态文件托管和api状态能力，
静态托管文件的目录为 {project}/dist，
api 默认转发到 `http://localhost:8080`
具体实现请查看 {project}/server/index.js
