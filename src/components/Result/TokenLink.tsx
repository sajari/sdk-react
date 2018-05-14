import * as React from "react";
import { ResultClickedFn } from "../context/context";

const TOKEN_URL = "https://www.sajari.com/token/";

export interface ITokenLinkProps {
  token: string;
  url: string;
  resultClicked: ResultClickedFn;
  text?: string;
  children?: React.ReactNode;
}

export interface ITokenLinkState {
  clicked: boolean;
}

export class TokenLink extends React.PureComponent<
  ITokenLinkProps,
  ITokenLinkState
> {
  public state = { clicked: false };

  public render() {
    const { token, url, text, children } = this.props;

    let decodedText;
    try {
      decodedText = decodeURI(url);
    } catch (e) {
      // encoded url was malformed, fall back to displaying the encoded text
      decodedText = url;
    }

    // if the text prop is provided, use that instead of the decoded URI
    decodedText = text ? text : decodedText;

    return (
      <a
        href={token ? TOKEN_URL + token : url}
        onMouseDown={this.click}
        style={{
          overflow: "hidden",
          textOverflow: "ellipsis"
        }}
      >
        {decodedText}
        {children}
      </a>
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
