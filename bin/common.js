const fspromises = require("fs/promises");

// load app paths
const getAllAppPath = () => {
    return fspromises.readdir(process.cwd()).then((paths) => {
      const appPaths = paths.filter((item) => {
        return /.*\-app$/.test(item);
      });
      return appPaths;
    });
  };
  
  module.exports.getAllAppPath = getAllAppPath;
  