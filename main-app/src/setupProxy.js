const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8080', //日常环境
      changeOrigin: true,
      // pathRewrite: {
      //   '^/api': '',
      // },
    }),
  );

  app.use(
    '/asset-app',
    createProxyMiddleware({
      // target: 'http://localhost', // 本地静态
      target: 'http://localhost:7001', // 本地开发
      pathRewrite: { // 本地开发
        '^/asset-app': '',
      },
      changeOrigin: true,
    }),
  );

  app.use(
    '/device-app',
    createProxyMiddleware({
      // target: 'http://localhost', // 本地静态
      target: '//localhost:7002', // 本地开发
      pathRewrite: { // 本地开发
        '^/device-app': '',
      },
      changeOrigin: true,
    }),
  );
};
