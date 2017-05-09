import MainThreadReceiver from '../../main/js/core/mainThreadReceiver'
import SleepModeSleeper from '../../main/js/core/sleepers/SleepModeSleeper'

describe('mainThreadReceiver', () => {
  describe('constructor', () => {
    /* import ipcMain doesn't work right in unit tests
    so we have a level of trust here. I'm sure there's 
    actually a way to test this but it wasn't valuable enough
    to pursue too deeply. */

    it('should default commandName to sleep-tight.signal', ()=> {
      const handler = new MainThreadReceiver();
      expect(handler.commandName).toBe("sleep-tight.signal");
    });
    it('should default sleeper to instance of SleepModeSleeper', ()=> {
      const handler = new MainThreadReceiver();
      expect(handler.sleeper).toBeInstanceOf(SleepModeSleeper);
    });
  });
  
  describe('setup', () => {
    it('should call main.on with commandName', () => {
      const handler = new MainThreadReceiver();
      handler.commandName = "mock.signal";
      handler.main = {on:jest.fn()};
      handler.setup();
      expect(handler.main.on).toHaveBeenCalledWith(handler.commandName, handler.invokeSleeper);
    });
  });
  
  describe('invokeSleeper', () => {
    it('should call sleeper.sleepNow()', () => {
      const handler = new MainThreadReceiver();
      handler.sleeper = { sleepNow:jest.fn() };
      handler.invokeSleeper();
      expect(handler.sleeper.sleepNow).toHaveBeenCalled();
    });
  });
  
});