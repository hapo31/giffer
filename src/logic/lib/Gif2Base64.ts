import encode64 from "./b64";

export default class Gif2Base64 {
  private encoder = new GIFEncoder();
  constructor(
    private images: HTMLImageElement[],
    private canvas: HTMLCanvasElement
  ) {}

  async encode(width: number, height: number, repeat: number, delay: number) {
    this.encoder.setRepeat(repeat);
    this.encoder.setDelay(delay);
    this.encoder.setSize(width, height);
    this.encoder.start();
    this.canvas.width = width;
    this.canvas.height = height;
    const context = this.canvas.getContext("2d")!;
    this.images.forEach(v => {
      context.fillStyle = "rgb(255,255,255)";
      context.fillRect(0, 0, width, height);
      context.drawImage(v, 0, 0, width, height);
      this.encoder.addFrame(
        context.getImageData(0, 0, width, height).data,
        true
      );
    });

    this.encoder.finish();

    return encode64(this.encoder.stream().getData());
  }
}
