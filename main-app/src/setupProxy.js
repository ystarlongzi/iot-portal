const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      // target: 'https://iot-app-smart-office-cn.tuya-inc.com:7799', // 生产
      // target: 'https://iot-app-smart-office-cn.wgine-inc.com:7799', //预发环境
      target: 'https://iot-app-smart-office.wgine-daily.com:7799', //日常环境
      // target: 'http://localhost:8001',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    }),
  );

  app.use(
    '/asset-app',
    createProxyMiddleware({
      target: 'http://localhost', // 本地静态
      // target: 'http://localhost:7001', // 本地开发
      // pathRewrite: { // 本地开发
      //   '^/asset-app': '',
      // },
      changeOrigin: true,
    }),
  );

  app.use(
    '/device-app',
    createProxyMiddleware({
      target: 'http://localhost', // 本地静态
      // target: '//localhost:7002', // 本地开发
      // pathRewrite: { // 本地开发
      //   '^/device-app': '',
      // },
      changeOrigin: true,
    }),
  );
};
