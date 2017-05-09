import RendererThreadSignaler from '../../main/js/core/rendererThreadSignaler'
import ipcRenderer from 'electron';

describe('rendererThreadSignaler', () => {
  describe('constructor', () => {
    /* import ipcRenderer doesn't work right in unit tests
    so we have a level of trust here. I'm sure there's 
    actually a way to test this but it wasn't valuable enough
    to pursue too deeply. */

    it('should default command name to sleep-tight.signal', ()=> {
      const handler = new RendererThreadSignaler();
      expect(handler.commandName).toBe("sleep-tight.signal");
    });
  });
  
  describe('sendSignal', () => {
    it('should call renderer.send with commandName', () => {
      const handler = new RendererThreadSignaler();
      handler.commandName = "mock.signal";
      handler.renderer = {send:jest.fn()};
      handler.sendSignal();
      expect(handler.renderer.send).toHaveBeenCalledWith(handler.commandName);
    });
  });
});