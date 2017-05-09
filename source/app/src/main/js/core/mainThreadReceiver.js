var ipcMain = require('electron').ipcMain;
var SleepModeSleeper = require('./sleepers/SleepModeSleeper');

class MainThreadReceiver {
  constructor() {
    this.main = ipcMain;
    this.commandName = "sleep-tight.signal";
    this.sleeper = new SleepModeSleeper();
    this.invokeSleeper = this.invokeSleeper.bind(this);
  }
  setup() {
    this.main.on(this.commandName, this.invokeSleeper);
  }
  invokeSleeper() {
    console.log("invokeSleeper", this);
    this.sleeper.sleepNow();
  }
}
module.exports = MainThreadReceiver;