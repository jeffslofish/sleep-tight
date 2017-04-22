'use strict'
var path = require('path');

class IconResolver {
  constructor(platform) {
    this.platform = platform;
    this.resourcePath = "../../../../resources/";
    this.rootPath = __dirname;
    this.win32FileName = "icon.ico";
    this.otherFileName = "IconTemplate.png";
    this.win32Platform = "win32";
  }

  resolve() {
    var iconFileName = this.platform == this.win32Platform 
      ? this.win32FileName : this.otherFileName;
    return path.join(this.rootPath, this.resourcePath, iconFileName);
  }
}
module.exports = IconResolver;
