var electron, path, json;

path = require('path');
json = require('../../package.json');

electron = require('electron');

var menubar = require('menubar')


const {Menu, Tray, MenuItem} = require('electron')

var mb = menubar({

});

class GlobalConsoleLogSleeper {
  constructor() {
  }
  sleepIn(howLong) {
    console.log(`Sleeping in '${howLong}'.`)
  }
}
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
    if(reference && reference.timespan) {
      context.sleeper.sleepIn(reference.timespan);
    }
  }

  buildSleepMenuItem(minutes) {
    const id = `sleepIn${minutes}`;
    var ch = this.clickHandler;
    var self = this;
    var item = new MenuItem({
      label: `Sleep in ${minutes} minutes`,
      type: 'radio',
      id: id,
      // Seems to lose `this` context when passed directly, so this wraps it
      click: function(clickedItem, focusedWindow) {
        ch(clickedItem, focusedWindow, self, id);
      },
    });
    this.meta[id] = {
      item: item,
      timespan: minutes
    };
    return item;
  }
  buildMenu() {
    var menu = new Menu();
    menu.append(this.buildSleepMenuItem(15));
    menu.append(this.buildSleepMenuItem(30));
    menu.append(this.buildSleepMenuItem(45));
    menu.append(this.buildSleepMenuItem(60));
    menu.append(this.buildSleepMenuItem(75));
    menu.append(this.buildSleepMenuItem(90));

    return menu;
  }
}
mb.on('after-create-window', function() {
  mb.window.openDevTools();
});
mb.on('ready', function ready () {
  console.log('app is ready')
  // your app code here

  mb.showWindow = mb.hideWindow;
  var menuProvider = new HardcodedMenuProvider(new GlobalConsoleLogSleeper());
  mb.tray.setContextMenu(menuProvider.buildMenu());

})
