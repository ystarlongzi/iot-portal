const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app, opts = {}) {
  const apiPath = opts.apiPath || '/api';
  const target = 'http://localhost';

  app.use(
    apiPath,
    createProxyMiddleware(Object.assign({
      // see more: https://github.com/chimurai/http-proxy-middleware#options
      target,
      changeOrigin: true,
      headers: {},
    }, opts)),
  );
}
