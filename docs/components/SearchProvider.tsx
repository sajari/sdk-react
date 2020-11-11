import { Pipeline, SearchContextProvider, Variables, SearchProviderValues, FieldDictionary } from '@sajari/react-hooks';
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
    variables: new Variables({ q: '' }),
    fields: new FieldDictionary({
      category: (data) => data.level4 || data.level3 || data.level2 || data.level1,
      title: 'name',
    }),
  });

  return <SearchContextProvider search={ref.current}>{children}</SearchContextProvider>;
};

export default SearchProvider;
