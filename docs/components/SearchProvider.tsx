import { Pipeline, SearchContextProvider, Values } from '@sajari/react-hooks';
import { useRef } from 'react';

const SearchProvider: React.FC = ({ children }) => {
  const ref = useRef({
    pipeline: new Pipeline(
      {
        project: '1594153711901724220',
        collection: 'bestbuy',
        endpoint: '//jsonapi-us-valkyrie.sajari.net',
      },
      'query',
    ),
    values: new Values({ q: '' }),
    fields: { category: 'brand', title: 'name' },
  });

  return <SearchContextProvider search={ref.current}>{children}</SearchContextProvider>;
};

export default SearchProvider;
