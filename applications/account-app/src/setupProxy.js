const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost', //本地Docker
      changeOrigin: true,
      // pathRewrite: {
      //   '^/api': '',
      // },
    }),
  );
};
