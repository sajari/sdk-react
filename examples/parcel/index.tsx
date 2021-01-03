import 'react-app-polyfill/ie11';

import { Pagination } from '@sajari/react-components';
import { useSearchContext } from '@sajari/react-hooks';
import { FieldDictionary, Pipeline, SearchProvider } from '@sajari/react-search-ui';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

const SearchPlayground = () => {
  const { search, setPage, page, pageCount, resultsPerPage, totalResults, results } = useSearchContext();
  const fromItem = resultsPerPage * (page - 1) + 1;
  const toItem = results ? results?.length + fromItem - 1 : 0;

  return (
    <>
      <input
        type="text"
        onChange={(e) => {
          search(e.target.value, true);
        }}
      />

      {results ? <p>{`Showing ${fromItem} - ${toItem} out of ${totalResults} items`}</p> : null}

      {results?.map(({ values: { id, free_shipping, category, description, price, rating, title } }) => (
        <div key={id.toString()}>
          <h3>{title}</h3>
          <p>{description}</p>
          <dl>
            <dt>Category</dt>
            <dd>{category}</dd>
            <dt>Price</dt>
            <dd>{`$${price}`}</dd>
            <dt>Rating</dt>
            <dd>{rating}</dd>
            <dt>Freeship</dt>
            <dd>{free_shipping ? 'yes' : 'no'}</dd>
          </dl>
        </div>
      ))}

      <Pagination
        page={page}
        resultsPerPage={resultsPerPage}
        totalResults={totalResults}
        pageCount={pageCount}
        onChange={setPage}
      />
    </>
  );
};

const pipeline = new Pipeline(
  {
    account: '1594153711901724220',
    collection: 'bestbuy',
  },
  'query',
);

const App = () => {
  return (
    <SearchProvider
      search={{
        pipeline,
        fields: new FieldDictionary({
          title: 'name',
          subtitle: (data) => data.level4 || data.level3 || data.level2 || data.level1 || data.brand,
        }),
      }}
    >
      <SearchPlayground />
    </SearchProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
