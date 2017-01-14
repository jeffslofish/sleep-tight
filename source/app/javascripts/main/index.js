'use strict';
var electron, path, json;

path = require('path');
json = require('../../package.json');

electron = require('electron');
const ipc = require('electron').ipcMain;
const remote = require('electron').remote;

var menubar = require('menubar');
var HardcodedMenuProvider = require('./HardcodedMenuProvider.js');
var MenuItemCountdownUpdater = require('./MenuItemCountdownUpdater.js');
var SleepModeSleeper = require('./sleepers/SleepModeSleeper.js')
var mb = menubar({});

var remainingTimeMenuItem;
var leftUpdater = new MenuItemCountdownUpdater();
var lastMenuTime = "00:00:00";

mb.on('ready', function ready () {
  console.log('app is ready')
  // Don't actually show a window
  mb.showWindow = mb.hideWindow;
  var sleeper = new SleepModeSleeper();

  var menuProvider = new HardcodedMenuProvider(sleeper);
  var menu = menuProvider.buildMenu();

  remainingTimeMenuItem = menuProvider.buildRemainingTimeMenuItem();
  menu.append(remainingTimeMenuItem);
  
  sleeper.timer.onTick = function(ms) {
    console.log("remote", remote);
    var remainingMilliseconds = ms;
    var formattedRemainingTime = leftUpdater.formatTime(ms);
    lastMenuTime = formattedRemainingTime;
    console.log("remaining milliseconds", formattedRemainingTime, ms);
    // TODO Probably need to update this on another thread?
    //leftUpdater.setMenuItemLabelToTime(remainingTimeMenuItem, ms);
    //remainingTimeMenuItem.label = formattedRemainingTime;

    // It seems updating the label of a menu item isn't
    // even supported in Electron. Not sure what to do about that
    menu.append(menuProvider.buildRemainingTimeMenuItem());
    
  };
  mb.tray.on("click",  function onMbShow() {
    console.log("on show");
  });
  mb.tray.setContextMenu(menu);
});