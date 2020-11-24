import { Pipeline, Variables, SearchProviderValues, FieldDictionary } from '@sajari/react-hooks';
import { ContextProvider } from '@sajari/react-search-ui';
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
    variables: new Variables(),
    fields: new FieldDictionary({
      category: (data) => data.level4 || data.level3 || data.level2 || data.level1,
      title: 'name',
    }),
  });

  return <ContextProvider search={ref.current}>{children}</ContextProvider>;
};

export default SearchProvider;
