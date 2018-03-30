import * as React from "react";
import GifViewer from "./GifViewer";
import { GifViewerState } from "../State/GifViewer";

export type RootState = {
  gifViewer: GifViewerState;
};

export class RootComponent extends React.Component<{}, RootState> {
  componentWillMount() {
    this.setState({
      gifViewer: new GifViewerState()
    });
  }

  render() {
    return (
      <>
        <div className="giffer">
          <GifViewer {...this.state.gifViewer} />
        </div>
        <div>
          ファイル：<input type="file" onChange={this.onChangeFile} />
        </div>
      </>
    );
  }

  private onChangeFile = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const gifViewer = this.state.gifViewer;
    gifViewer.srcList.push(URL.createObjectURL(ev.target.files!.item(0)));
    gifViewer.delay = 10;
    gifViewer.repeat = 0;
    gifViewer.height = 200;
    gifViewer.width = 200;
    this.setState({ gifViewer });
  };
}
