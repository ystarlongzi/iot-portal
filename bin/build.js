const child_process = require("child_process");
const { getAllAppPath } = require("./common");
const { resolve } = require('path');

function build(path) {
  return new Promise((resolve, reject) => {
    const p = child_process.spawn('npm', ['run', 'build'], {
      cwd: path,
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
  const paths = await getAllAppPath();
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
