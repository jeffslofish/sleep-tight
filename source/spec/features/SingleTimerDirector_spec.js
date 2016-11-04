var SingleTimerDirector = require('./../../app/javascripts/main/SingleTimerDirector.js');
var assert = require('chai').assert;

describe('construtor', function() {
  it('has a null activeTimer property', function() {
    var director = new SingleTimerDirector();
    assert.isNull(director.activeTimer);
  });
});

describe('#startNew()', function() {
  it(`sets activeTimer to a Timer instance`, function(done) {
    var director = new SingleTimerDirector();
    var called = false;
    director.startNew(function() {
      console.log(`startNew callback invoked`)
      called = true;
      assert.isNotNull(director.activeTimer);
    }, 0.1);

    setTimeout(function() {
      assert.isTrue(called, '#startNew() callback was not called.');
      done();
    }, 0.25);
  });
  it(`calls stopActive() before setting new timer`, function(done) {
    var director = new SingleTimerDirector();
    var wasStopActiveCalled = false;
    director.stopActive = function() {
      wasStopActiveCalled = true;
      assert.isNull(director.activeTimer);
    };
    director.startNew(function(){}, 0);

    setTimeout(function() {
      assert.isTrue(wasStopActiveCalled);
      done();
    }, 0.25);
  });
});
