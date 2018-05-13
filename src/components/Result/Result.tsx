import * as React from "react";

import { Consumer, IContext } from "../context";
import { ResultClickedFn } from "../context/context";

export interface IResultProps {
  token: string;
  values: { [k: string]: string | string[] };
  resultClicked: ResultClickedFn;
  score?: number;
  indexScore?: number;
}

export class Result extends React.Component<IResultProps> {
  public render() {
    const { token, values, resultClicked } = this.props;

    return (
      <div>
        <h3>
          <TokenLink
            token={token}
            url={values.url as string}
            text={values.title as string}
            resultClicked={resultClicked}
          />
        </h3>
        <p>{values.description as string}</p>
        <p>
          <TokenLink
            token={token}
            url={values.url as string}
            resultClicked={resultClicked}
          />
        </p>
      </div>
    );
  }
}

const TOKEN_URL = "https://www.sajari.com/token/";

export interface TokenLinkProps {
  token: string;
  url: string;
  resultClicked: ResultClickedFn;
  text?: string;
  children?: React.ReactNode;
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
