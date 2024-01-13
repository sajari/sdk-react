import { FilterBuilder, NoTracking, Pipeline, SearchProvider } from '@sajari/react-hooks';
import renderer from 'react-test-renderer';

import { Provider as SearchUIContextProvider } from '../../ContextProvider';
import { SearchUIContextProviderValues } from '../../ContextProvider/types';
import ListFilter from '../ListFilter';

const defaultSearchUIProviderValues: Required<SearchUIContextProviderValues> = {
  tracking: new NoTracking(),
  disableDefaultStyles: false,
  currency: 'USD',
  customClassNames: {},
  ratingMax: 0,
  viewType: 'grid',
  setViewType: () => {},
  downshiftEnvironment: null,
};

const defaultSearchProviderValues = {
  pipeline: new Pipeline(
    {
      account: 'test-account',
      collection: 'test-collection',
    },
    'test-pipeline',
  ),
};

describe('ListFilter rendering', () => {
  it('standard render', () => {
    const priceFilter = new FilterBuilder({
      name: 'price',
      options: {
        High: 'price >= 200',
        Mid: 'price >= 50',
        Low: 'price < 50',
      },
      multi: false,
      initial: ['High'],
    });
    const tree = renderer
      .create(
        <SearchUIContextProvider value={defaultSearchUIProviderValues}>
          <SearchProvider
            search={{
              ...defaultSearchProviderValues,
              filters: [priceFilter],
            }}
            initialResponse={}
          >
            <ListFilter name="price" title="Price Filter" />
          </SearchProvider>
        </SearchUIContextProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
