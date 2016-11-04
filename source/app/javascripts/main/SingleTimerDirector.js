'use strict'
class SingleTimerDirector {
  constructor() {
    this.activeTimer = null;
  }
  startNew(callback, milliseconds) {
    this.stopActive();
    this.activeTimer = setTimeout(callback, milliseconds);
    return this.activeTimer;
  }
  stopActive() {
    return;
    if(this.activeTimer) {
      clearTimeout(this.activeTimer);
    }
  }
}
module.exports = SingleTimerDirector;
