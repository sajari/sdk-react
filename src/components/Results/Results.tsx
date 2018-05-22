import idx from "idx";
import * as React from "react";

import { Consumer } from "../context";
import { IResultProps, IResultStyles, Result } from "../Result";

import { Container, Error, ResultItem } from "./styled";

const STATUS_UNAUTHORISED = 403;

export interface IResultsProps {
  ResultRenderer: React.ComponentType<IResultProps>;
  styles?: {
    container?: React.CSSProperties;
    item?: React.CSSProperties;
    result?: IResultStyles;
  };
}

export class Results extends React.Component<IResultsProps, {}> {
  public static defaultProps = {
    ResultRenderer: Result
  };

  public render() {
    const { ResultRenderer, styles = {} } = this.props;

    return (
      <Consumer>
        {({ search: { response }, resultClicked }) => {
          if (
            response === null ||
            response === undefined ||
            response.isEmpty()
          ) {
            return null;
          }

          if (response.isError()) {
            const error = response.getError() as Error;
            // @ts-ignore: RequestError
            if (error.code === STATUS_UNAUTHORISED) {
              return (
                <Error>
                  Authorisation for this request failed. Check your credentials.
                </Error>
              );
            }
            return <Error>{error.message}</Error>;
          }

          return (
            <Container styles={idx(styles, _ => _.container)}>
              {(response.getResults() as { [k: string]: any }).map(
                (result: { [k: string]: any }, index: number) => {
                  const key =
                    result.values._id || "" + index + result.values.url;
                  const token =
                    result.tokens &&
                    result.tokens.click &&
                    result.tokens.click.token;

                  return (
                    <ResultItem key={key} styles={idx(styles, _ => _.item)}>
                      <ResultRenderer
                        token={token}
                        values={result.values}
                        resultClicked={resultClicked}
                        styles={idx(styles, _ => _.result)}
                      />
                    </ResultItem>
                  );
                }
              )}
            </Container>
          );
        }}
      </Consumer>
    );
  }
}
