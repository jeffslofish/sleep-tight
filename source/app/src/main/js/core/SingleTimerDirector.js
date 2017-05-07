'use strict'
const Timer = require('tiny-timer');

class SingleTimerDirector {
  constructor(customTick) {
    this.activeTimer = null;
    this.tickInterval = 1000;
    this.timeoutClearer = clearTimeout;
    this.activeInterval = null;
    this.intervalClearer = clearInterval;
    this.ticks = 0;
    if(customTick) {
      this.onTick = customTick;
    }
  }
  startNew(callback, milliseconds) {
    this.stopActive();
    var self = this;

    this.activeTimer = new Timer();
    this.activeInterval = this.startInterval();    
    
    this.activeTimer.on('done', function() {
      console.log("done triggered: ", arguments);
      callback();
    });
    this.activeTimer.start(milliseconds, this.tickInterval);

    this.timeoutClearer = function() {
      this.activeTimer.stop();
    };
    this.intervalClearer = function() { };

    return this.activeTimer;
  }
  stopActive() {
    if(this.activeTimer) {
      this.timeoutClearer(this.activeTimer);
    }
    if(this.activeInterval) {
      this.intervalClearer(this.activeInterval);
    }
  }
  startInterval() {
    var self = this;
    this.activeTimer.on('tick', function(ms) {
      //console.log("tick triggered: ", arguments);
      self.onTick(ms);
    });
  }
  onTick() {

  }
}
module.exports = SingleTimerDirector;
