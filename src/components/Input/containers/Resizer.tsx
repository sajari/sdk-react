// @ts-ignore: module missing defintion file
import isEqual from "deep-is";
// @ts-ignore: module missing defintions file
import memoize from "memoize-one";
import * as React from "react";
import ResizeObserver from "resize-observer-polyfill";

export interface ResizerProps {
  element?: HTMLElement;
  styles?: React.CSSProperties;
  children: RenderFn;
}

export interface ResizerState {
  client: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
  offset: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
}

export interface RenderFnProps {
  client: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
  offset: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
}

export type RenderFn = (props: RenderFnProps) => React.ReactNode;

export class Resizer extends React.Component<ResizerProps, ResizerState> {
  public state = {
    client: {
      top: 0,
      left: 0,
      width: 0,
      height: 0
    },
    offset: {
      top: 0,
      left: 0,
      width: 0,
      height: 0
    }
  } as ResizerState;

  private observer?: ResizeObserver;
  private getContainerProps = memoize((state: ResizerState) => state, isEqual);

  public componentDidMount() {
    const { element } = this.props;

    this.observer = new ResizeObserver((entries, observer) => {
      for (const entry of entries) {
        const newState: ResizerState = {
          client: {
            top: entry.target.clientTop,
            left: entry.target.clientLeft,
            width: entry.target.clientWidth,
            height: entry.target.clientHeight
          },
          offset: {
            // @ts-ignore
            top: entry.target.offsetTop,
            // @ts-ignore
            left: entry.target.offsetLeft,
            // @ts-ignore
            width: entry.target.offsetWidth,
            // @ts-ignore
            height: entry.target.offsetHeight
          }
        };

        if (isEqual(this.state, newState)) {
          return;
        }

        this.setState(state => ({
          ...state,
          ...newState
        }));
      }
    });

    if (element === undefined) {
      return;
    }
    this.observer.observe(element);
  }

  public componentDidUpdate(prevProps: ResizerProps) {
    const { element } = this.props;
    const { element: prevElem } = prevProps;

    if (this.observer === undefined || element === undefined) {
      return;
    }

    if (prevElem !== undefined) {
      this.observer.unobserve(prevElem);
    }
    this.observer.observe(element);
  }

  public componentWillUnmount() {
    if (this.observer === undefined) {
      return;
    }
    this.observer.disconnect();
  }

  public render() {
    const { children, styles } = this.props;

    if (typeof children !== "function") {
      throw new Error("Resizer requires a render function as a child.");
    }

    const renderProps = this.getContainerProps(this.state);
    return children(renderProps);
  }
}
