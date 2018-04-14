import * as React from "react";

type Props = {
  onMounted: (canvas: HTMLCanvasElement);
  dataUrl: string;
  width: number;
  height: number;
}

export default class GifFoundation extends React.PureComponent<Props> {
  private canvas: HTMLCanvasElement | null = null;

  public componentDidMount() {
    this.props.onMounted(this.canvas!);
  }

  render() {
    return <div className="GIFViewer">
    <canvas
      ref={e => (this.canvas = e!)}
      width={this.props.width}
      height={this.props.height}
      style={{ display: "none" }}
    />
    <img src={this.props.dataUrl} alt="" />
  </div>
  }
}
