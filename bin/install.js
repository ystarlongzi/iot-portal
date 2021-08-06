const { getAllAppAbsolutePath } = require('./common');
const execa = require('execa');
const utils = require('./utils');

async function main() {
  const paths = await getAllAppAbsolutePath(true);
  for (const path of paths) {
    if (await utils.isYarn()) {
      await execa('yarn', [], {
        cwd: path,
        stdio: 'inherit',
      });
    } else {
      await execa('npm', ['install'], {
        cwd: path,
        stdio: 'inherit',
      });
    }
  }
}

main();
