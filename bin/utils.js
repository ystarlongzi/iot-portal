const execa = require('execa');

module.exports = {
  isYarn: async () => {
    let isYarn = false;
    try {
      await execa('yarn', ['--version']);
      isYarn = true;
    } catch (error) {
      isYarn = false;
    }
    return isYarn;
  },
};
