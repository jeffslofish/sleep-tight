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
    this.timer = new SingleTimerDirector();
  }

  sleepIn(milliseconds) {
    console.log(`Sleeping in '${milliseconds}' milliseconds.`);
    this.timer.startNew(function() {
      console.log(`Pseudo going to sleep after '${milliseconds}' milliseconds.`)
    }, milliseconds);
  }
}
class SleepModeSleeper {
  constructor() {
    this.timer = new SingleTimerDirector();
  }

  sleepIn(milliseconds) {
    console.log(`Sleep-Mode: Sleeping in '${milliseconds}' milliseconds.`);
    this.timer.startNew(function() {
      console.log(`Sleep-Mode: actually going to sleep after '${milliseconds}' milliseconds.`);
      try {
        require('sleep-mode')(function (err, stderr, stdout) {
            /* At least on a Mac, stderr gives a message of
            'Sleeping now...' but it's not actually a problem. */
            if(err) {
              console.log('err: ', err);
            }
            if(stderr) {
              console.log('stderr: ', stderr);
            }
            if (!err && !stderr) {
                console.log(stdout);
            }
        });
      } catch (caughtError) {
        console.log(caughtError);
      }
    }, milliseconds);
  }
}
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
    if(this.activeTimer) {
      clearTimeout(this.activeTimer);
    }
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
    if(reference && reference.milliseconds) {
      context.sleeper.sleepIn(reference.milliseconds);
    }
  }
  minutesToMilliseconds(minutes) {
    return minutes * 1000 * 60;
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
      milliseconds: this.minutesToMilliseconds(minutes),
    };
    return item;
  }
  buildMenu() {
    var menu = new Menu();
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
  var menuProvider = new HardcodedMenuProvider(new SleepModeSleeper());
  mb.tray.setContextMenu(menuProvider.buildMenu());

})
