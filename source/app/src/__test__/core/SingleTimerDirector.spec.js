var SingleTimerDirector = require('./../../main/js/core/SingleTimerDirector.js');
var assert = require('chai').assert;

describe('constructor', function() {
  it('has a null activeTimer property', function() {
    var director = new SingleTimerDirector();
    assert.isNull(director.activeTimer);
  });
});

describe('#startNew()', function() {
  it(`sets activeTimer to a Timer instance`, function(done) {
    var director = new SingleTimerDirector();
    var called = false;
    director.tickInterval = 50;
    director.startNew(function() {
      called = true;
      assert.isNotNull(director.activeTimer);
    }, 100);

    setTimeout(function() {
      assert.isTrue(called, '#startNew() callback was not called.');
      done();
    }, 200);
  });
  it(`calls stopActive() before setting new timer`, function(done) {
    var director = new SingleTimerDirector();
    var wasStopActiveCalled = false;
    director.stopActive = function() {
      wasStopActiveCalled = true;
    };
    director.startNew(function(){}, 0);

    setTimeout(function() {
      assert.isTrue(wasStopActiveCalled);
      done();
    }, 0.25);
  });
  it(`sets activeInterval`, function(done) {
    var director = new SingleTimerDirector();
    assert.isNull(director.activeInterval);
    director.startNew(function() {
      assert.isNotNull(director.activeInterval);
    }, 0);
    setTimeout(function() {
      assert.isNotNull(director.activeInterval);
      done();
    }, 0.25);
  });
  it(`calls onTick thrice when interval Ticks is 25ms and timer is for 60ms, twice for time, and lastly for the 'final' tick`, function(done) {
    var director = new SingleTimerDirector();
    var callCount = 0;
    director.tickInterval = 25;
    director.onTick = function() {
      callCount = callCount + 1;
    };
    director.startNew(function() {

    }, 60);

    setTimeout(function() {
      assert.equal(3, callCount);
      done();
    }, 75);
  })
});
describe('#timeoutClearer', function() {
  it(`defaults to global clearTimeout method`, function() {
    var director = new SingleTimerDirector();
    assert.equal(clearTimeout, director.timeoutClearer)
  });
});
describe('#intervalClearer', function() {
  it(`defaults to global clearInterval method`, function() {
    var director = new SingleTimerDirector();
    assert.equal(clearInterval, director.intervalClearer);
  });
});
describe('#stopActive', function() {
  it(`calls timeoutClearer with the activeTimer`, function(done) {
    var director = new SingleTimerDirector();
    director.activeTimer = "does it really matter if this is a timer?";
    var wasClearTimeoutCalled = false;
    director.timeoutClearer = function(toClear) {
      wasClearTimeoutCalled = true;
      assert.equal(director.activeTimer, toClear);
    };

    director.stopActive();

    setTimeout(function() {
      assert.isTrue(wasClearTimeoutCalled);
      done();
    }, 0.25);
  });
  it(`does not call timeoutClearer if activeTimer is null`, function(done) {
    var director = new SingleTimerDirector();
    director.activeTimer = null;
    var wasClearTimeoutCalled = false;
    director.timeoutClearer = function(toClear) {
      wasClearTimeoutCalled = true;
      assert.equal(director.activeTimer, toClear);
    };
    director.stopActive();

    setTimeout(function() {
      assert.isFalse(wasClearTimeoutCalled);
      done();
    }, 0.25);
  });
  it(`calls intervalClearer with the activeInterval`, function(done) {
    var director = new SingleTimerDirector();
    director.stopActive();
    done();
  });
  it(`does not call intervalClearer if activeInterval is null`, function(done) {
    var director = new SingleTimerDirector();
    director.activeInterval = null;
    director.intervalClearer = function(toClear) {
      assert.fail("Shouldn't have been called");
    };
    director.stopActive();

    setTimeout(function() {
      done();
    }, 1);
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
