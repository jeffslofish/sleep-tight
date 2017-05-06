const electron = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');

const {
	default: installExtension, 
	REACT_DEVELOPER_TOOLS, 
	REDUX_DEVTOOLS
} = require('electron-devtools-installer');

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

var hasBeenSetup = false;
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
//let mainWindow;
function initMenubar() {
	var menubar = require('menubar');
	//var HardcodedMenuProvider = require('./HardcodedMenuProvider.js');
	//var MenuItemCountdownUpdater = require('./MenuItemCountdownUpdater.js');
	var IconResolver = require('./js/core/IconResolver.js');

	var iconPath = new IconResolver(process.platform).resolve();
	
	var mb = menubar({
		dir:__dirname,
		icon:iconPath,
		preloadWindow:true,
		width: 1024, height: 768
		//width:280, height:240
	});
	mb.on('ready', function ready () {
		console.log('app is ready');
	});
	mb.on('after-show', function afterShow() {
		if(hasBeenSetup) return;

		if(process.env.NODE_ENV === 'development') {
			// Open the DevTools.
			setupWindow(mb.window);
			mb.window.webContents.openDevTools();
		}
		hasBeenSetup = true;
	});
}
/** This function will create the mainWindow */
function setupWindow(mainWindow) {
  if(process.env.NODE_ENV === 'development') {
		// Open the DevTools.
		mainWindow.webContents.openDevTools();
		
		installExtension(REACT_DEVELOPER_TOOLS)
			.then((name) => console.log(`Added Extension:  ${name}`))
			.catch((err) => console.log('An error occurred: ', err));

		installExtension(REDUX_DEVTOOLS)
			.then((name) => console.log(`Added Extension:  ${name}`))
			.catch((err) => console.log('An error occurred: ', err));
	}
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function() {
	//createWindow
	initMenubar();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
