'use strict'
var SingleTimerDirector = require('../SingleTimerDirector.js');
class GlobalConsoleLogSleeper {
  constructor() {
    this.timer = new SingleTimerDirector();
  }

  sleepIn(milliseconds) {
    console.log(`Sleeping in '${milliseconds}' milliseconds.`);
    this.timer.startNew(function() {
      console.log(`Pseudo going to sleep after '${milliseconds}' milliseconds.`)
    }, milliseconds);
  }
}
module.exports = GlobalConsoleLogSleeper;
