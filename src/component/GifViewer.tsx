import * as React from "react";
import { LazyInit } from "../lib/LazyInitDecorator";
import { LoadImage } from "../lib/LoadImage";
import GIFEncoder from "../lib/GIFEncoder";

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
      const maxWidth = Math.max(0, ...items.map(v => v.width));
      const maxIndex = items.findIndex(v => v.width === maxWidth);
      const height = items[maxIndex] ? items[maxIndex].height : 0;
      const encoder = new GIFEncoder();

      encoder.setRepeat(next.repeat);
      encoder.setDelay(next.delay);
      encoder.setSize(maxWidth, height);
      encoder.start();
      const context = this.canvas!.getContext("2d");
      items.forEach(v => {
        context!.drawImage(v, 0, 0, maxWidth, height);
        encoder.addFrame(context!);
      });
      encoder.finish();

      this.setState({
        dataUrl: `data:image/gif;base64,${encode64(
          encoder.stream().getData()
        )}`,
        encoder,
        width: maxWidth,
        height
      });
    });
  }

  public shouldComponentUpdate(next: GifViewerProps) {
    return (
      next.srcList.length > 0 &&
      (this.props.delay !== next.delay ||
        this.props.repeat !== next.repeat ||
        this.props.srcList.some((v, i) => next.srcList[i] === v))
    );
  }

  render() {
    return (
      <div className="GIFViewer">
        <canvas
          ref={e => (this.canvas = e)}
          width={this.state.width}
          height={this.state.height}
        />
        <img src={this.state.dataUrl} alt="" />
        {this.state.width}x{this.state.height}
      </div>
    );
  }
}
