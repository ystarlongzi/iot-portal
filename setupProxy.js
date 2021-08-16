const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app, opts = {}) {
  const apiPath = opts.apiPath || '/api';
  const target = 'http://localhost';

  app.use(
    apiPath,
    createProxyMiddleware(Object.assign({
      target,
      changeOrigin: true,
      headers: {},
    }, opts)),
  );
}
