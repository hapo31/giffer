import * as React from "react";
import {
  isReactElement,
  ReactElementType
} from "../../logic/helpler/TypeHelper";

export type DraggableProps = {
  anchorPoint?: { x: number; y: number };
  onDrag?: React.MouseEventHandler<HTMLElement>;
  onDragging?: (ev: React.MouseEvent<any>) => boolean;
  onDrop?: React.MouseEventHandler<HTMLElement>;
  className?: string;
};

type State = {
  dragging: boolean;
  width: number;
  height: number;
  x: number;
  y: number;
};

export default class Draggable extends React.Component<DraggableProps, State> {
  private div?: HTMLElement;

  componentWillMount() {
    this.setState({
      dragging: false,
      width: 0,
      height: 0,
      x: 0,
      y: 0
    });
  }

  componentDidMount() {
    if (isReactElement(this.props.children)) {
      this.setState({
        width: this.props.children.props.width || 0,
        height: this.props.children.props.height || 0
      });
    }
  }

  // childrenが変わったことを検知する方法が分かるまで一旦コメントアウト
  // shouldComponentUpdate(prevProps: DraggableProps, prevState: State) {
  //   return (
  //     this.state.height !== prevState.height ||
  //     this.state.width !== prevState.width ||
  //     this.state.dragging !== prevState.dragging ||
  //     this.state.x !== prevState.x ||
  //     this.state.y !== prevState.y
  //   );
  // }

  render() {
    return (
      <>
        {this.createSkelton(this.state.width, this.state.height)}
        <div
          ref={c => (this.div = c!)}
          onMouseDown={this.onMouseDown}
          onMouseMove={this.onMouseMove}
          onMouseUp={this.onMouseUp}
          onMouseLeave={this.onMouseUp}
          className={this.props.className}
          style={this.style}
        >
          {this.props.children}
        </div>
      </>
    );
  }

  private get style(): React.CSSProperties {
    return {
      width: `${this.state.width}px`,
      height: `${this.state.height}px`,
      display: "inline-block",
      ...(this.state.dragging
        ? {
            position: "fixed",
            top: `${this.state.y - this.div!.clientHeight / 2}px`,
            left: `${this.state.x - this.div!.clientWidth / 2}px`
          }
        : {
            position: "inherit"
          })
    };
  }

  private createSkelton(width: number, height: number) {
    if (this.state.dragging) {
      return <div style={{ width, height, display: "inline-block" }} />;
    } else {
      return null;
    }
  }

  private onMouseDown: React.MouseEventHandler<HTMLElement> = ev => {
    ev.preventDefault();
    this.setState({
      x: ev.pageX,
      y: ev.pageY,
      dragging: true
    });
    if (this.props.onDrag) {
      this.props.onDrag(ev);
    }
  };

  private onMouseMove: React.MouseEventHandler<HTMLElement> = ev => {
    if (!this.state.dragging) {
      return;
    }
    this.setState({
      x: ev.pageX,
      y: ev.pageY
    });
    if (this.props.onDragging != null) {
      if (!this.props.onDragging(ev)) {
        this.setState({
          x: 0,
          y: 0,
          dragging: false
        });
      }
    }
    ev.preventDefault();
  };

  private onMouseUp: React.MouseEventHandler<HTMLElement> = ev => {
    if (!this.state.dragging) {
      return;
    }
    ev.preventDefault();
    this.setState({
      x: 0,
      y: 0,
      dragging: false
    });
    if (this.props.onDrop) {
      this.props.onDrop(ev);
    }
  };
}
