'use strict'
class SingleTimerDirector {
  constructor() {
    this.activeTimer = null;
    this.tickInterval = 1000;
    this.timeoutClearer = clearTimeout;
    this.activeInterval = null;
    this.intervalClearer = clearInterval;
  }
  startNew(callback, milliseconds) {
    var self = this;
    this.stopActive();

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
    return setInterval(this.onTick, this.tickInterval);
  }
  onTick() {

  }
}
module.exports = SingleTimerDirector;
