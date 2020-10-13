import { useState } from 'react';

export default function useQuery() {
  const [query, setQuery] = useState('');

  return { query, setQuery };
}
