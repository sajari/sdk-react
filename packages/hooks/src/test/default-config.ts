import { FieldDictionary, Pipeline } from '@sajari/react-hooks';

import { pipeline1 } from '../ContextProvider/controllers/fixtures/Pipeline';

export const pipeline = new Pipeline(
  {
    account: pipeline1.account,
    collection: pipeline1.collection,
  },
  pipeline1.name,
);

export const fields = new FieldDictionary({
  title: 'name',
  subtitle: (data) => data.level4 || data.level3 || data.level2 || data.level1 || data.brand,
});

export const search = {
  pipeline,
  fields,
};
