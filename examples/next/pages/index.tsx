/* eslint-disable react/require-default-props */
/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import { SearchProvider, FieldDictionary, Pipeline, Variables, Results } from '@sajari/react-search-ui';
import { EVENT_RESPONSE_UPDATED, Response } from '@sajari/react-hooks';

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

/* class Page extends React.Component {
  static async getServerSideProps({ asPath }) {
    const searchState = pathToSearchState(asPath);
    const resultsState = await findResultsState(App, {
      ...DEFAULT_PROPS,
      searchState,
    });

    return {
      resultsState,
      searchState,
    };
  }

  onSearchStateChange = (searchState) => {
    clearTimeout(this.debouncedSetState);

    this.debouncedSetState = setTimeout(() => {
      const href = searchStateToURL(searchState);

      this.props.router.push(href, href, {
        shallow: true,
      });
    }, updateAfter);

    this.setState({ searchState });
  };

  render() {
    return (
      <SearchProvider
        search={{
          pipeline,
          fields,
        }}
      >
        <Results appearance="grid" />
      </SearchProvider>
    );
  }
} */

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

const fetchData = (): Promise<Response> =>
  new Promise((resolve) => {
    pipeline.listen(EVENT_RESPONSE_UPDATED, (response: Response) => {
      resolve(response);
    });

    // Fetch data from external API
    pipeline.search(variables.get());
  });

// This gets called on every request
export async function getServerSideProps() {
  const response = await fetchData();

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
