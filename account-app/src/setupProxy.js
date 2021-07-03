const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8080', //本地
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    }),
  );
};
