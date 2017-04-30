'use strict'
var sleepmode = require('sleep-mode');
var SingleTimerDirector = require('../SingleTimerDirector.js');

class SleepModeSleeper {
  constructor() {
    this.timer = new SingleTimerDirector();
  }

  sleepIn(milliseconds) {
    console.log(`Sleep-Mode: Sleeping in '${milliseconds}' milliseconds.`);
    this.timer.startNew(function() {
      console.log(`Sleep-Mode: actually going to sleep after '${milliseconds}' milliseconds.`);
      try {
        sleepmode(function (err, stderr, stdout) {
            /* At least on a Mac, stderr gives a message of
            'Sleeping now...' but it's not actually a problem. */
            if(err) {
              console.log('err: ', err);
            }
            if(stderr) {
              console.log('stderr: ', stderr);
            }
            if (!err && !stderr) {
                console.log(stdout);
            }
        });
      } catch (caughtError) {
        console.log(caughtError);
      }
    }, milliseconds);
  }
}
module.exports = SleepModeSleeper;
