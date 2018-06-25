import * as React from "react";
import { styled } from "../../styles";

export interface DropdownProps {
  isOpen: boolean;
}

export class Dropdown extends React.Component<DropdownProps> {
  public render() {
    const { isOpen, children } = this.props;
    return isOpen ? (
      <Container>
        <Content>{children}</Content>
      </Container>
    ) : null;
  }
}

const Container = styled("div")({
  boxSizing: "border-box",
  position: "relative",
  width: "100%",
  zIndex: 10000
});

const Content = styled("div")({
  boxSizing: "border-box",
  position: "absolute",
  width: "100%"
});
