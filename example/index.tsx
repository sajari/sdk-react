import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ContextProvider } from '@sajari/react-search-ui';
import { SearchContextProvider, Pipeline, Values, useSearchContext } from '@sajari/react-hooks';

const SearchPlayground = () => {
  const { search, results } = useSearchContext<{ id: string; free_shipping: string }>();

  return (
    <>
      <input
        type="text"
        onChange={(e) => {
          search(e.target.value, true);
        }}
      />
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
    </>
  );
};

const pipeline = new Pipeline(
  {
    project: '1594153711901724220',
    collection: 'bestbuy',
    endpoint: '//jsonapi-us-valkyrie.sajari.net',
  },
  'query',
);

const values = new Values({ q: '' });

const App = () => {
  return (
    <SearchContextProvider search={{ pipeline, values, fields: { category: 'brand', title: 'name' } }}>
      <ContextProvider>
        <SearchPlayground />
      </ContextProvider>
    </SearchContextProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
