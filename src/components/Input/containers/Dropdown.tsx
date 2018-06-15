import { css } from "emotion";
import * as React from "react";
import { styled, StyledProps } from "../../styles";

import { Resizer } from "./Resizer";

export interface DropdownProps {
  isOpen: boolean;
  element?: HTMLElement;
}

export interface DropdownState {
  top: number;
}

export class Dropdown extends React.Component<DropdownProps, DropdownState> {
  public state = { top: -1 };
  private ticking = false;

  public componentDidMount() {
    document.addEventListener("scroll", this.scrollListener, true);
    this.handleScrollEvent();
  }

  public componentWillUnmount() {
    document.removeEventListener("scroll", this.scrollListener, true);
  }

  public render() {
    const { isOpen, element, children } = this.props;
    const { top } = this.state;
    return (
      <Resizer element={element}>
        {({ offset }) =>
          isOpen ? (
            <Container
              position={{ ...offset, top: top === -1 ? offset.top : top }}
            >
              {children}
            </Container>
          ) : null
        }
      </Resizer>
    );
  }

  private scrollListener = (event: any) => {
    if (!this.ticking) {
      window.requestAnimationFrame(() => {
        this.handleScrollEvent();
        this.ticking = false;
      });
      this.ticking = true;
    }
  };

  private handleScrollEvent = () => {
    const { element } = this.props;
    if (element === undefined) {
      return;
    }

    const { top } = element.getBoundingClientRect();
    if (Math.sign(top) === -1) {
      return;
    }
    this.setState(state => ({ ...state, top }));
  };
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
    boxSizing: "border-box",
    position: "absolute",
    zIndex: 10000
  },
  ({ position: { width, top, left, height } }) => ({
    left,
    width,
    top: top + height
  })
);
