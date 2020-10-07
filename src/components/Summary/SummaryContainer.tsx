import * as React from 'react';

import { i18n } from '../../i18n';
import { Consumer } from '../context';
import { SearchFn } from '../context/pipeline/context';
import { formatQueryTime } from './utils';

export interface SummaryContext {
  query: string;
  responseQuery: string;
  pageNumber: number;
  totalResults: string;
  responseTime: string;
  search: SearchFn;
}

export interface SummaryProps {
  children: (ctx: SummaryContext) => React.ReactNode;
}

export function SummaryContainer(props: SummaryProps) {
  return (
    <Consumer>
      {({ search: { response, query, config, search } }) => {
        if (response === null || response === undefined || response.isEmpty() || response.isError()) {
          return null;
        }
        const responseValues = response.getValues() as Map<string, string>;
        const queryValues = response.getQueryValues() as Map<string, string>;

        const text = responseValues.get(config.qParam) || query;
        const page = parseInt(queryValues.get(config.pageParam) as string, 10);

        const pageNumber = page && page > 1 ? i18n.t('summary:page', { replace: { pageNumber: page } }) : '';
        const totalResults = (response.getTotalResults() as number).toLocaleString();
        const responseTime = formatQueryTime(response.getTime() as number);
        const responseQuery = responseValues.get(config.qParam) as string;

        if (typeof props.children !== 'function') {
          return null;
        }

        return props.children({
          query: text,
          responseQuery,
          pageNumber,
          totalResults,
          responseTime,
          search,
        });
      }}
    </Consumer>
  );
}
