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
  initialResponse: {
    queryValues: Map<string, string>;
    response: Map<string, string>;
    values: Map<string, string>;
  };
}

const Page = (props: Props) => {
  const { initialResponse } = props;
  const { queryValues, response, values } = initialResponse;

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
      {/* <Results appearance="grid" /> */}
    </SearchProvider>
  );
};

// This gets called on every request
export async function getServerSideProps() {
  const response = await findResultsState({
    search: {
      pipeline,
      variables,
      fields,
    },
  });

  // Pass data to the page via props
  return {
    props: {
      initialResponse: JSON.stringify({
        queryValues: response.getQueryValues(),
        response: response.getResponse(),
        values: response.getValues(),
      }),
    },
  };
}

export default Page;
