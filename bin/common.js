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

module.exports.getAllAppPath = getAllAppPath;
