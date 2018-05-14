import * as React from "react";

import { Consumer, IContext } from "../context";
import { ResultClickedFn } from "../context/context";
import { TokenLink } from "./TokenLink";

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
