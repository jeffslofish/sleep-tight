import { ipcRenderer, remote } from 'electron';

class RendererThreadSignaler {
  constructor() {
    this.renderer = ipcRenderer;
    this.commandName = "sleep-tight.signal"
  }
  sendSignal() {
    this.renderer.send(this.commandName);
  }
}
export default RendererThreadSignaler;