const fs = require("fs");
const fspromises = require("fs/promises");
// const child_process = require("child_process");
const { resolve } = require("path");
const ncp = require("ncp").ncp;
const { getAllAppPath } = require("./common");

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
    copyDir(resolve(item, "dist"), resolve("dist", item)).then(() => {
      console.log(item, 'sync successfully');
    }).catch((err) => {
      console.error(item, err);
    });
  }
  return;
};

main();
