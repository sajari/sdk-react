import * as React from 'react';
import { useQuery } from '@sajari/react-hooks';

const SearchInputComposition = () => {
  const { query, setQuery } = useQuery();

  return (
    <>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <div>
        Value:
        {query}
      </div>
    </>
  );
};

export default SearchInputComposition;
