/* eslint-disable @typescript-eslint/no-explicit-any */
import { isNullOrUndefined } from '@sajari/react-sdk-utils';

import { useContext } from '../ContextProvider';
import usePagination from '../usePagination';
import mapToObject from '../utils/mapToObject';

function useSearchContext() {
  const {
    search: { config, response, search, searching, fields = {} },
    viewType,
    setViewType,
  } = useContext();
  const { page, resultsPerPage, totalResults, pageCount, setPage } = usePagination('search');
  const mapResponse = mapToObject(response?.getResponse() as Map<string, any> | undefined);
  const results = response?.getResults();

  return {
    empty: response?.isEmpty() ?? false,
    error: response?.getError(),
    queryValues: response?.getQueryValues(),
    latency: response?.getTime(),
    page,
    resultsPerPage,
    totalResults,
    pageCount,
    setPage,
    search,
    results,
    response: mapResponse,
    searching,
    searched: !isNullOrUndefined(results),
    viewType,
    setViewType,
    fields,
    config,
  };
}

export default useSearchContext;
