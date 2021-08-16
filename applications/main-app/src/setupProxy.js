const fs = require('fs');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');
const proxy = require(path.join(__dirname, '../../../setupProxy.js'));

module.exports = function (app) {
  proxy(app);
  proxySubApps(app);
};

function proxySubApps(mainApp) {
  const allAppDirs = fs.readdirSync(path.resolve(__dirname, '../../'));

  allAppDirs.forEach((dirName) => {
    // Exclude `./main-app` dir
    if (__dirname.indexOf(`/${dirName}/`) !== -1) {
      return;
    }

    try {
      const envFile = fs.readFileSync(
        path.resolve(__dirname, `../../${dirName}/.env`),
        'utf8'
      );
      const [, port] = /PORT=(\d+)/i.exec(envFile) || [, 3000];

      mainApp.use(
        `/${dirName}`,
        createProxyMiddleware({
          target: `http://localhost:${port}`,
          changeOrigin: true,
        }),
      );
    } catch (e) {}
  });
}
