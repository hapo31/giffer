import * as React from "react";
import GifViewer from "./GifViewer";
import { GIFViewerState } from "../State/GifViewer";

export type RootState = {
  gifViewer: GIFViewerState;
};

export class RootComponent extends React.Component<{}, RootState> {
  componentWillMount() {}

  render() {
    return (
      <div className="giffer">
        <GifViewer {...this.state.gifViewer} />
      </div>
    );
  }
}
