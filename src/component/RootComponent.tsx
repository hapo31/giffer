import * as React from "react";
import GifViewer from "./GifViewer";
import { GifViewerState } from "../state/GifViewer";
import { PassExtensions } from "../constants/AllowExtensions";
import Draggable from "../atom/Draggable/Draggable";

export type RootState = {
  gifViewer: GifViewerState;
};

const INIT_PARAM = {
  delay: 100,
  repeat: 0,
  width: 100,
  height: 100
};

export class RootComponent extends React.Component<{}, RootState> {
  private delayElement?: HTMLInputElement;
  private widthElement?: HTMLInputElement;
  private heightElement?: HTMLInputElement;

  componentWillMount() {
    this.setState({
      gifViewer: new GifViewerState()
    });
  }

  render() {
    return (
      <>
        <div className="imageList">
          {this.state.gifViewer.srcList.map((v, i) => (
            <Draggable>
              <img src={v} key={`img${i}`} width={100} height={100} alt="" />
            </Draggable>
          ))}
        </div>
        <div>
          ファイル：<input type="file" onChange={this.onChangeFile} />
        </div>
        <div>
          Delay: <input type="number" ref={e => (this.delayElement = e!)} />ms
        </div>
        <div>
          Size: width<input type="number" ref={e => (this.widthElement = e!)} />
          height<input type="number" ref={e => (this.heightElement = e!)} />
        </div>
        <div>
          <button onClick={this.onClickUpdate}>Update</button>
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
    if (gifViewer.srcList.length === 0) {
      gifViewer.delay = INIT_PARAM.delay;
      gifViewer.repeat = INIT_PARAM.repeat;
      gifViewer.width = INIT_PARAM.width;
      gifViewer.height = INIT_PARAM.height;

      this.delayElement!.value = `${INIT_PARAM.delay}`;
      this.widthElement!.value = `${INIT_PARAM.width}`;
      this.heightElement!.value = `${INIT_PARAM.height}`;
    }
    gifViewer.srcList.push(URL.createObjectURL(ev.target.files!.item(0)));

    this.setState({ gifViewer });
  };

  private onClickUpdate = (ev: React.MouseEvent<HTMLButtonElement>) => {
    const gifViewer = Object.assign({}, this.state.gifViewer);
    gifViewer.delay = parseInt(this.delayElement!.value, 10);
    gifViewer.width = parseInt(this.widthElement!.value, 10);
    gifViewer.height = parseInt(this.heightElement!.value, 10);
    this.setState({ gifViewer });
  };
}
