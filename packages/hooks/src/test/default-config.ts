import { FieldDictionary, Pipeline } from '@sajari/react-hooks';

export const pipeline = new Pipeline(
  {
    account: '1594153711901724220',
    collection: 'bestbuy',
  },
  'query',
);

export const fields = new FieldDictionary({
  title: 'name',
  subtitle: (data) => data.level4 || data.level3 || data.level2 || data.level1 || data.brand,
});

export const search = {
  pipeline,
  fields,
};
