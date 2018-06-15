import * as React from "react";
import { ResultClickedFn } from "../context/pipeline/context";
import { Link } from "./styled";

export interface TokenLinkProps {
  token: string;
  url: string;
  resultClicked: ResultClickedFn;
  text?: string;
  children?: React.ReactNode;

  styles?: React.CSSProperties;
}

export interface TokenLinkState {
  clicked: boolean;
}

export class TokenLink extends React.PureComponent<
  TokenLinkProps,
  TokenLinkState
> {
  private anchor?: HTMLAnchorElement;

  public render() {
    const { token, url, text, styles = {}, children, ...rest } = this.props;

    let decodedText;
    try {
      decodedText = decodeURI(url);
    } catch (e) {
      // encoded url was malformed, fall back to displaying the encoded text
      decodedText = url;
    }

    // if the text prop is provided, use that instead of the decoded URI
    decodedText = text ? text : decodedText;

    let renderChildren = children;
    if (renderChildren === undefined) {
      renderChildren = decodedText;
    }

    return (
      <Link
        innerRef={this.anchorRef}
        href={url}
        styles={styles}
        {...rest}
        onMouseDown={this.click}
      >
        {renderChildren}
      </Link>
    );
  }

  private anchorRef = (element: HTMLAnchorElement) => (this.anchor = element);

  private click = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const { url, token, resultClicked } = this.props;

    resultClicked(url);

    if (this.anchor !== undefined) {
      this.anchor.href = token ? token : url;

      if (event.target !== this.anchor) {
        this.anchor.click();
      }

      setTimeout(() => {
        if (this.anchor !== undefined) {
          this.anchor.href = url;
        }
      }, 25);
    }
  };
}
