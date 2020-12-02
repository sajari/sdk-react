import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { SearchProvider, FieldDictionary, Pipeline, Variables } from '@sajari/react-search-ui';
import { useSearchContext } from '@sajari/react-hooks';
import { Pagination } from '@sajari/react-components';

const SearchPlayground = () => {
  const { search, setPage, page, pageCount, resultsPerPage, totalResults, results } = useSearchContext<{
    id: string;
    free_shipping: string;
  }>();

  const fromItem = resultsPerPage * (page - 1) + 1;
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
    endpoint: 'https://jsonapi-us-valkyrie.sajari.net',
  },
  'query',
);

const App = () => {
  return (
    <SearchProvider search={{ pipeline, fields: new FieldDictionary({ title: 'name', subtitle: 'brand' }) }}>
      <SearchPlayground />
    </SearchProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
