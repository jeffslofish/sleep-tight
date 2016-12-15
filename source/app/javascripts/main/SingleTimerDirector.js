'use strict'
class SingleTimerDirector {
  constructor() {
    this.activeTimer = null;
    this.tickInterval = 1000;
    this.timeoutClearer = clearTimeout;
    this.activeInterval = null;
    this.intervalClearer = clearInterval;
    this.ticks = 0;
  }
  startNew(callback, milliseconds) {
    this.stopActive();
    var self = this;

    this.activeInterval = this.startInterval();
    this.activeTimer = setTimeout(function() {
      self.stopActive();
      callback();
    }, milliseconds);
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
    self.ticks = 0;
    return setInterval(function() {
      self.ticks++;
      self.onTick();
    }, this.tickInterval);
  }
  onTick() {

  }
}
module.exports = SingleTimerDirector;
