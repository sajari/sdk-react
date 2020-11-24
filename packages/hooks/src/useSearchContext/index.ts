import { useContext } from '../SearchContextProvider';
import usePagination from '../usePagination';
import mapResultFields from '../utils/mapResultFields';
import mapToObject from '../utils/mapToObject';

function useSearchContext<T = Record<string, string | string[]>>() {
  const {
    search: { response, search, fields = {}, searching },
    viewType,
    setViewType,
  } = useContext();
  const { page, pageSize, totalResults, pageCount, setPage } = usePagination('search');
  const mapResponse = mapToObject(response?.getResponse() as Map<string, any> | undefined);
  const reqResults = response?.getResults();

  return {
    queryValues: response?.getQueryValues(),
    latency: response?.getTime(),
    page,
    pageSize,
    totalResults,
    pageCount,
    setPage,
    search,
    results: reqResults ? mapResultFields<T>(reqResults, fields) : undefined,
    response: mapResponse,
    searching,
    viewType,
    setViewType,
  };
}

export default useSearchContext;
