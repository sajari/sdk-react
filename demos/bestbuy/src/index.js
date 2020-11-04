import "./app.css"
import App from './app';
import { ContextProvider } from "@sajari/react-search-ui";
import { Pipeline, Values } from "@sajari/react-hooks";

const pipeline = new Pipeline(
  {
    project: '1594153711901724220',
    collection: 'bestbuy',
    endpoint: 'https://jsonapi-us-valkyrie.sajari.net',
  },
  'query',
);

const values = new Values({ q: '' });

export default () => (
  <ContextProvider search={{ pipeline, values, fields: { category: 'brand', title: 'name' } }}>
    <App />
  </ContextProvider>
)
