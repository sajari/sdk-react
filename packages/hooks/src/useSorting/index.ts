import { useCallback } from 'react';

import { useContext } from '../SearchContextProvider';
import { UseSortingResult } from './types';

function useSorting(): UseSortingResult {
  const {
    search: { search, variables },
  } = useContext();

  const setSorting = useCallback(
    (order: string) => {
      variables.set({ sort: order });
      search();
    },
    [variables],
  );

  return {
    sorting: variables.get().sort ?? '',
    setSorting,
  };
}

export default useSorting;
