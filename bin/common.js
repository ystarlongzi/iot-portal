const path = require('path');
const fspromises = require('fs/promises');

// load app paths
const getAllAppPath = () => {
  const appPathPrefix = path.resolve(__dirname, '../applications');
  return fspromises.readdir(appPathPrefix).then((paths) => {
    const appPaths = paths.filter((item) => {
      return /.*\-app$/.test(item);
    });
    return appPaths;
  });
};

const getAllAppAbsolutePath = async (withServerPath = false) => {
  const result = [];
  if (withServerPath) {
    result.push(path.resolve(__dirname, '../server'));
  }
  const appPathPrefix = path.resolve(__dirname, '../applications');
  const paths = await fspromises.readdir(appPathPrefix).then((paths) => {
    const appPaths = paths.filter((item) => {
      return /.*\-app$/.test(item);
    }).map((item) => {
      return path.resolve(__dirname, '../applications', item);
    });
    return appPaths;
  });
  return [...result, ...paths];
};

module.exports.getAllAppAbsolutePath = getAllAppAbsolutePath;
module.exports.getAllAppPath = getAllAppPath;
