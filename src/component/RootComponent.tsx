import * as React from "react";
import GifViewer from "./GifViewer";
import { GifViewerState } from "../State/GifViewer";
import { PassExtensions } from "../constants/AllowExtensions";

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
        <div>
          ファイル：<input type="file" onChange={this.onChangeFile} />
        </div>
        <div className="giffer">
          <GifViewer {...this.state.gifViewer} />
        </div>
      </>
    );
  }

  private onChangeFile = (ev: React.ChangeEvent<HTMLInputElement>) => {
    if (
      !ev.target.files ||
      !PassExtensions(ev.target.value.toLocaleLowerCase())
    ) {
      return;
    }
    const gifViewer = Object.assign({}, this.state.gifViewer);
    gifViewer.srcList.push(URL.createObjectURL(ev.target.files!.item(0)));
    gifViewer.delay = 100;
    gifViewer.repeat = 0;
    this.setState({ gifViewer });
  };
}
