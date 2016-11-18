'use strict'
const {Menu, Tray, MenuItem} = require('electron');

class HardcodedMenuProvider {
  constructor(sleeper) {
    this.sleeper = sleeper;
    this.meta = {};
    this.self = this;
  }

  clickHandler(clickedItem, focusedWindow, context, itemId) {
    // Atom seems to lose `this` context when passed directly from a click event
    // hence the `context` parameter.
    var reference = context.meta[itemId];
    if(reference && reference.milliseconds) {
      context.sleeper.sleepIn(reference.milliseconds);
    }
  }
  minutesToMilliseconds(minutes) {
    return minutes * 1000 * 60;
  }
  buildSleepMenuItem(minutes, isVisible) {
    const id = `sleepIn${minutes}`;
    isVisible = isVisible === undefined ? true : isVisible;
    var ch = this.clickHandler;
    var self = this;
    var item = new MenuItem({
      label: `Sleep in ${minutes} minutes`,
      type: 'radio',
      id: id,
      checked: false,
      visible: isVisible,
      // Seems to lose `this` context when passed directly, so this wraps it
      click: function(clickedItem, focusedWindow) {
        ch(clickedItem, focusedWindow, self, id);
      },
    });
    this.meta[id] = {
      item: item,
      milliseconds: this.minutesToMilliseconds(minutes),
    };
    return item;
  }
  buildMenu() {
    var fullMenu = new Menu();
    // This invisible item prevents a real item from
    // being automatically selected before it's been pressed.
    var sleepSubMenuItem = this.buildSleepSubMenuItem();
    fullMenu.append(sleepSubMenuItem);
    return fullMenu;
  }
  buildSleepSubMenuItem() {
    var menu = new Menu();
    menu.append(this.buildSleepMenuItem(0.01, false));
    menu.append(this.buildSleepMenuItem(0.05));
    menu.append(this.buildSleepMenuItem(0.1));
    menu.append(this.buildSleepMenuItem(0.12));
    menu.append(this.buildSleepMenuItem(1));
    menu.append(this.buildSleepMenuItem(15));
    menu.append(this.buildSleepMenuItem(30));
    menu.append(this.buildSleepMenuItem(45));
    menu.append(this.buildSleepMenuItem(60));
    menu.append(this.buildSleepMenuItem(75));
    menu.append(this.buildSleepMenuItem(90));
    return new MenuItem({
      label: "Sleep",
      submenu: menu
    });
  }
}
module.exports = HardcodedMenuProvider;
