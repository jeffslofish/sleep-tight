class PowerOffPowerSwitcher {
  constructor() {
    this.switch = require('power-off');
  }
  powerOff() {
    console.log("powering off");
    this.switch((err, stderr, stdout)=>{
      if (!err && !stderr) {
        console.log(stdout);
      }
    });
  }
}
module.exports = PowerOffPowerSwitcher;