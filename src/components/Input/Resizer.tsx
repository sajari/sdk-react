import { isEqual } from "lodash-es";
// @ts-ignore: module missing defintions file
import memoize from "memoize-one";
import * as React from "react";
import ResizeObserver from "resize-observer-polyfill";

export interface IResizerProps {
  element?: HTMLElement;
}

export interface IResizerState {
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

export type RenderFn = (props: IResizerState) => React.ReactNode;

export class Resizer extends React.Component<IResizerProps, IResizerState> {
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
  };

  private observer?: ResizeObserver;
  private getChildProps = memoize((state: IResizerState) => state, isEqual);

  public componentDidMount() {
    const { element } = this.props;

    this.observer = new ResizeObserver((entries, observer) => {
      for (const entry of entries) {
        const newState: IResizerState = {
          client: {
            top: entry.target.clientTop,
            left: entry.target.clientLeft,
            height: entry.target.clientHeight,
            width: entry.target.clientWidth
          },
          offset: {
            // @ts-ignore
            top: entry.target.offsetTop,
            // @ts-ignore
            left: entry.target.offsetLeft,
            // @ts-ignore
            height: entry.target.offsetHeight,
            // @ts-ignore
            width: entry.target.offsetWidth
          }
        };

        if (isEqual(this.state, newState)) { return; }

        this.setState(state => ({
          ...state,
          ...newState
        }));
      }
    });

    if (element === undefined) { return; }
    this.observer.observe(element);
  }

  public componentDidUpdate(prevProps: IResizerProps) {
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
    if (this.observer === undefined) { return; }
    this.observer.disconnect();
  }

  public render() {
    const { children } = this.props;

    if (typeof children !== "function") {
      console.log("Resizer requires a render function");
      return null;
    }

    const props = this.getChildProps(this.state);
    return (children as RenderFn)(props);
  }
}
