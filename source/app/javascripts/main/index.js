'use strict';
var electron, path, json;

path = require('path');
json = require('../../package.json');

electron = require('electron');

var menubar = require('menubar');
var HardcodedMenuProvider = require('./HardcodedMenuProvider.js');
var MenuItemCountdownUpdater = require('./MenuItemCountdownUpdater.js');
var SleepModeSleeper = require('./sleepers/SleepModeSleeper.js')
var mb = menubar({});

mb.on('ready', function ready () {
  console.log('app is ready')
  // Don't actually show a window
  //mb.showWindow = mb.hideWindow;
  var sleeper = new SleepModeSleeper();
  var leftUpdater = new MenuItemCountdownUpdater();

  var menuProvider = new HardcodedMenuProvider(sleeper);
  var menu = menuProvider.buildMenu();

  var remainingTimeMenuItem = menuProvider.buildRemainingTimeMenuItem();
  menu.append(remainingTimeMenuItem);
  
  sleeper.timer.onTick = function() {
    // TODO: Default javascript timer doesn't support
    // time remaining/elapsed. Will need to implement 
    // custom implementation for remaining time
    //var remainingMilliseconds = sleeper.timer.getRemainingMilliseconds();
    //leftUpdater.setMenuItemTextToTime(remainingTimeMenuItem, );
  };
  mb.tray.setContextMenu(menu);

})
