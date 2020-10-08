import * as React from 'react';

import { Consumer } from '../context';
import { PaginateFn } from '../context/pipeline/context';

export interface PaginatorContainerProps {
  children?: PaginatorContainerRenderFn;
}

export interface PaginatorContainerRenderFnArgs {
  page: number;
  resultsPerPage: number;
  totalResults: number;
  totalPages: number;
  paginate: PaginateFn;
}

export type PaginatorContainerRenderFn = (args: PaginatorContainerRenderFnArgs) => React.ReactNode;

export function PaginatorContainer(props: PaginatorContainerProps) {
  return (
    <Consumer>
      {({ search: { response, config }, paginate }) => {
        if (response === null || response === undefined || response.isEmpty() || response.isError()) {
          return null;
        }

        const queryValues = response.getQueryValues();
        if (queryValues === undefined) {
          return;
        }

        const page = queryValues.get(config.pageParam) ? parseInt(queryValues.get(config.pageParam) as string, 10) : 1;
        const resultsPerPage = queryValues.get(config.resultsPerPageParam)
          ? parseInt(queryValues.get(config.resultsPerPageParam) as string, 10)
          : 10;
        const totalResults = response.getTotalResults();
        if (totalResults === undefined) {
          return;
        }

        if (totalResults <= resultsPerPage) {
          return null;
        }

        const totalPages = Math.ceil(totalResults / resultsPerPage);
        if (totalPages === 0) {
          return null;
        }

        if (props.children == null) {
          return null;
        }

        return props.children({
          page,
          resultsPerPage,
          totalResults,
          totalPages,
          paginate,
        });
      }}
    </Consumer>
  );
}
