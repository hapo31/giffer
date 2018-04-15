import LoadImage from "../lib/LoadImage";
import Gif2Base64 from "../lib/Gif2Base64";

export default class GifFactory {
  public static async createData(
    canvas: HTMLCanvasElement,
    srcList: string[],
    width: number,
    height: number,
    delay: number,
    repeat = 0
  ) {
    return Promise.all(srcList.map(v => LoadImage(v))).then(items => {
      const encoder = new Gif2Base64(items, canvas);
      return encoder.encode(width, height, repeat, delay);
    });
  }
}
