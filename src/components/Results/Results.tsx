import { RequestError, Result as SDKResult, Token, TransportError } from '@sajari/sdk-js';
import * as React from 'react';

import { i18n } from '../../i18n';
import { Consumer } from '../context';
import { Result, ResultProps, ResultStyles } from '../Result';

import { CSSObject } from '@emotion/core';
import { Container, Error, ResultItem } from './styled';

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
    container?: CSSObject;
    item?: CSSObject;
    result?: ResultStyles;
  };
}

export interface ResultsContainerProps {
  children: ResultsRenderFn;

  fields?: {
    title?: string;
    description?: string;
    url?: string;
    image?: string;
  };
}

export type ResultsRenderFn = (props: ResultsRenderFnProps) => React.ReactNode;

export interface ResultsRenderFnProps {
  error: RequestError | null;
  results?: Array<{ key: string } & ResultProps>;
}

export const ResultsContainer: React.SFC<ResultsContainerProps> = ({ children, fields }) => {
  return (
    <Consumer>
      {({ search: { response }, resultClicked }) => {
        if (response === null || response === undefined || response.isEmpty()) {
          return null;
        }
        if (response.isError()) {
          const err = response.getError() as RequestError;
          if (err.httpStatusCode === STATUS_UNAUTHORISED) {
            err.message = i18n.t('errors:authorization');
          }
          if (err.transportErrorCode === TransportError.Connection) {
            err.message = i18n.t('errors:connection');
          } else if (err.transportErrorCode === TransportError.ParseResponse) {
            err.message = i18n.t('errors:parseResponse');
          }
          return children({ error: err });
        }

        const results = response !== undefined ? response.getResults() || [] : [];

        if (results.length < 1) {
          return children({ error: null, results: [] as any });
        }

        const res: Array<{ key: string } & ResultProps> = results.map((result: SDKResult, index: number) => {
          const key = (result.values._id as string) || (('' + index + result.values.url) as string);

          let token: Token | undefined = result.token;
          if (Object.getOwnPropertyNames(token).length === 0) {
            token = undefined;
          }

          // tslint:disable:object-literal-sort-keys
          const values = {
            ...result.values,
            title: result.values[fields?.title ?? 'title'],
            description: result.values[fields?.description ?? 'description'],
            url: result.values[fields?.url ?? 'url'],
            image: result.values[fields?.image ?? 'image'],
          };
          // tslint:enable:object-literal-sort-keys

          return {
            key,
            resultClicked,
            token,
            values,
            indexScore: result.indexScore,
            score: result.score,
          } as { key: string } & ResultProps;
        });

        return children({ error: null, results: res });
      }}
    </Consumer>
  );
};

export class Results extends React.Component<ResultsProps, {}> {
  public render() {
    const { ResultRenderer = Result, showImages, fields, styles = {} } = this.props;

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
            <Container styles={styles?.container}>
              {results.map(({ key, ...result }) => {
                return (
                  <ResultItem key={key} styles={styles?.item}>
                    <ResultRenderer {...result} showImage={showImages} styles={styles?.result} />
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
