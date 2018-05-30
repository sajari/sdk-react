import { isEqual } from "lodash-es";
// @ts-ignore: module missing defintions file
import memoize from "memoize-one";
import * as React from "react";
import ResizeObserver from "resize-observer-polyfill";
import { override, styled, StyledComponent, StyledProps } from "../styles";

export interface ResizerProps {
  element?: HTMLElement;
  styles?: React.CSSProperties;
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

    const { offset } = this.getContainerProps(this.state);
    return (
      <Container position={offset} styles={styles}>
        {children}
      </Container>
    );
  }
}

export interface ContainerProps extends StyledProps<HTMLDivElement> {
  position: {
    top: number;
    left: number;
    height: number;
    width: number;
  };
}

const Container = styled<ContainerProps, "div">("div")(
  {
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
    boxShadow: "0 3px 8px 0 rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.08)",
    boxSizing: "border-box",
    position: "absolute",
    zIndex: 2000
  },
  override,
  ({ position: { width, top, left, height } }) => ({
    left,
    width,
    top: top + height
  })
);
