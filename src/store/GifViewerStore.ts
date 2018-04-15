import { observable, action, computed } from "mobx";

import GifFactory from "../logic/model/GifFactory";

export type GifViewerStoreType = {
  width: number;
  height: number;
  repeat: number;
  delay: number;
  base64: string;
  srcList: string[];
};

export default class GifViewerStore {
  @observable public width: number = 100;
  @observable public height: number = 100;
  @observable public repeat: number = 0;
  @observable public delay: number = 100;
  @observable public srcList: string[] = [];
  @observable private base64: string = "";

  @computed
  public get dataUrl() {
    return `data:image/gif;base64,${this.base64}`;
  }

  @action.bound
  public onChangeWidth(value: number) {
    this.width = value;
  }

  @action.bound
  public onChangeHeight(value: number) {
    this.height = value;
  }

  @action.bound
  public onChangeDelay(value: number) {
    this.delay = value;
  }

  @action.bound
  public onChangeRepeat(value: number) {
    this.repeat = value;
  }

  @action.bound
  public addSrc(src: string) {
    this.srcList.push(src);
  }

  @action.bound
  public setSrc(srcList: string[]) {
    this.srcList = srcList;
  }

  @action.bound
  public async updateImage(canvas: HTMLCanvasElement) {
    this.base64 = await GifFactory.createData(
      canvas,
      this.srcList,
      this.width,
      this.height,
      this.delay,
      this.repeat
    );
  }
}
