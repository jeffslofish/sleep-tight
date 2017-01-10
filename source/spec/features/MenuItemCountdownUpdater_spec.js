'use strict';
var MenuItemCountdownUpdater = require('./../../app/javascripts/main/MenuItemCountdownUpdater.js');
const {MenuItem} = require('electron');
var assert = require('chai').assert;

describe('constructor', function() {

});

describe('formatTime', function() {
  it(`returns 1:43:58 when given milliseconds of 92638000`, function() {
    var updater = new MenuItemCountdownUpdater();
    var result = updater.formatTime(92638000);

    assert.equal("1:43:58", result);
  });
});

describe('setMenuItemTextToTime', function() {
  it(`sets a MenuItem's text to '10:43:58' when passed '10:43:58'`, function() {
    var menuItem = {};
    var updater = new MenuItemCountdownUpdater();
    updater.setMenuItemTextToTime(menuItem, "10:43:58");
    assert.equal("10:43:58", menuItem.text);
  });
})
