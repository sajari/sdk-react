import * as React from "react";
import { ResultClickedFn } from "../context/pipeline/context";
import { Link } from "./styled";

const TOKEN_URL = "https://www.sajari.com/token/";

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
  public state = { clicked: false };

  public render() {
    const { token, url, text, styles = {}, children } = this.props;

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
        href={token ? TOKEN_URL + token : url}
        onMouseDown={this.click}
        styles={styles}
      >
        {renderChildren}
      </Link>
    );
  }

  private click = () =>
    this.setState(
      state => ({ ...state, clicked: true }),
      () => {
        const { url, resultClicked } = this.props;
        resultClicked(url);
      }
    );
}
