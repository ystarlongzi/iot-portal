const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      // target: 'https://iot-app-smart-office-cn.wgine-inc.com:7799', //预发环境
      // target: 'https://iot-app-smart-office.wgine-daily.com:7799', //日常环境
      target: 'http://localhost:8001', //本地mock
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    }),
  );
};
