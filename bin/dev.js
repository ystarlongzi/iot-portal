const path = require('path');
const { Command } = require('commander');
// const child_process = require('child_process');
const { getAllAppPath } = require('./common');
const DevServer = require('./dev_server');

const program = new Command();

program.version(require('../package.json').version);

program
  .arguments('<appName>')
  // .requiredOption('-n, --name [appName]', 'application name')
  .description('start named application dev-server')
  .action(dev);

program.parseAsync(process.argv);

// console.log('options', process.argv, program.opts());

async function dev(appName) {
  console.log('appName:', appName);
  const paths = await getAllAppPath();
  if (paths.includes(appName)) {
    // 主应用
    // if (appName !== 'main-app') {
    //   const mainApp = new DevServer('main-app', {
    //     baseDir: path.resolve(__dirname, '../applications', 'main-app'),
    //   });
    //   return mainApp.ready().then(() => {
    //     // 子应用
    //     new DevServer(appName, {
    //       baseDir: path.resolve(__dirname, '../applications', appName),
    //     });
    //   });
    // }
    // 子应用
    new DevServer(appName, {
      baseDir: path.resolve(__dirname, '../applications', appName),
    });
  }
}
