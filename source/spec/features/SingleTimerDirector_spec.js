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
  it(`sets activeInterval`, function() {
    var director = new SingleTimerDirector();
    assert.isNull(director.activeInterval);
    director.startNew(function() {
      console.log("startNew:", director.activeInterval);
      assert.isNotNull(director.activeInterval);
    }, 100);
    assert.fail("what the heck")
    setTimeout(function() {
      done();
    }, 1000);
  });
});
describe('#timeoutClearer', function() {
  it(`defaults to global clearTimeout method`, function() {
    var director = new SingleTimerDirector();
    assert.equal(clearTimeout, director.timeoutClearer)
  });
});
describe('#stopActive', function() {
  it(`calls timeoutClearer with the activeTimer`, function() {
    var director = new SingleTimerDirector();
    director.activeTimer = "does it really matter if this is a timer?";
    var wasClearTimeoutCalled = false;
    director.timeoutClearer = function(toClear) {
      wasClearTimeoutCalled = true;
      assert.equal(director.activeTimer, toClear);
    };

    setTimeout(function() {
      assert.isTrue(wasClearTimeoutCalled);
      done();
    }, 0.25);
  });
  it(`does not call timeoutClearer if activeTimer is null`, function() {
    var director = new SingleTimerDirector();
    director.activeTimer = null;
    var wasClearTimeoutCalled = false;
    director.timeoutClearer = function(toClear) {
      wasClearTimeoutCalled = true;
      assert.equal(director.activeTimer, toClear);
    };

    setTimeout(function() {
      assert.isFalse(wasClearTimeoutCalled);
      done();
    }, 0.25);
  });
});
describe('activeInterval', function() {
  it(`defaults to null`, function() {
    var director = new SingleTimerDirector();
    assert.isNull(director.activeInterval);
  });
});
describe('tickInterval', function() {
  it(`defaults to 1000ms`, function() {
    var director = new SingleTimerDirector();
    assert.equal(1000, director.tickInterval);
  });
});
