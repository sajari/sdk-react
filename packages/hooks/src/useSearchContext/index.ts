import { useContext } from '../SearchContextProvider';
import mapResultFields from '../utils/mapResultFields';
import mapToObject from '../utils/mapToObject';

function useSearchContext<T = Record<string, string | string[]>>() {
  const {
    paginate,
    search: { response, config, search, fields = {} },
  } = useContext();

  const queryValues = response?.getQueryValues();
  const page = queryValues?.get(config.pageParam) ? parseInt(queryValues.get(config.pageParam) as string, 10) : 1;
  const resultsPerPage = queryValues?.get(config.resultsPerPageParam)
    ? parseInt(queryValues?.get(config.resultsPerPageParam) as string, 10)
    : 10;
  const totalResults = response?.getTotalResults() || 0;
  const totalPages = Math.ceil(totalResults / resultsPerPage);
  const mapResponse = mapToObject(response?.getResponse() as Map<string, any> | undefined);
  const reqResults = response?.getResults();

  return {
    page,
    resultsPerPage,
    totalResults,
    totalPages,
    paginate,
    search,
    results: reqResults ? mapResultFields<T>(reqResults, fields) : undefined,
    response: mapResponse,
  };
}

export default useSearchContext;
