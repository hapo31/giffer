/**
 * jsgif type definition by dtsmake.
 */
declare module "jsgif" {
  export class GIFEncoder {
    new(): any;

    setRepeat(value: number): any;
    setDelay(milliseconds: number): any;
    setSize(width: number, height: number): any;
    addFrame(context: CanvasRenderingContext2D): any;
    start(): void;
    finish(): void;
  }
}
