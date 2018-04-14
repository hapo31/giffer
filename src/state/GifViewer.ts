import { LoadImage } from "../lib/LoadImage";
import Gif2Base64 from "../lib/Gif2Base64";

export class GifViewerState {
  public srcList: string[] = [];
  public delay: number = 0;
  public repeat: number = 0;
  public width: number = 0;
  public height: number = 0;

  public gifDataBase64: string = "";

  get dataUrl() {
    return `data:image/gif;base64,${this.gifDataBase64}`;
  }

  setList(srcList: string[]) {
    this.srcList = srcList;
  }

  addImage(src: string) {
    this.srcList.push(src);
  }

  createData(canvas: HTMLCanvasElement) {
    Promise.all(this.srcList.map(v => LoadImage(v)))
      .then(items => {
        const { height, width, repeat, delay } = this;
        const encoder = new Gif2Base64(items, canvas);
        return encoder.encode(width, height, repeat, delay);
      })
      .then(base64 => {
        return (this.gifDataBase64 = base64);
      });
  }
}
