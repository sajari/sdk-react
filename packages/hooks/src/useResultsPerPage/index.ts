import { isNumber } from '@sajari/react-sdk-utils';
import * as React from 'react';

import { useContext } from '../ContextProvider/context';
import { UseResultsPerPageResult } from './types';

function useResultsPerPage(): UseResultsPerPageResult {
  const {
    search: {
      search,
      config: { resultsPerPageParam },
      variables,
      defaultResultsPerPage,
    },
  } = useContext();

  const setResultsPerPage = React.useCallback(
    (size: number) => {
      variables.set({ [resultsPerPageParam]: size });
      search();
    },
    [variables, search],
  );

  const resultsPerPage = parseInt(variables.get()[resultsPerPageParam], 10);

  return {
    resultsPerPage: isNumber(resultsPerPage) ? resultsPerPage : defaultResultsPerPage,
    defaultResultsPerPage,
    setResultsPerPage,
  };
}

export default useResultsPerPage;
export * from './types';
