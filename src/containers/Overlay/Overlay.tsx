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
      <BlurContainer className="sj-overlay" onClick={this.onClick}>
        <Container className="sj-overlay-interface">{children}</Container>
      </BlurContainer>
    );
  }

  private onClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // @ts-ignore: className is a property of event.target
    if (event.target.className.split(" ").includes("sj-overlay")) {
      this.props.onOuterClick(event);
    }
  };
}
