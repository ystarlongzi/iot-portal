const path = require('path');

let fspromises;

try {
  // see: https://github.com/nodejs/node/issues/35740
  // eslint-disable-next-line
  fspromises = require('fs').promises;
} catch (e) {
  // eslint-disable-next-line
  fspromises = require('fs/promises');
}

// load app paths
const getAllAppPath = () => {
  const appPathPrefix = path.resolve(__dirname, '../applications');
  return fspromises.readdir(appPathPrefix).then((paths) => {
    const appPaths = paths.filter((item) => /.*-app$/.test(item));
    return appPaths;
  });
};

const getAllAppAbsolutePath = async () => {
  const result = [];

  const appPathPrefix = path.resolve(__dirname, '../applications');
  const paths = await fspromises.readdir(appPathPrefix).then((dirPaths) => {
    const appPaths = dirPaths
      .filter((item) => /.*-app$/.test(item))
      .map((item) => path.resolve(__dirname, '../applications', item));
    return appPaths;
  });
  return [...result, ...paths];
};

module.exports.getAllAppAbsolutePath = getAllAppAbsolutePath;
module.exports.getAllAppPath = getAllAppPath;
