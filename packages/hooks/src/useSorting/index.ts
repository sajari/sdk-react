import { useCallback } from 'react';

import { useContext } from '../SearchContextProvider';
import { UseSortingResult } from './types';

function useSorting(): UseSortingResult {
  const {
    search: { values },
  } = useContext();

  const setSorting = useCallback((order: string) => values.set({ sort: order }), [values]);

  return {
    sorting: values.get().sort ?? '',
    setSorting,
  };
}

export default useSorting;
