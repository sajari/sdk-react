import { useFilter, useSearchContext } from '@sajari/react-hooks';
import {
  FieldDictionary,
  FilterBuilder,
  Input,
  Pagination,
  Pipeline,
  Results,
  SearchProvider,
  SSRProvider,
  Variables,
} from '@sajari/react-search-ui';
import { search } from '@sajari/server';
import * as React from 'react';

const pipelineConfig = {
  account: '1594153711901724220',
  collection: 'bestbuy',
};

let pipeline = new Pipeline(pipelineConfig, 'query');

// Next.js will remove this in client-side builds
if (typeof window === 'undefined') {
  pipeline = new Pipeline(
    {
      ...pipelineConfig,
      key: '...',
      secret: '...',
    },
    'query',
  );
}

const fields = new FieldDictionary({
  title: 'name',
  subtitle: (data) => data.level4 || data.level3 || data.level2 || data.level1 || data.brand,
});

const variables = new Variables({
  resultsPerPage: 10,
  q: 'iphone',
  filter: 'price_range="1 - 50"',
});

const colorFilter = new FilterBuilder({
  name: 'color',
  field: 'imageTags',
  array: true,
  initial: ['Blue'],
});

interface Props {
  initialResponse: string;
}

// This gets called on every request
export async function getServerSideProps() {
  const initialResponse = await search({
    pipeline,
    variables,
    fields,
    filters: [colorFilter],
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
  const { options, selected } = useFilter('color');
  console.log({ options, selected });

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
      filters: [colorFilter],
    }}
    initialResponse={initialResponse}
    searchOnLoad={!initialResponse}
  >
    <SSRProvider>
      <Input />
      <Results appearance="grid" styles={{ margin: '3rem 0' }} />
      <RawResults />
      <Pagination />
    </SSRProvider>
  </SearchProvider>
);

export default Page;
