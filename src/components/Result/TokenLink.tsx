import { css, cx } from "emotion";
import * as React from "react";
import { ClickToken, PosNegToken } from "@sajari/sdk-js";
import { ResultClickedFn } from "../context/pipeline/context";

export interface TokenLinkProps {
  token?: ClickToken | PosNegToken;
  url: string;
  resultClicked: ResultClickedFn;
  text?: string;
  children?: React.ReactNode;

  styles?: React.CSSProperties;
  className?: string;

  [k: string]: any;
}

export interface TokenLinkState {
  clicked: boolean;
}

export class TokenLink extends React.PureComponent<
  TokenLinkProps,
  TokenLinkState
> {
  public state = { clicked: false };

  public render() {
    const {
      token,
      url,
      text,
      styles = {},
      resultClicked,
      children,
      ...rest
    } = this.props;

    let clickToken;
    if (token !== undefined && "click" in token) {
      clickToken = token.click;
    }

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

    const className = cx(this.props.className, css(linkStyles));

    return (
      <a
        href={this.state.clicked && clickToken ? clickToken : url}
        {...rest}
        className={className}
        onMouseDown={this.click}
      >
        {renderChildren}
      </a>
    );
  }

  private click = (_: React.MouseEvent<HTMLAnchorElement>) => {
    const { url, resultClicked } = this.props;
    resultClicked(url);
    this.setState(state => ({ ...state, clicked: true }));
  };
}

const linkStyles = {
  textDecoration: "none",
  "&:hover": {
    cursor: "pointer",
    textDecoration: "underline"
  }
};
