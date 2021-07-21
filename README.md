<center><p align="center"><img src="./tuya_logo.png" width="28%" height="28%" /></p></center>

SaaS Development Framework Portal
===

This topic describes how to configure and run the IoT Suite frontend projects in local mode to meet your redevelopment requirements. If you do not need further development and customization, local private deployment can be done through the `Docker` image. For more information, see [Docker image](https://hub.docker.com/r/iotportal/iot-suite) and [GitHub Source Code for IoT Suite Backend](https://github.com/tuya/iot-portal/tree/feature/doc1/doc).


## Preparation

- Start the IoT Suite interface service. For more information, see [Run IoT Suite Backend Project in Local Mode](https://github.com/tuya/iot-suite-server/tree/4a14fbb61206fcec1c578b7fe9bf133439f1661d).

   > **Note**: The default backend address requested in the frontend project is `http://localhost:8080`.

- Environmental dependency

   - [Node.js](https://nodejs.org/en/) (LTS version is recommended)
   - [Git](https://git-scm.com/)
   - [Docker](https://www.docker.com) (optional, used to build images)

- Download the code: `git clone https://github.com/tuya/iot-portal.git`
   The code structure is as follows:

   ```
   - iot-portal  # The frontend application of the development framework
     - /main-app # Micro application: base application
     - /account-app # Micro application: account management
     - /asset-app # Micro application: asset management
     - /permission-app # Micro application: permission management
     - /device-app # Micro application: device management
     - /doc # Documentation
     - /conf # Dockerfile and NGINX configuration
     - /bin # Command script
     - /dist # Static resources after building
   ```


## Debug the micro application

With the micro-frontend architecture, each application is an independent project and needs to be configured with separate dependencies. This section takes the debugging of the account management micro application `accont-app` as an example to describe the debugging process.

### Step 1: Check the proxy configuration

Check `/main-app/src/setupProxy.js`, make sure that the backend proxy interface configuration `http://localhost:8080` is correct and started, and the port configuration of the specified micro-application is correct.

<img src="https://images.tuyacn.com/content-platform/hestia/16256221248a0d1839b83.png" width = "450">

### Step 2: Start the micro application
Start the micro application that needs to be debugged.

```bash
cd account-app # Enter the specified sub-application
npm install # Install dependencies, which only needs to be executed once
npm run start # Start the debugging service
```

### Step 3: Start the main application
Load sub-application resources through the main application agent. Start the base micro application `main-app`, and open the port `http://localhost:3000` by default.

```bash
cd main-app # Enter the micro application
npm install # Install dependencies, which only needs to be executed once
npm run start # Start the debugging service
```

## Build and release

Convenient instructions are available to build a complete application.

```bash
cd path/to/iot-portal # Back to the root directory
npm install # Install the necessary dependency tools
npm run apps:install # Install dependencies for all sub-applications in turn
npm run apps:build # Build all sub-applications in turn
npm run sync # Copy all build files to `/dist`
docker build -f conf/Dockerfile. -t iot-portal-fe # Build Docker image, optional
```

The following figure shows the built file.

<img src="https://airtake-public-data-1254153901.cos.ap-shanghai.myqcloud.com/content-platform/hestia/1626091739258c52fc8e0.png" width = "400">