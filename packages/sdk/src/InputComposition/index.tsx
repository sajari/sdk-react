import * as React from 'react';
import { Input } from '@sajari/react-components';
import { useQuery } from '@sajari/react-hooks';

const InputComposition = () => {
  const { query, setQuery } = useQuery();

  return (
    <>
      <Input value={query} onChange={setQuery} />
      <div>
        Value:
        {query}
      </div>
    </>
  );
};

export default InputComposition;
