/** @jsx h */
import './app.css';
import App from './app';
import { SearchProvider } from '@sajari/react-search-ui';
import { Pipeline, FilterBuilder } from '@sajari/react-hooks';
import { h } from 'preact';

const pipeline = new Pipeline(
  {
    account: '1594153711901724220',
    collection: 'bestbuy',
    endpoint: 'https://jsonapi-us-valkyrie.sajari.net',
  },
  'query',
);

const categoryFilter = new FilterBuilder({
  name: 'category',
  field: 'level1',
});

const brandFilter = new FilterBuilder({
  name: 'brand',
  field: 'brand',
});

const ratingFilter = new FilterBuilder({
  name: 'rating',
  field: 'rating',
});

const colorFilter = new FilterBuilder({
  name: 'color',
  field: 'imageTags',
  array: true,
});

const priceFilter = new FilterBuilder({
  name: 'price',
  field: 'price_range',
});

const priceBucketFilter = new FilterBuilder({
  name: 'price_bucket',
  options: {
    'High (Over $200)': 'price >= 200',
    'Mid ($50 - $200)': 'price >= 50',
    'Low (Under $50)': 'price < 50',
  },
  count: false,
});

export default () => (
  <SearchProvider
    search={{
      pipeline,
      // @ts-ignore
      fields: { category: (data) => data.level4 || data.level3 || data.level2 || data.level1, title: 'name' },
      filters: [categoryFilter, brandFilter, priceFilter, colorFilter, ratingFilter, priceBucketFilter],
    }}
  >
    <App />
  </SearchProvider>
);
