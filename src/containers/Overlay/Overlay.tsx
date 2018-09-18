import * as React from "react";

import { BlurContainer, Container } from "./styled";

export interface OverlayProps {
  isActive: boolean;

  onOuterClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export class Overlay extends React.Component<OverlayProps> {
  public render() {
    const { isActive } = this.props;
    if (!isActive) {
      return null;
    }

    const { children } = this.props;

    return (
      <BlurContainer className="sj-overlay__shade" onClick={this.onClick}>
        <Container className="sj-overlay__container">{children}</Container>
      </BlurContainer>
    );
  }

  private onClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target;
    // @ts-ignore: nodeName is a property of event.target
    if (target.nodeName !== "DIV") {
      return;
    }
    // @ts-ignore: className is a property of event.target
    if ((target.className || "").split(" ").includes("sj-overlay")) {
      this.props.onOuterClick(event);
    }
  };
}
