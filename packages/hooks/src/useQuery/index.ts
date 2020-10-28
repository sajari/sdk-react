import { useCallback } from 'react';

import { useContext } from '../SearchContextProvider';

function useQuery() {
  const {
    search: { values, query },
  } = useContext();

  const setQuery = useCallback((q: string) => {
    values.set({ q });
  }, []);

  return { query, setQuery };
}

export default useQuery;
