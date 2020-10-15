import { useQuery } from '@sajari/react-hooks';
import * as React from 'react';

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
