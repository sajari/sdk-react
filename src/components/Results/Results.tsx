import {
  ClickToken,
  RequestError,
  Result as SDKResult,
  TransportError
} from "@sajari/sdk-js";
import idx from "idx";
import * as React from "react";

import { i18n } from "../../i18n";
import { Consumer } from "../context";
import { Result, ResultProps, ResultStyles } from "../Result";

import { Container, Error, ResultItem } from "./styled";

const STATUS_UNAUTHORISED = 403;

export interface ResultsProps {
  ResultRenderer?: React.ComponentType<ResultProps>;
  fields?: {
    title?: string;
    description?: string;
    url?: string;
    image?: string;
  };
  showImages?: boolean;
  styles?: {
    container?: React.CSSProperties;
    item?: React.CSSProperties;
    result?: ResultStyles;
  };
}

export interface ResultsRenderFnProps {
  error: RequestError | null;
  results?: Array<{ key: string } & ResultProps>;
}

export type ResultsRenderFn = (props: ResultsRenderFnProps) => React.ReactNode;

export interface ResultsContainerProps {
  children: ResultsRenderFn;

  fields?: {
    title?: string;
    description?: string;
    url?: string;
    image?: string;
  };
}

export const ResultsContainer: React.SFC<ResultsContainerProps> = ({
  children,
  fields
}) => {
  return (
    <Consumer>
      {({ search: { response }, resultClicked }) => {
        if (response === null || response === undefined || response.isEmpty()) {
          return null;
        }
        if (response.isError()) {
          const err = response.getError() as RequestError;
          if (err.httpStatusCode === STATUS_UNAUTHORISED) {
            err.message = i18n.t("errors:authorization");
          }
          if (err.transportErrorCode === TransportError.Connection) {
            err.message = i18n.t("errors:connection");
          } else if (err.transportErrorCode === TransportError.ParseResponse) {
            err.message = i18n.t("errors:parseResponse");
          }
          return children({ error: err });
        }

        const results =
          response !== undefined ? response.getResults() || [] : [];

        if (results.length < 1) {
          return children({ error: null, results: [] as any });
        }

        const res: Array<{ key: string } & ResultProps> = results.map(
          (result: SDKResult, index: number) => {
            const key =
              (result.values._id as string) ||
              (("" + index + result.values.url) as string);
            const token = result.token && (result.token as ClickToken).click;

            // tslint:disable:object-literal-sort-keys
            const values = {
              ...result.values,
              // @ts-ignore: idx
              title: result.values[idx(fields, _ => _.title) || "title"],
              description:
                result.values[
                  // @ts-ignore: idx
                  idx(fields, _ => _.description) || "description"
                ],
              // @ts-ignore: idx
              url: result.values[idx(fields, _ => _.url) || "url"],
              // @ts-ignore: idx
              image: result.values[idx(fields, _ => _.image) || "image"]
            };
            // tslint:enable:object-literal-sort-keys

            return {
              key,
              resultClicked,
              token,
              values,
              indexScore: result.indexScore,
              itemIndex: index,
              score: result.score
            } as { key: string } & ResultProps;
          }
        );

        return children({ error: null, results: res });
      }}
    </Consumer>
  );
};

export class Results extends React.Component<ResultsProps, {}> {
  public render() {
    const {
      ResultRenderer = Result,
      showImages,
      fields,
      styles = {}
    } = this.props;

    return (
      <ResultsContainer fields={fields}>
        {({ error, results }) => {
          if (error) {
            return <Error>{error.message}</Error>;
          }

          if (results === undefined) {
            return null;
          }

          return results.length > 0 ? (
            <Container styles={idx(styles, _ => _.container)}>
              {results.map(({ key, ...result }) => {
                return (
                  <ResultItem key={key} styles={idx(styles, _ => _.item)}>
                    <ResultRenderer
                      {...result}
                      showImage={showImages}
                      styles={idx(styles, _ => _.result)}
                    />
                  </ResultItem>
                );
              })}
            </Container>
          ) : null;
        }}
      </ResultsContainer>
    );
  }
}
