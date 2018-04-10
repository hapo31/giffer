import * as React from "react";

export type DraggableProps = {
  anchorPoint?: { x: number; y: number };
  onDrag?: React.MouseEventHandler<HTMLElement>;
  onDragging?: React.MouseEventHandler<HTMLElement>;
  onDrop?: React.MouseEventHandler<HTMLElement>;
  className?: string;
};

type State = {
  dragging: boolean;
  x: number;
  y: number;
};

export default class Draggable extends React.Component<DraggableProps, State> {
  private span?: HTMLElement;

  componentWillMount() {
    this.setState({
      dragging: false,
      x: 0,
      y: 0
    });
  }

  shouldComponentUpdate(prevProps: DraggableProps, prevState: State) {
    return (
      this.state.dragging !== prevState.dragging ||
      this.state.x !== prevState.x ||
      this.state.y !== prevState.y
    );
  }

  render() {
    return (
      <span
        ref={c => (this.span = c!)}
        onMouseDown={this.onMouseDown}
        onMouseMove={this.onMouseMove}
        onMouseUp={this.onMouseUp}
        className={this.props.className}
        style={this.style}
      >
        {this.props.children}
      </span>
    );
  }

  private get style(): React.CSSProperties | undefined {
    return this.state.dragging
      ? {
          position: "fixed",
          top:
            this.state.y +
            (this.span ? this.span.clientHeight / 2 - this.span.offsetTop : 0) +
            (this.props.anchorPoint ? this.props.anchorPoint.y : 0),
          left:
            this.state.x +
            (this.span ? this.span.clientWidth / 2 - this.span.offsetLeft : 0) +
            (this.props.anchorPoint ? this.props.anchorPoint.x : 0)
        }
      : {
          position: "inherit"
        };
  }

  private onMouseDown: React.MouseEventHandler<HTMLElement> = ev => {
    console.log("onMouseDown");
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
    console.log("onMouseMove");
    this.setState({
      x: ev.pageX - this.state.x,
      y: ev.pageY - this.state.y
    });
    if (this.props.onDragging != null) {
      this.props.onDragging(ev);
    }
    ev.preventDefault();
  };

  private onMouseUp: React.MouseEventHandler<HTMLElement> = ev => {
    ev.preventDefault();
    console.log("onMouseUp");
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
