import * as React from "react";
import { LazyInit } from "../lib/LazyInitDecorator";
import { LoadImage } from "../lib/LoadImage";
import encode64 from "../lib/b64";

export type GifViewerProps = {
  srcList: string[];
  delay: number;
  repeat: number;
};

export type GifViewerState = {
  encoder?: GIFEncoder;
  dataUrl: string;
  height: number;
  width: number;
};

export default class GifViewer extends React.Component<
  GifViewerProps,
  GifViewerState
> {
  private canvas: HTMLCanvasElement | null = null;

  constructor(props: GifViewerProps) {
    super(props);
    this.state = { dataUrl: "", height: 0, width: 0 };
  }

  public componentWillReceiveProps(next: GifViewerProps) {
    if (this.state.encoder) {
      this.state.encoder.finish();
    }
    Promise.all(next.srcList.map(v => LoadImage(v))).then(items => {
      const width = items[0] ? items[0].width : 0;
      const height = items[0] ? items[0].height : 0;
      const encoder = new GIFEncoder();
      this.canvas!.width = width;
      this.canvas!.height = height;
      const context = this.canvas!.getContext("2d");
      encoder.setRepeat(next.repeat);
      encoder.setDelay(next.delay);
      encoder.start();
      items.forEach(v => {
        context!.fillStyle = "rgb(255,255,255)";
        context!.fillRect(0, 0, width, height);
        context!.drawImage(v, 0, 0, width, height);
        encoder.setSize(width, height);
        const { data } = context!.getImageData(0, 0, width, height);
        encoder.addFrame(data, true);
      });
      encoder.finish();

      this.setState({
        dataUrl: `data:image/gif;base64,${encode64(
          encoder.stream().getData()
        )}`,
        encoder,
        width,
        height
      });
    });
  }

  public shouldComponentUpdate(next: GifViewerProps) {
    return (
      this.props.delay !== next.delay ||
      this.props.repeat !== next.repeat ||
      this.props.srcList.some((v, i) => next.srcList[i] === v)
    );
  }

  render() {
    return (
      <div className="GIFViewer">
        <canvas
          ref={e => (this.canvas = e!)}
          width={this.state.width}
          height={this.state.height}
          style={{ display: "none" }}
        />
        <img src={this.state.dataUrl} alt="" />
        {this.state.width}x{this.state.height}
      </div>
    );
  }
}
