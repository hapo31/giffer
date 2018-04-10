import "tslib";
import Gif2Base64 from "../../lib/Gif2Base64";

export type EncodeMessageType = {
  canvas: HTMLCanvasElement;
  images: HTMLImageElement[];
  width: number;
  height: number;
  delay: number;
  repeat: number;
};

self.onmessage = async message => {
  const data: EncodeMessageType = message.data;
  const encoder = new Gif2Base64(data.images, data.canvas);
  const result = await encoder.encode(
    data.width,
    data.height,
    data.repeat,
    data.delay
  );
  self.postMessage(result, "");
};
