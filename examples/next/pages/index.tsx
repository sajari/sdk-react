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
import { GetStaticProps } from 'next';
import * as React from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const stringify = (value: any) => JSON.stringify(value, null, 2);

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
  filter: 'brand = "Apple"',
});

const priceRangeFilter = new FilterBuilder({
  name: 'price-range',
  field: 'price_range',
});

interface Props {
  initialResponse: string;
}

const RawResults = () => {
  const { results } = useSearchContext();
  const { options } = useFilter('price-range');

  console.log(stringify(options));

  return (
    <details>
      <summary>Raw Results</summary>
      <pre>{stringify(results)}</pre>
    </details>
  );
};

const Page = ({ initialResponse }: Props) => (
  <SearchProvider
    search={{
      pipeline,
      fields,
      variables,
      filters: [priceRangeFilter],
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

export const getStaticProps: GetStaticProps<Props> = async () => {
  const initialResponse = await search({
    pipeline,
    variables,
    fields,
    filters: [priceRangeFilter],
  });

  // If we couldn't get an initial response server side, render client side
  if (initialResponse === null) {
    return {
      notFound: true,
    };
  }

  // Pass data to the page via props
  return {
    props: {
      initialResponse,
    },
  };
};

export default Page;
