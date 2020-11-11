import { useCallback } from 'react';

import { useContext } from '../SearchContextProvider';

function useQuery() {
  const {
    search: { variables, query },
  } = useContext();

  const setQuery = useCallback((q: string) => {
    variables.set({ q });
  }, []);

  return { query, setQuery };
}

export default useQuery;
