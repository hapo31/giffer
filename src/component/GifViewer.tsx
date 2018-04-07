import * as React from "react";
import { LazyInit } from "../lib/LazyInitDecorator";
import { LoadImage } from "../lib/LoadImage";
import encode64 from "../lib/b64";
import { Spinner } from "../Icon/Spinner/Spinner";

export type GifViewerProps = {
  srcList: string[];
  delay: number;
  height: number;
  width: number;
  repeat: number;
};

export type GifViewerState = {
  encoder?: GIFEncoder;
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

  public componentWillReceiveProps(next: GifViewerProps) {
    if (this.state.encoder) {
      this.state.encoder.finish();
    }

    this.setState({ working: true });

    Promise.all(next.srcList.map(v => LoadImage(v)))
      .then(items => {
        const { height, width, repeat, delay } = next;
        const encoder = new GIFEncoder();
        this.canvas!.width = width;
        this.canvas!.height = height;
        const context = this.canvas!.getContext("2d");
        encoder.setRepeat(repeat);
        encoder.setDelay(delay);
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
          encoder
        });
      })
      .then(() => {
        this.setState({ working: false });
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
