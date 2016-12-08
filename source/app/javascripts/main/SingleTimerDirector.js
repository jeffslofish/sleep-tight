'use strict'
class SingleTimerDirector {
  constructor() {
    this.activeTimer = null;
    this.tickInterval = 1000;
    this.timeoutClearer = clearTimeout;
    this.activeInterval = null;
  }
  startNew(callback, milliseconds) {
    this.stopActive();
    this.activeTimer = setTimeout(callback, milliseconds);
    return this.activeTimer;
  }
  stopActive() {
    if(this.activeTimer) {
      this.timeoutClearer(this.activeTimer);
    }
  }
}
module.exports = SingleTimerDirector;
