const path = require('path');
const proxy = require('express-http-proxy');
const app = require('express')();
const serveStatic = require('serve-static');

const port = '8888';

app.use(
  '/api',
  proxy('http://127.0.0.1:8000', {
    proxyReqPathResolver: function (req) {
      // console.log(req);
      const { originalUrl } = req;
      return originalUrl.replace('/api', '');
    },
  }),
);

app.use(serveStatic(path.join(__dirname, '../dist')));
app.use(serveStatic(path.join(__dirname, '../dist/main-app')));

app.get('*', (req, res) => {
  // 静态托管缺失，返回主应用index.html
  return res.sendFile(path.resolve(__dirname, '../dist/main-app/index.html'));
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
