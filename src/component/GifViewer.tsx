import * as React from "react";
import { LazyInit } from "../lib/LazyInitDecorator";
import { LoadImage } from "../lib/LoadImage";
import "jsgif/GIFEncoder";
import "jsgif/b64";

export type GifViewerProps = {
  srcList: string[];
  delay: number;
  repeat: number;
  height: number;
  width: number;
};

export type GifViewerState = {
  encoder?: GIFEncoder;
  dataUrl: string;
};

export default class GifViewer extends React.Component<
  GifViewerProps,
  GifViewerState
> {
  private canvas: HTMLCanvasElement | null = null;

  constructor(props: GifViewerProps) {
    super(props);
    this.state = { dataUrl: "" };
  }

  public componentWillReceiveProps(next: GifViewerProps) {
    if (this.state.encoder) {
      this.state.encoder.finish();
    }
    Promise.all(next.srcList.map(v => LoadImage(v))).then(items => {
      const encoder = new GIFEncoder();
      encoder.setRepeat(next.repeat);
      encoder.setDelay(next.delay);
      encoder.setSize(next.width, next.height);
      encoder.start();
      const context = this.canvas!.getContext("2d");
      items.forEach(v => {
        context!.drawImage(v, 0, 0, next.width, next.height);
        encoder.addFrame(context!);
      });
      // encoder.finish();

      this.setState({
        dataUrl: `data:image/gif;base64,${encode64(
          encoder.stream().getData()
        )}`,
        encoder
      });
    });
  }

  public shouldComponentUpdate(next: GifViewerProps) {
    return (
      next.srcList.length > 0 &&
      (this.props.delay !== next.delay ||
        this.props.height !== next.height ||
        this.props.width !== next.width ||
        this.props.repeat !== next.repeat ||
        this.props.srcList.some((v, i) => next.srcList[i] === v))
    );
  }

  render() {
    return (
      <div className="GIFViewer">
        <canvas ref={e => (this.canvas = e)} />
        <img src={this.state.dataUrl} alt="" />
      </div>
    );
  }
}
