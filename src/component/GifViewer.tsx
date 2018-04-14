import * as React from "react";
import { LazyInit } from "../logic/lib/LazyInitDecorator";
import { LoadImage } from "../logic/lib/LoadImage";
import encode64 from "../logic/lib/b64";
import { Spinner } from "../Icon/Spinner/Spinner";
import Gif2Base64 from "../logic/lib/Gif2Base64";

export type GifViewerProps = {
  onMounted: (canvas: HTMLCanvasElement) => void;
  srcList: string[];
  delay: number;
  height: number;
  width: number;
  repeat: number;
};

export default class GifViewer extends React.Component<GifViewerProps> {
  private canvas: HTMLCanvasElement | null = null;

  constructor(props: GifViewerProps) {
    super(props);
    this.state = { dataUrl: "", working: false };
  }

  public shouldComponentUpdate(next: GifViewerProps) {
    return (
      this.props.delay !== next.delay ||
      this.props.repeat !== next.repeat ||
      this.props.srcList.some((v, i) => next.srcList[i] === v)
    );
  }

  public componentDidMount() {
    this.props.onMounted(this.canvas!);
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
        <img src={this.props.dataUrl} alt="" />
        {this.props.width}x{this.props.height}
      </div>
    );
  }
}
