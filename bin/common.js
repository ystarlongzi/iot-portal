const fspromises = require("fs/promises");
const { resolve } = require('path');

// load app paths
const getAllAppPath = () => {
  const appPath = resolve(process.cwd(), 'applications');
  return fspromises.readdir(appPath).then((paths) => {
    const appPaths = paths.filter((item) => {
      return /.*\-app$/.test(item);
    });
    return appPaths;
  });
};

module.exports.getAllAppPath = getAllAppPath;
