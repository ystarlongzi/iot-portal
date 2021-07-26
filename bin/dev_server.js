'use strict';

const path = require('path');
const fs = require('mz/fs');
const spawn = require('cross-spawn');
const Base = require('sdk-base');
const sleep = require('mz-modules/sleep');
const awaitEvent = require('await-event');
const debug = require('debug')('egg-view-assets:dev_server');
const detectPort = require('detect-port');
const mkdirp = require('mz-modules/mkdirp');
const is = require('is-type-of');
const dotenv = require('dotenv');

// const baseConfig = {
//   baseDir: '',
//   devServer: {
//     enable: true,
//     command: 'npm run start',
//     port: 3000,
//     env: {},
//     debug: true,
//     timeout: 60 * 1000,
//     waitStart: false,
//   },
// };

class DevServer extends Base {
  baseConfig = {
    baseDir: '',
    devServer: {
      enable: true,
      command: 'npm run start',
      port: 3000,
      env: {},
      debug: false,
      timeout: 60 * 1000,
      waitStart: false,
    },
  };
  constructor(appName, options = {}) {
    super({
      initMethod: 'init',
    });
    this.appName = appName;
    this.config = Object.assign({}, this.baseConfig, options);
    this.isClosed = false;
  }

  async init() {
    const { devServer } = this.config;

    // 优先读取项目中env
    const envResult = dotenv.config({
      path: path.resolve(__dirname, '../applications/', this.appName, '.env'),
    });
    if (envResult?.parsed.PORT) {
      devServer.port = envResult.parsed.PORT;
    }

    if (await this.checkPortExist()) {
      throw new Error(`port ${devServer.port} has been used`);
    }

    // start dev server asynchronously
    this.startAsync();
    await this.waitListen();
  }

  startAsync() {
    const { devServer, baseDir } = this.config;
    const [command, ...args] = devServer.command.split(/\s+/);

    const opt = {
      // disable stdout by default
      stdio: ['inherit', 'ignore', 'inherit'],
      // env,
      cwd: baseDir,
    };
    if (devServer.cwd) opt.cwd = devServer.cwd;
    if (devServer.debug) opt.stdio[1] = 'inherit';
    console.log(`[${this.appName}] command: ${command}, args: ${args}, opt: ${JSON.stringify(opt)}`);
    const proc = (this.proc = spawn(command, args, opt));
    proc.once('error', 
      (err) => {
        console.error(err);
        this.exit(err);
      }
    );
    proc.once('exit', (code) => {
      console.error(code);
      
      this.exit(code)});
  }

  async checkPortExist() {
    const { devServer } = this.config;

    const port = await detectPort(devServer.port);
    debug('check %s, get result %s', devServer.port, port);
    return port != devServer.port;
  }

  async waitListen() {
    const { devServer } = this.config;
    let timeout = devServer.timeout / 1000;
    let isSuccess = false;
    while (timeout > 0) {
      /* istanbul ignore if */
      if (this.isClosed) {
        console.warn(this.appName, 'Closing, but devServer is not listened');
        return;
      }
      if (await this.checkPortExist()) {
        console.warn(
          this.appName,
          `Run ${devServer.command} success, listen on ${devServer.port}`,
        );
        // 成功启动
        isSuccess = true;
        break;
      }
      timeout--;
      await sleep(1000);
      debug('waiting, %s remain', timeout);
    }

    if (isSuccess) return;
    const err = new Error(
      `Run "${devServer.command}" failed after ${devServer.timeout / 1000}s`,
    );
    throw err;
  }

  async close() {
    this.isClosed = true;
    /* istanbul ignore if */
    if (!this.proc) return;
    console.warn(this.appName, 'dev server will be killed');
    this.proc.kill();
    await awaitEvent(this.proc, 'exit');
    this.proc = null;
  }

  exit(codeOrError) {
    this.proc = null;

    if (!(codeOrError instanceof Error)) {
      const { devServer } = this.config;
      const code = codeOrError;
      const message = `Run "${devServer.command}" exit with code ${code}`;
      if (!code || code === 0) {
        console.log(this.appName, message);
        return;
      }

      codeOrError = new Error(message);
    }

    console.error(codeOrError);
  }

  replacePort(str) {
    if (!is.string(str)) return str;
    return str.replace('{port}', this.config.devServer.port);
  }
}

module.exports = DevServer;
