var electron, path, json;

path = require('path');
json = require('../../package.json');

electron = require('electron');

var menubar = require('menubar');
var HardcodedMenuProvider = require('./HardcodedMenuProvider.js');
var SleepModeSleeper = require('./sleepers/SleepModeSleeper.js')
var mb = menubar({

});


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
