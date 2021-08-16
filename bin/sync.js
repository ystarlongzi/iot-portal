const fs = require("fs");
const { resolve } = require("path");
const ncp = require("ncp").ncp;
const { getAllAppPath } = require("./common");

let fspromises;

try {
  // see: https://github.com/nodejs/node/issues/35740
  // eslint-disable-next-line
  fspromises = require('fs').promises;
} catch (e) {
  // eslint-disable-next-line
  fspromises = require('fs/promises');
}

function copyDir(from, to) {
  // child_process.spawn('cp', ['-r', from, to]);
  return new Promise((resolve, reject) => {
    ncp(from, to, (err) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
}

const main = async () => {
  // check dist
  if (!fs.existsSync(resolve(process.cwd(), "dist"))) {
    await fspromises.mkdir(resolve(process.cwd(), "dist"));
  }
  const paths = await getAllAppPath();
  for await (let item of paths) {
    copyDir(resolve(__dirname, '../applications', item, "dist"), resolve("dist", item)).then(() => {
      console.log(item, 'sync successfully');
    }).catch((err) => {
      console.error(item, err);
    });
  }
  return;
};

main();
