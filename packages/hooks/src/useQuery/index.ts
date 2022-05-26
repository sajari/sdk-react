import * as React from 'react';

import { useContext } from '../ContextProvider/context';

function useQuery() {
  const {
    search: { search, variables, query, config },
  } = useContext();

  const setQuery = React.useCallback(
    (q: string) => {
      variables.set({ [config.qParam]: q });
      search(q);
    },
    [search, variables],
  );

  return { query, setQuery };
}

export default useQuery;
