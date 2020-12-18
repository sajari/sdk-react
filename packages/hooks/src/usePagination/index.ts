import { useCallback, useMemo } from 'react';

import { useContext } from '../ContextProvider';
import { UsePaginationResult } from './types';

function usePagination(key: 'search' | 'autocomplete' = 'search'): UsePaginationResult {
  const context = useContext();
  const { paginate } = context;
  const { response, config } = context[key];
  const queryValues = response?.getQueryValues();
  const page = queryValues?.get(config.pageParam) ? parseInt(queryValues.get(config.pageParam) as string, 10) : 1;
  const resultsPerPage = queryValues?.get(config.resultsPerPageParam)
    ? parseInt(queryValues?.get(config.resultsPerPageParam) as string, 10)
    : 15;
  const totalResults = response?.getTotalResults() || 0;
  const totalPages = Math.ceil(totalResults / resultsPerPage);
  const hasNext = useMemo(() => page < totalPages, [page, totalPages]);
  const hasPrevious = useMemo(() => page > 1, [page]);
  const nextPage = useCallback(() => hasNext && paginate(page + 1), [paginate, hasNext]);
  const previousPage = useCallback(() => hasPrevious && paginate(page - 1), [paginate, hasPrevious]);

  return {
    page,
    pageCount: totalPages,
    totalResults,
    setPage: paginate,
    resultsPerPage,
    hasNext,
    hasPrevious,
    nextPage,
    previousPage,
  };
}

export default usePagination;
export * from './types';
