import { useCallback } from 'react';

import { useContext } from '../ContextProvider';
import { UseSortingResult } from './types';

function useSorting(): UseSortingResult {
  const {
    search: { search, variables },
  } = useContext();

  const setSorting = useCallback(
    (order: string, runSearch = true) => {
      variables.set({ sort: order });
      if (runSearch) {
        search();
      }
    },
    [variables, search],
  );

  return {
    sorting: variables.get().sort ?? '',
    setSorting,
  };
}

export default useSorting;
export * from './types';
