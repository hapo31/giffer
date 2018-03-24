import * as React from "react";
import { LazyInit } from "../lib/LazyInitDecorator";

export type GifViewerProps = {
  srcList: string[];
  currentTime: number;
  time: number;
};

export type GifViewerState = {};

export default class GifViewer extends React.Component<GifViewerProps> {
  private canvas: HTMLCanvasElement | null = null;

  render() {
    const { srcList, currentTime, time } = this.props;

    return (
      <div className="GIFViewer">
        {(() => {
          if (time < currentTime || srcList.length === 0) {
            return null;
          }
          const currentSourcePos = Math.floor(
            time / srcList.length * currentTime
          );
          return (
            <canvas
              ref={e => {
                this.canvas = e;
              }}
            />
          );
        })()}
      </div>
    );
  }
}
