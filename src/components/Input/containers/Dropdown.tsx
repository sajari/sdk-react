import * as React from "react";
import { css } from "emotion";
import { StyledProps, styled } from "../../styles";

import { Resizer } from "./Resizer";

export interface DropdownProps {
  isOpen: boolean;
  element?: HTMLElement;
}

export class Dropdown extends React.Component<DropdownProps> {
  render() {
    const { isOpen, element, children } = this.props;
    return (
      <Resizer element={element}>
        {({ offset }) =>
          isOpen ? <Container position={offset}>{children}</Container> : null
        }
      </Resizer>
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
