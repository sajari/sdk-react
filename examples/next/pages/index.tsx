/* eslint-disable react/require-default-props */
/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import { SearchProvider, FieldDictionary, Pipeline, Variables, Results } from '@sajari/react-search-ui';
import { Response } from '@sajari/react-hooks';
import { findResultsState } from '@sajari/server';

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
  const response = (await findResultsState({
    search: {
      pipeline,
      variables,
      fields,
    },
  })) as Response;

  // Pass data to the page via props
  return {
    props: {
      initialResponse: JSON.stringify({
        queryValues: Object.fromEntries(response.getQueryValues()),
        response: Object.fromEntries(response.getResponse()),
        values: Object.fromEntries(response.getValues()),
      }),
    },
  };
}

const Page = (props: Props) => {
  const { initialResponse } = props;
  const { queryValues, response, values } = JSON.parse(initialResponse);

  return (
    <SearchProvider
      search={{
        pipeline,
        fields,
        variables,
      }}
      // @ts-ignore
      initialResponse={new Response(null, queryValues, response, values)}
    >
      <Results appearance="grid" />
    </SearchProvider>
  );
};

export default Page;
