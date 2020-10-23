import React from 'react';
import { useContext } from '../SearchContextProvider';
import usePagination from '../usePagination';
import { UsePageSizeResult } from './types';

function usePageSize(): UsePageSizeResult {
  const {
    search: {
      config: { resultsPerPageParam },
      values,
    },
  } = useContext();
  const { pageSize } = usePagination('search');

  const setPageSize = React.useCallback(
    (size: number) => {
      values.set({ [resultsPerPageParam]: size });
    },
    [values],
  );

  return {
    pageSize,
    setPageSize,
  };
}

export default usePageSize;
