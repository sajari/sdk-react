import * as React from "react";

import { Consumer } from "../context";
import { ResultClickedFn } from "../context/pipeline/context";
import { TokenLink } from "./TokenLink";

import { Container, Description, Title, URL } from "./styled";

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
      <Container>
        <Title>
          <TokenLink
            token={token}
            url={values.url as string}
            text={values.title as string}
            resultClicked={resultClicked}
          />
        </Title>
        <Description>{values.description as string}</Description>
        <URL>
          <TokenLink
            token={token}
            url={values.url as string}
            resultClicked={resultClicked}
          />
        </URL>
      </Container>
    );
  }
}
