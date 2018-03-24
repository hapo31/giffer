import { GIFEncoder } from "jsgif";
import jsgif = require("jsgif");

export class GIFViewerState {
  private encoder = new GIFEncoder();
  private started = false;

  constructor(
    public srcList: string[] = [],
    public currentTime: number = 0,
    public time: number = 0
  ) {
    this.encoder.setRepeat(0);
    this.encoder.setDelay(Math.floor(time / srcList.length));
  }

  public start(context: CanvasRenderingContext2D) {
    this.encoder.addFrame(context);
    if (!this.started) {
      this.encoder.start();
      this.started = true;
    }
  }
}
