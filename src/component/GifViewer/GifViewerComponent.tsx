import * as React from "react";
import LoadImage from "../../logic/lib/LoadImage";
import encode64 from "../../logic/lib/b64";
import Spinner from "../../atom/Spinner/Spinner";
import Gif2Base64 from "../../logic/lib/Gif2Base64";
import GifFoundation from "../../atom/GifFoundation/GifFoundation";
import Draggable from "../../atom/Draggable/Draggable";
import PassExtensions from "../../constant/AllowExtensions";
import GifViewerStore from "../../store/GifViewerStore";
import { inject, observer } from "mobx-react";
import createDataUrl from "../../logic/lib/createDataUrl";

export type GifViewerProps = {
  gifViewer?: GifViewerStore;
  onChanged: (store: GifViewerStore) => void;
};

@inject("gifViewer")
@observer
export default class GifViewerComponent extends React.Component<
  GifViewerProps
> {
  private canvas: HTMLCanvasElement | null = null;

  componentDidMount() {
    if (!this.props.gifViewer || this.props.gifViewer.srcList.length === 0) {
      return;
    }
    this.props.gifViewer.updateImage(this.canvas!);
  }

  render() {
    if (!this.props.gifViewer) {
      return null;
    }
    const { srcList, width, height, dataUrl } = this.props.gifViewer;
    return (
      <>
        <div className="imageList">
          {srcList.map((v, i) => (
            <Draggable>
              <img src={v} key={`img${i}`} width={100} height={100} alt="" />
            </Draggable>
          ))}
        </div>
        <div>
          ファイル：<input type="file" multiple onChange={this.onChangeFile} />
        </div>
        <div>
          Delay:
          <input
            type="number"
            value={this.props.gifViewer.delay}
            onChange={this.onChangeInputBind(
              this.props.gifViewer.onChangeDelay
            )}
          />ms
        </div>
        <div>
          Size: width<input
            type="number"
            value={this.props.gifViewer.width}
            onChange={this.onChangeInputBind(
              this.props.gifViewer.onChangeWidth
            )}
          />
          height<input
            type="number"
            value={this.props.gifViewer.height}
            onChange={this.onChangeInputBind(
              this.props.gifViewer.onChangeHeight
            )}
          />
        </div>
        <div>
          <button onClick={this.onClickUpdate}>Update</button>
        </div>
        <div className="GifFoundation">
          <GifFoundation
            onMounted={this.onMountedGif}
            dataUrl={dataUrl}
            width={width}
            height={height}
          />
        </div>
      </>
    );
  }

  /**
   * ハンドラを受け取ってChangeEventに対するイベントハンドラを返す高階関数
   */
  private onChangeInputBind = (handler: (value: number) => void) => {
    return (ev: React.ChangeEvent<HTMLInputElement>) => {
      // Formの入力値をparseIntしてハンドラに渡す
      const n = parseInt(ev.currentTarget.value, 10);
      if (!isNaN(n)) {
        handler(n);
      }
    };
  };

  private onMountedGif = (canvas: HTMLCanvasElement) => {
    this.canvas = canvas;
  };

  private onChangeFile = async (ev: React.ChangeEvent<HTMLInputElement>) => {
    if (
      this.props.gifViewer == null ||
      ev.target == null ||
      ev.target.files == null ||
      !PassExtensions(ev.target.value.toLocaleLowerCase())
    ) {
      return;
    }
    ev.persist();

    for (let i = 0; i < ev.target.files.length; ++i) {
      const base64 = await createDataUrl(ev.target.files.item(i)!);
      this.props.gifViewer.addSrc(base64);
    }
    this.props.gifViewer.updateImage(this.canvas!);
    this.props.onChanged(this.props.gifViewer);
  };

  private onClickUpdate = (ev: React.MouseEvent<HTMLButtonElement>) => {
    this.props.gifViewer!.updateImage(this.canvas!);
    this.props.onChanged(this.props.gifViewer!);
  };
}
