import { ClickToken, RequestError, Result as SDKResult } from "@sajari/sdk-js";
import idx from "idx";
import * as React from "react";

import { Consumer } from "../context";
import { Result, ResultProps, ResultStyles } from "../Result";

import { Container, Error, ResultItem } from "./styled";

const STATUS_UNAUTHORISED = 403;

export interface ResultsProps {
  ResultRenderer?: React.ComponentType<ResultProps>;
  showImages?: boolean;
  styles?: {
    container?: React.CSSProperties;
    item?: React.CSSProperties;
    result?: ResultStyles;
  };
}

export class Results extends React.Component<ResultsProps, {}> {
  public render() {
    const { ResultRenderer = Result, showImages, styles = {} } = this.props;

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
            const error = response.getError() as RequestError;
            if (error.httpStatusCode === STATUS_UNAUTHORISED) {
              return (
                <Error>
                  Authorisation for this request failed. Check your credentials.
                </Error>
              );
            }
            return <Error>{error.message}</Error>;
          }

          const results =
            response !== undefined ? response.getResults() || [] : [];

          return results.length > 1 ? (
            <Container styles={idx(styles, _ => _.container)}>
              {results.map((result: SDKResult, index: number) => {
                const key =
                  (result.values._id as string) ||
                  (("" + index + result.values.url) as string);
                const token =
                  result.token && (result.token as ClickToken).click;

                return (
                  <ResultItem key={key} styles={idx(styles, _ => _.item)}>
                    <ResultRenderer
                      token={token}
                      itemIndex={index}
                      values={result.values}
                      resultClicked={resultClicked}
                      showImage={showImages}
                      styles={idx(styles, _ => _.result)}
                    />
                  </ResultItem>
                );
              })}
            </Container>
          ) : null;
        }}
      </Consumer>
    );
  }
}
