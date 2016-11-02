var electron, path, json;

path = require('path');
json = require('../../package.json');

electron = require('electron');

var menubar = require('menubar')

var mb = menubar({

});

mb.on('ready', function ready () {
  console.log('app is ready')
  // your app code here
})
