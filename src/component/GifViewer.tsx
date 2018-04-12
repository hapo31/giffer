import * as React from "react";
import { LazyInit } from "../lib/LazyInitDecorator";
import { LoadImage } from "../lib/LoadImage";
import encode64 from "../lib/b64";
import { Spinner } from "../Icon/Spinner/Spinner";
import Gif2Base64 from "../lib/Gif2Base64";

export type GifViewerProps = {
  srcList: string[];
  delay: number;
  height: number;
  width: number;
  repeat: number;
};

export type GifViewerState = {
  dataUrl: string;
  working: boolean;
};

export default class GifViewer extends React.Component<
  GifViewerProps,
  GifViewerState
> {
  private canvas: HTMLCanvasElement | null = null;

  constructor(props: GifViewerProps) {
    super(props);
    this.state = { dataUrl: "", working: false };
  }

  public async componentWillReceiveProps(next: GifViewerProps) {
    this.setState({ working: true });
    const items = await Promise.all( next.srcList.map(v => LoadImage(v)));
    const { height, width, repeat, delay } = next;
    const encoder = new Gif2Base64(items, this.canvas!);
    const base64 = await encoder.encode(width, height, repeat, delay);
    this.setState({
      dataUrl: `data:image/gif;base64,${base64}`,
      working: false
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
          width={this.props.width}
          height={this.props.height}
          style={{ display: "none" }}
        />
        {(() => {
          return this.state.working ? (
            <Spinner />
          ) : (
            <img src={this.state.dataUrl} alt="" />
          );
        })()}
        {this.props.width}x{this.props.height}
      </div>
    );
  }
}
