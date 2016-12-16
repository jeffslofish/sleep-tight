var MenuItemCountdownUpdater = require('./../../app/javascripts/main/MenuItemCountdownUpdater.js');'use strict'
const {MenuItem} = require('electron');
var assert = require('chai').assert;

describe('constructor', function() {

});

describe('formatTime', function() {
  it(`returns 10:43:58 when given milliseconds of 386380000000`, function() {
    var updater = new MenuItemCountdownUpdater();

    var result = updater.formatTime(386380000000);

    assert.equal("10:43:58", result);
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
