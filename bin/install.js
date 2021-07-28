const child_process = require("child_process");
const { getAllAppPath, getAllAppAbsolutePath } = require("./common");
const { resolve } = require('path');

function install(path) {
  return new Promise((resolve, reject) => {
    const p = child_process.spawn('npm', ['install'], {
      cwd: path,
      stdio: ['inherit', 'inherit', 'inherit'],
    });
    p.on('error', (error) => {
      reject(error);
    })
    p.on('close', () => {
      resolve(null);
    });
  });
}

async function main() {
  const paths = await getAllAppAbsolutePath(true);
  for await (let item of paths) {
    install(resolve(item)).then(() => {
      console.log(item, ' install successfully');
    }).catch((err) => {
      console.error(item, err);
    });
  }

  return;
}

main();
