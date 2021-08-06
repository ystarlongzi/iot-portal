const execa = require('execa');
const utils = require('./utils');
const { getAllAppAbsolutePath } = require('./common');

async function main() {
  const paths = await getAllAppAbsolutePath();
  for (const path of paths) {
    if (utils.isYarn()) {
      await execa('yarn', ['build'], {
        cwd: path,
        stdio: 'inherit',
      });
    } else {
      await execa('npm', ['run', 'build'], {
        cwd: path,
        stdio: 'inherit',
      });
    }
  }
}

main();
