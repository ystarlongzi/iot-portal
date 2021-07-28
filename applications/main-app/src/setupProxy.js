const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost', // docker
      changeOrigin: true,
      // pathRewrite: {
      //   '^/api': '',
      // },
    }),
  );

  app.use(
    '/asset-app',
    createProxyMiddleware({
      // target: 'http://localhost:8888', // local static
      target: 'http://localhost:7001', // local dev
      changeOrigin: true,
    }),
  );

  app.use(
    '/device-app',
    createProxyMiddleware({
      // target: 'http://localhost:8888', // local static
      target: '//localhost:7002', // local dev
      changeOrigin: true,
    }),
  );

  app.use(
    '/account-app',
    createProxyMiddleware({
      // target: 'http://localhost:8888', // local static
      target: '//localhost:7004', // local dev
      changeOrigin: true,
    }),
  );

  app.use(
    '/permission-app',
    createProxyMiddleware({
      // target: 'http://localhost:8888', // local static
      target: '//localhost:7003', // local dev
      changeOrigin: true,
    }),
  );
};
