import { Pipeline, SearchContextProvider, Values, SearchProviderValues, FieldDictionary } from '@sajari/react-hooks';
import { useRef } from 'react';

const SearchProvider: React.FC = ({ children }) => {
  const ref = useRef<SearchProviderValues['search']>({
    pipeline: new Pipeline(
      {
        project: '1594153711901724220',
        collection: 'bestbuy',
        endpoint: 'https://jsonapi-us-valkyrie.sajari.net',
      },
      'query',
    ),
    values: new Values({ q: '' }),
    fields: new FieldDictionary({ category: 'brand', title: 'name' }),
  });

  return <SearchContextProvider search={ref.current}>{children}</SearchContextProvider>;
};

export default SearchProvider;
