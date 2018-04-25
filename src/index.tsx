import * as React from "react";
import { render } from "react-dom";
import { RootComponent } from "./component/RootComponent";
import "tslib";
import "./style.css";

render(<RootComponent />, document.getElementById("app"));
