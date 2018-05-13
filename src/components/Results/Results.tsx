import * as React from "react";

import { Consumer, IContext } from "../context";
import { IResultProps, Result } from "../Result";

const STATUS_UNAUTHORISED = 403;

export interface IResultsProps {
  ResultRenderer: React.ComponentType<IResultProps>;
}

export interface IResultsState {}

export class Results extends React.Component<IResultsProps, IResultsState> {
  public static defaultProps = {
    ResultRenderer: Result
  };

  public render() {
    const { ResultRenderer } = this.props;

    return (
      <Consumer>
        {({ response }) => {
          if (response === null || response.isEmpty()) {
            return null;
          }

          if (response.isError()) {
            const error = response.getError() as Error;
            // @ts-ignore: RequestError
            if (error.code === STATUS_UNAUTHORISED) {
              return (
                <div>
                  Authorisation for this request failed. Check your credentials.
                </div>
              );
            }
            return <div>{error.message}</div>;
          }

          return (
            <div>
              {(response.getResults() as { [k: string]: any }).map(
                (result: { [k: string]: any }, index: number) => {
                  const key =
                    result.values._id || "" + index + result.values.url;
                  const token =
                    result.tokens &&
                    result.tokens.click &&
                    result.tokens.click.token;

                  return (
                    <ResultRenderer
                      key={key}
                      token={token}
                      values={result.values}
                      resultClicked={() => {}}
                    />
                  );
                }
              )}
            </div>
          );
        }}
      </Consumer>
    );
  }
}
