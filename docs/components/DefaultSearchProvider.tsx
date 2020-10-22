import { Pipeline, SearchContextProvider, Values } from '@sajari/react-hooks';

const pipeline = new Pipeline(
  {
    project: '1594153711901724220',
    collection: 'bestbuy',
    endpoint: '//jsonapi-us-valkyrie.sajari.net',
  },
  'query',
);

const values = new Values({ q: '' });

const fields = { category: 'brand', title: 'name' };

const DefaultSearchProvider: React.FC = ({ children }) => {
  return <SearchContextProvider search={{ fields, values, pipeline }}>{children}</SearchContextProvider>;
};

export default DefaultSearchProvider;
