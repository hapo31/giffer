import * as React from "react";
import { Provider } from "mobx-react";

import GifViewer from "./GifViewer/GifViewerComponent";
import Draggable from "../atom/Draggable/Draggable";
import GifViewerStore from "../store/GifViewerStore";
import storeManager from "../logic/model/StoreManager";

export class RootComponent extends React.Component {
  render() {
    return (
      <>
        <button onClick={this.onClickResetStore}>リセット</button>
        <Provider
          gifViewer={storeManager.loadStore(GifViewerStore, "gifViewer")}
        >
          <GifViewer onChanged={this.onChangedGifViewerStore} />
        </Provider>
      </>
    );
  }

  private onChangedGifViewerStore = (store: GifViewerStore) => {
    storeManager.writeStore("gifViewer", store);
  };

  private onClickResetStore = () => {
    storeManager.writeStore("gifViewer", null);
    location.reload();
  };
}
