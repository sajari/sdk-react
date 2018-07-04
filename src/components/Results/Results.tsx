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

export class Results extends React.Component<ResultsProps, {}> {
  public render() {
    const {
      ResultRenderer = Result,
      showImages,
      fields,
      styles = {}
    } = this.props;

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
              return <Error>{i18n.t("errors:authorization")}</Error>;
            }
            if (error.transportErrorCode === TransportError.Connection) {
              return <Error>{i18n.t("errors:connection")}</Error>;
            } else if (
              error.transportErrorCode === TransportError.ParseResponse
            ) {
              return <Error>{i18n.t("errors:parseResponse")}</Error>;
            }
            return <Error>{error.message}</Error>;
          }

          const results =
            response !== undefined ? response.getResults() || [] : [];

          return results.length > 0 ? (
            <Container styles={idx(styles, _ => _.container)}>
              {results.map((result: SDKResult, index: number) => {
                const key =
                  (result.values._id as string) ||
                  (("" + index + result.values.url) as string);
                const token =
                  result.token && (result.token as ClickToken).click;

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

                return (
                  <ResultItem key={key} styles={idx(styles, _ => _.item)}>
                    <ResultRenderer
                      token={token}
                      itemIndex={index}
                      values={values}
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
