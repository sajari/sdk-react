/* eslint-disable react/require-default-props */
/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import { SearchProvider, FieldDictionary, Pipeline, Variables, Results, Input } from '@sajari/react-search-ui';
import { getResponse } from '@sajari/server';

const pipeline = new Pipeline(
  {
    account: '1594153711901724220',
    collection: 'bestbuy',
    endpoint: 'https://jsonapi-us-valkyrie.sajari.net',
  },
  'query',
);

const fields = new FieldDictionary({
  title: 'name',
  subtitle: (data) => data.level4 || data.level3 || data.level2 || data.level1 || data.brand,
});

const variables = new Variables({
  resultsPerPage: 6,
  q: 'iphone',
});

interface Props {
  initialResponse: string;
}

// This gets called on every request
export async function getServerSideProps() {
  const initialResponse = await getResponse({
    search: {
      pipeline,
      variables,
      fields,
    },
  });

  // Pass data to the page via props
  return {
    props: {
      initialResponse,
    },
  };
}

const Page = ({ initialResponse }: Props) => (
  <SearchProvider
    search={{
      pipeline,
      fields,
      variables,
    }}
    initialResponse={initialResponse}
  >
    <Input />
    <Results appearance="grid" />
  </SearchProvider>
);

export default Page;
