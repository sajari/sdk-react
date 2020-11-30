import { isNullOrUndefined } from '@sajari/react-sdk-utils';

import { useContext } from '../SearchContextProvider';
import usePagination from '../usePagination';
import mapToObject from '../utils/mapToObject';

function useSearchContext() {
  const {
    search: { response, search, searching, fields = {} },
    viewType,
    setViewType,
  } = useContext();
  const { page, pageSize, totalResults, pageCount, setPage } = usePagination('search');
  const mapResponse = mapToObject(response?.getResponse() as Map<string, any> | undefined);
  const results = response?.getResults();

  return {
    error: response?.getError(),
    queryValues: response?.getQueryValues(),
    latency: response?.getTime(),
    page,
    pageSize,
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
  };
}

export default useSearchContext;
