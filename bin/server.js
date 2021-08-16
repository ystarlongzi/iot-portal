const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = require('express')();
const serveStatic = require('serve-static');
const open = require('open');

const port = '8888';

app.use(
  '/api',
  createProxyMiddleware({
    // see more: https://github.com/chimurai/http-proxy-middleware#options
    target: 'http://localhost:8080',
    changeOrigin: true,
    headers: {},
  }),
);

app.use(serveStatic(path.join(__dirname, '../dist')));
app.use(serveStatic(path.join(__dirname, '../dist/main-app')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../dist/main-app/index.html'));
});

app.listen(port, () => {
  console.log(`Server listening at http://127.0.0.1:${port}`);
  if (process.env.debug) {
    open(`http://127.0.0.1:${port}`);
  }
});
