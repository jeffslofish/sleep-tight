var path = require('path');

module.exports = {
  appPath: function() {
    switch (process.platform) {
      case 'darwin':
        return path.join(__dirname, '..', '.tmp', 'SleepTight-darwin-x64', 'SleepTight.app', 'Contents', 'MacOS', 'SleepTight');
      case 'linux':
        return path.join(__dirname, '..', '.tmp', 'SleepTight-linux-x64', 'SleepTight');
      default:
        throw 'Unsupported platform';
    }
  }
};
