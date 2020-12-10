import React from 'react';
import {
  SearchProvider,
  FieldDictionary,
  Pipeline,
  Variables,
  Results,
  Input,
  SSRProvider,
  Pagination,
} from '@sajari/react-search-ui';
import { search } from '@sajari/server';
import { useSearchContext } from '@sajari/react-hooks';

const pipeline = new Pipeline(
  {
    account: '1594153711901724220',
    collection: 'bestbuy',
    endpoint: 'https://jsonapi-us-valkyrie.sajari.net',
    // Key and secret must be populated with details from the credentials page in the Sajari console
    key: '',
    secret: '',
  },
  'query',
);

const fields = new FieldDictionary({
  title: 'name',
  subtitle: (data) => data.level4 || data.level3 || data.level2 || data.level1 || data.brand,
});

const variables = new Variables({
  resultsPerPage: 10,
  q: 'iphone',
});

interface Props {
  initialResponse: string;
}

// This gets called on every request
export async function getServerSideProps() {
  const initialResponse = await search({
    search: {
      pipeline,
      variables,
      fields,
    },
  });

  // If we couldn't get an initial response server side, render client side
  if (initialResponse === null) {
    return {
      props: {
        notFound: true,
      },
    };
  }

  // Pass data to the page via props
  return {
    props: {
      initialResponse,
    },
  };
}

const RawResults = () => {
  const { results } = useSearchContext();

  return (
    <details>
      <summary>Raw Results</summary>
      <pre>{JSON.stringify(results, null, 2)}</pre>
    </details>
  );
};

const Page = ({ initialResponse }: Props) => (
  <SearchProvider
    search={{
      pipeline,
      fields,
      variables,
    }}
    initialResponse={initialResponse}
    searchOnLoad={!initialResponse}
  >
    <SSRProvider>
      <Input />
      <Results appearance="grid" style={{ margin: '3rem 0' }} />
      <RawResults />
      <Pagination />
    </SSRProvider>
  </SearchProvider>
);

export default Page;
