# Sajari React SDK

React provides a simple and elegant way to structure your applications view. The Sajari React SDK provides a way to seemlessly integrate Sajari search and recommendations into your existing react app through the use of components.

If you're looking for the regular javascript library, see [here](https://github.com/sajari/sajari-sdk-js/).

 [Api Components](#api-components)
 * [Body](#body)
 * [Page](#page)
 * [ResultsPerPage](#resultsperpage)
 * [Fields](#fields)
 * [RegisterNamespace](#registernamespace)
 * [ResultInjector](#resultinjector)
 * [Filter](#filter)
 
[UI Components](#ui-components)

## Api Components

### Body

The Body component adds a text body to a search query. It can also take a weighting.

| Prop | Type | Required | Default | Description |
| :-- | :-: | :-: | :-:  | :-- |
| body | string | Yes | `''` | The text to search for |
| weight | number | No | `1` | The weighting to give the body in the query |

```javascript
<Body body="red computer parts" weight={1} />
```

### Page

The Page components sets which page of the search results to use.

| Prop | Type | Required | Default | Description |
| :-- | :-: | :-: | :-:  | :-- |
| page | number | Yes | `1` | The page of results to fetch |

```javascript
<Page page={5} />
```

### ResultsPerPage

The number of results to return per page.

| Prop | Type | Required | Default | Description |
| :-- | :-: | :-: | :-:  | :-- |
| results | number | Yes | `10` | The number of results to return per page |

```javascript
<ResultsPerPage results={20} />
```

### Fields

The fields of the document to fetch. Restricting this to only the fields you are using will speed up query and transmission time.

| Prop | Type | Required | Default | Description |
| :-- | :-: | :-: | :-:  | :-- |
| fields | string array | Yes | none | The fields to return for each result |

```javascript
<Fields fields={['_id', 'url', 'description']} />
```

### RegisterNamespace

Registeres your project and collection with a namespace.

| Prop | Type | Required | Default | Description |
| :-- | :-: | :-: | :-:  | :-- |
| project | string | Yes | none | The name of your project |
| collection | string | Yes | none | The name of your collection |
| namespace | string | No | `'default'` | The name to assign to the project-collection pair |

```javascript
<RegisterNamespace project='myproject' collection='mycollection' />
```

### ResultInjector

The result injector listens for results from queries and passes them as props to it's children. Use this component to get the results of queries to your components. It will automaticaly update it's childrens props when new results come in.

| Prop | Type | Required | Default | Description |
| :-- | :-: | :-: | :-:  | :-- |
| namespace | string \| string array | No | `'default'` | The namespace(s) to use as the source of the results |

```javascript
<ResultInjector>
  <MyResultsRenderer />
</ResultInjector>
```

### Filter

The Filter component adds a [filter](https://github.com/sajari/sajari-sdk-js-10#filter) to the query. Filters operate on fields and the values within them, and can be combined to produce complex logic.

| Prop | Type | Required | Default | Description |
| :-- | :-: | :-: | :-:  | :-- |
| data | [filter](https://github.com/sajari/sajari-sdk-js-10#filter) | Yes | none | The filter to be applied |

```javascript
<Filter data={fieldFilter('price', 100, FILTER_OP_LT)} />
```

## UI Components
