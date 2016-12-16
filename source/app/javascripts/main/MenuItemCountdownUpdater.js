'use strict'
class MenuItemCountdownUpdater {
  constructor() {

  }
  formatTime(milliseconds) {
    var date = new Date(milliseconds);
    // getHours(), getMinutes(), getSeconds(), getMilliseconds()
    //return "nope";
    console.log("date: ", date);
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  }
  setMenuItemTextToTime(menuItem, timeString) {
    menuItem.text = timeString;
  }
}
module.exports = MenuItemCountdownUpdater;
