const child_process = require("child_process");
const { getAllAppAbsolutePath } = require("./common");
const { resolve } = require('path');

function build(path) {
  return new Promise((resolve, reject) => {
    const p = child_process.spawn('npm', ['run', 'build'], {
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
  const paths = await getAllAppAbsolutePath();
  const promiseArr = [];
  for (let item of paths) {
    promiseArr.push(build(resolve(item)).then(() => {
      console.log(item, ' build successfully');
    }).catch((err) => {
      console.error(item, err);
    }))
  }
  return Promise.all(promiseArr);
}

main();
