import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ContextProvider } from '@sajari/react-search-ui';
import { SearchContextProvider, Pipeline, Values, useSearchContext, FieldDictionary } from '@sajari/react-hooks';
import { Pagination } from '@sajari/react-components';

const SearchPlayground = () => {
  const { search, setPage, page, pageCount, pageSize, totalResults, results } = useSearchContext<{
    id: string;
    free_shipping: string;
  }>();

  const fromItem = pageSize * (page - 1) + 1;
  const toItem = results?.length + fromItem - 1;

  return (
    <>
      <input
        type="text"
        onChange={(e) => {
          search(e.target.value, true);
        }}
      />
      {results ? (
        <p>
          Showing <b>{fromItem}</b> - <b>{toItem}</b> out of <b>{totalResults}</b> items
        </p>
      ) : null}
      {results?.map(({ values: { id, free_shipping, category, description, price, rating, title } }) => (
        <div key={id}>
          <h3>{title}</h3>
          <p>{description}</p>
          <ul>
            <li>
              <b>Category</b>: {category}
            </li>
            <li>
              <b>Price</b>: ${price}
            </li>
            <li>
              <b>Rating</b>: {rating}
            </li>
            <li>
              <b>Freeship</b>: {free_shipping ? 'yes' : 'no'}
            </li>
          </ul>
        </div>
      ))}
      <Pagination
        page={page}
        pageSize={pageSize}
        totalResults={totalResults}
        pageCount={pageCount}
        onChange={setPage}
      />
    </>
  );
};

const pipeline = new Pipeline(
  {
    project: '1594153711901724220',
    collection: 'bestbuy',
    endpoint: 'https://jsonapi-us-valkyrie.sajari.net',
  },
  'query',
);

const values = new Values({ q: '' });

const App = () => {
  return (
    <SearchContextProvider
      search={{ pipeline, values, fields: new FieldDictionary({ category: 'brand', title: 'name' }) }}
    >
      <ContextProvider>
        <SearchPlayground />
      </ContextProvider>
    </SearchContextProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
