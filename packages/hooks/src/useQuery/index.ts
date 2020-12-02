import { useCallback } from 'react';

import { useContext } from '../ContextProvider';

function useQuery() {
  const {
    search: { search, variables, query },
  } = useContext();

  const setQuery = useCallback(
    (q: string) => {
      variables.set({ q });
      search(q);
    },
    [search, variables],
  );

  return { query, setQuery };
}

export default useQuery;
