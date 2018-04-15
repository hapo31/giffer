import * as React from "react";
import { Provider } from "mobx-react";

import GifViewer from "./GifViewer/GifViewerComponent";
import Draggable from "../atom/Draggable/Draggable";
import GifViewerStore from "../store/GifViewerStore";

const stores = new GifViewerStore();

export class RootComponent extends React.Component {
  render() {
    return (
      <Provider gifViewer={stores}>
        <GifViewer />
      </Provider>
    );
  }
}
