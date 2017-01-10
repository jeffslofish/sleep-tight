'use strict'
class MenuItemCountdownUpdater {
  constructor() {

  }
  formatTime(milliseconds) {
    var seconds=parseInt((milliseconds/1000)%60);
    var minutes=parseInt((milliseconds/(1000*60))%60);
    var hours=parseInt((milliseconds/(1000*60*60))%24);
    return `${hours}:${minutes}:${seconds}`;
  }
  setMenuItemTextToTime(menuItem, timeString) {
    menuItem.text = timeString;
  }
}
module.exports = MenuItemCountdownUpdater;
