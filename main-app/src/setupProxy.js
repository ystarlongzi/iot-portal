const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8080',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    }),
  );

  app.use(
    '/asset-app',
    createProxyMiddleware({
      target: '//localhost:7001', // 本地开发
      pathRewrite: { // 本地开发
        '^/asset-app': '',
      },
      changeOrigin: true,
    }),
  );

  app.use(
    '/device-app',
    createProxyMiddleware({
      target: '//localhost:7002', // 本地开发
      pathRewrite: { // 本地开发
        '^/device-app': '',
      },
      changeOrigin: true,
    }),
  );

  app.use(
    '/permission-app',
    createProxyMiddleware({
      target: '//localhost:7003', // 本地开发
      pathRewrite: { // 本地开发
        '^/permission-app': '',
      },
      changeOrigin: true,
    }),
  );

  app.use(
    '/account-app',
    createProxyMiddleware({
      target: '//localhost:7004', // 本地开发
      pathRewrite: { // 本地开发
        '^/account-app': '',
      },
      changeOrigin: true,
    }),
  );
};
