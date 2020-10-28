import React from 'react';

import { useContext } from '../SearchContextProvider';
import { UsePageSizeResult } from './types';

function usePageSize(): UsePageSizeResult {
  const {
    search: {
      config: { resultsPerPageParam },
      values,
    },
  } = useContext();

  const setPageSize = React.useCallback(
    (size: number) => {
      values.set({ [resultsPerPageParam]: size });
    },
    [values],
  );

  const pageSize = parseInt(values.get()[resultsPerPageParam], 10);

  return {
    pageSize: Number.isNaN(pageSize) ? 10 : pageSize,
    setPageSize,
  };
}

export default usePageSize;
