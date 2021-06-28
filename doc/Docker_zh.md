# 使用IoT Suite控制Tuya IoT设备

IoT Suite 是基于涂鸦云OpenAPI开发的网页版 IoT 控制台 demo 应用，以 Docker 镜像形式提供。通过 IoT Suite，您可以实现资产管理、设备管理、设备控制等基本功能。
#### 作为涂鸦开源体系的一环，IoT Suite 的前端、后端部分将陆续开源到 Github，并持续迭代。
![image](https://images.tuyacn.com/op/cloud_dev_plat/saas_dev_frwk/Overview1.jpg)

## 更新日志

| Tag | 日期 | 更新内容 |
| --- | --- | --- |
| latest | 2021.06.23 | 和最新版 1.1.2 保持一致 |
| 1.1.2 | 2021.06.23 | 增加用户管理、增加角色和权限模块 |
| 1.1.1 | 2021.05.28 | 增加对找回密码的支持，设备管理 UI 更新 |
| 1.0.2 | 2021.05.02 | 支持资产管理、设备管理、用户登录/登出 |

## Docker Hub 地址
https://hub.docker.com/r/iotportal/iot-suite

## 1. 前置条件

### 1.1 Docker 环境

该应用通过 Docker 镜像形式部署，需要 Docker 运行环境。如果您使用的是 PC 或 Mac，建议您根据 Docker 官方指引[安装 Docker Desktop](https://docs.docker.com/desktop/)。

### 1.2 在涂鸦IoT平台创建云开发项目

该应用使用涂鸦 OpenAPI 开发，您需要在涂鸦 IoT 平台的云开发页面创建一个"自定义开发"类型的云开发项目。在创建项目时，您可用根据自己的需求选择可用区域，IoT Suite 在镜像部署时也需要将可用区域作为配置参数。
![create project](https://images.tuyacn.com/op/cloud_dev_plat/saas_dev_frwk/creat-project1.jpg)

只有授权给云开发项目的 API 才能被调用。您可以在创建项目的过程中为项目批量授权 API，也可以在项目创建后手动开通并授权 API。目前最新版本（1.1.1）IoT Suite 需要用到的 API 产品包括:

| API产品 | IoT Suite相关功能 |
| --- | --- |
| 授权管理  | Basic API |
| 行业通用资产管理 | 资产管理页面 |
| 行业通用设备管理 | 设备管理页面 |
| 行业通用设备控制 | 设备控制功能 |
| 行业通用设备状态查询 | 设备控制功能 |
| 行业通用用户管理 | 登录，登出，重置密码，用户管理 |
| 行业通用权限管理 | 角色权限功能 |
| 邮件服务 | 获取重置密码的验证码 |
| 短信服务 | 获取重置密码的验证码 |

![authorize API](https://images.tuyacn.com/op/cloud_dev_plat/saas_dev_frwk/AuthorizeAPI.jpg)

在创建项目的过程中，您创建的用户可被用于登录IoT Suite，您创建的资产可用于设备管理。在创建这些信息时，您需要选择数据保存的可用区。IoT Suite 镜像的运行态不支持多数据中心，在 IoT Suite 镜像部署时只能选择一个可用区作为配置参数，因此请根据您的业务所在区域选择此处的可用区，以确保 IoT Suite 镜像部署后可以访问到对应区域的数据。

![initialize](https://images.tuyacn.com/op/cloud_dev_plat/saas_dev_frwk/initialize.jpg)


此外，您需要在“应用”页面中获取云应用对应的 Access ID 和 Access Secret，并获取当前项目页面URL地址中的项目id(以小写字母p开头)，这三个参数将会在IoT Suite 镜像部署时用到。
![Parameters](https://images.tuyacn.com/op/cloud_dev_plat/saas_dev_frwk/Parameters.jpg)


## 2. 镜像部署

在安装好 Docker Desktop 或其他 Docker 环境后，使用 Windows 的 CMD 工具或者 Mac/Linux 的终端工具，通过以下命令下载 Docker 镜像。

```
docker pull iotportal/iot-suite:latest
```

镜像镜像下载完成后，请通过以下命令运行镜像。

```
docker run --name iot -d -p 80:80 --env-file ./iot-suite.env iotportal/iot-suite:latest
```

其中 ./iot-suite.env 是 IoT Suite 镜像部署的环境配置文件的本地绝对路径。iot-suite.env的内容如下：

```
-- 必填
AK=
SK=
PC=
PERMISSION_SPACE_OWNER=
PERMISSION_SPACE_GROUP=
PERMISSION_SPACE_CODE=
-- 非必填
REGION=
SMS_TEMPLATEID_CN=
SMS_TEMPLATEID_EN=
MAIL_TEMPLATEID_CN=
MAIL_TEMPLATEID_EN=
```

环境变量释义：
| 变量名 | 含义 | 示例 | 是否必需 |
| --- | --- | --- | --- |
| AK | Access ID | qyp5t3********vzp7b1 | 是 |
| SK | Access Secret | 1048e7f02****************55168 | 是 |
| PC | 项目ID | p1616********7dmk | 是 |
| PERMISSION_SPACE_OWNER | 空间 owner | yourname | 是 |
| PERMISSION_SPACE_GROUP | 空间组织id 填写projectcode | p1616********7dmk | 是 |
| PERMISSION_SPACE_CODE | 空间code 填写clientId | qyp5t3********vzp7b1 | 是 |
| REGION | 可用区域，目前支持CN、US、EU、IN | CN | 否 |
| SMS_TEMPLATEID_CN | 中文短信模板ID | SMS_458****330 | 否 |
| SMS_TEMPLATEID_EN | 英文短信模板ID | SMS_911****540 | 否 |
| MAIL_TEMPLATEID_CN | 中文邮件模板ID | MAIL_605****151 | 否 |
| MAIL_TEMPLATEID_EN | 英文邮件模板ID | MAIL_802****485 | 否 |

其中短信模板 ID 和邮件模板 ID，可在涂鸦云开发的短信服务和邮件服务 API 产品里通过 API 调用申请，您可以使用 API Explorer 快速模拟调用。

如果您的环境变量填写错误，IoT Suite 将不能正常工作。

Docker 镜像运行后，在浏览器访问 http://localhost/login ，并使用您在步骤 1.2 中创建的用户信息登录。

现在，您可以使用 IoT Suite，来管理和控制您在涂鸦云开发项目下的设备了。

## 3. IoT Suite 使用说明

在当前版本的 IoT Suite 中，我们提供最基础的资产管理、设备管理、设备状态查询、设备控制功能。

在开始添加涂鸦 IoT 设备前，您首先需要在资产管理下新增资产。资产是设备存在的空间位置，使用配套的小程序或 App 将设备添加到相应的资产下，即可在 IoT Suite 中对设备进行管理和控制。
![Assets](https://images.tuyacn.com/op/cloud_dev_plat/saas_dev_frwk/Assets.jpg)

在设备管理页面，您可以通过设备列表右上角展示的相应工具完成设备的添加。添加后的设备会出现在设备列表中。您可以打开设备的“控制”界面，查看设备最新状态，或对设备下发控制指令。
![](https://images.tuyacn.com/op/cloud_dev_plat/saas_dev_frwk/Devices.jpg)







