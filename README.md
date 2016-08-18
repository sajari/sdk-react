# Sajari React SDK

![npm](https://npmjs.org/package/sajari-sdk-react) ![license](http://img.shields.io/badge/license-MIT-green.svg?style=flat-square)

**sajari-react-sdk** is a library of React Components for the [Sajari](https://www.sajari.com) search platform that helps you build fast and powerful live search interfaces.

React provides a simple and elegant way to structure your applications view. The Sajari React SDK provides a way to seemlessly integrate the Sajari patform into your new or existing React app through the use of easily composable Components.

If you're looking for the vanilla javascript library, see [here](https://github.com/sajari/sajari-sdk-js/).


## Table of Contents

* [Setup](#setup)
  * [Browser](#browser)
  * [NPM, Browserify, webpack](#npm-browserify-webpack)
* [Getting started](#getting-started)
* [API Components](#api-components)
  * [Body](#body)
  * [Page](#page)
  * [ResultsPerPage](#resultsperpage)
  * [Fields](#fields)
  * [RegisterNamespace](#registernamespace)
  * [ResultInjector](#resultinjector)
  * [Filter](#filter)
  * [Aggregates](#aggregates)
    * [BucketAggregate](#bucketaggregate)
    * [CountAggregate](#countaggregate)
    * [MetricAggregate](#metricaggregate)
* [UI Components](#ui-components)
  * [BodyInput](#bodyinput)
* [License](#license)
* [Browser Support](#browser-support)

## Setup

### Browser

### NPM, Browserify, webpack

```
npm install --save sajari-sdk-react
```

## Getting Started

Here is a barebones use of the library.

- The project and collections is registered to the `default` namespace
- An `<input>` element is rendered, with it's value being linked to the body of the query
- The results of the query are injected into `ResultRenderer`
- `ResultRenderer` renders the results into HTML

```jsx
import { RegisterNamespace, BodyInput, ResultInjector, ResultRenderer } from 'sajari-sdk-react'

const App = () => (
  <div>
    <RegisterNamespace project='bobstools' collection='inventory' />
    <BodyInput />
    <ResultInjector>
      <ResultRenderer />
    </ResultInjector>
  </div>
)
```

## API Components

API Components are easily composable React Components which allow you to configure your search query in a declaritive fashion. By themselves they do not render any html. You can think of them as rendering parts of your query instead. Your query will always reflect the state of these components.

If no namespace is specified, all API components will use the `default` namespace.

### Body

The Body component adds a text body to a search query. It can also take a weighting.

| Prop | Type | Required | Default | Description |
| :-- | :-: | :-: | :-:  | :-- |
| body | string | Yes | `''` | The text to search for |
| weight | number | No | `1` | The weighting to give the body in the query |

```jsx
<Body body="red computer parts" weight={1} />
```

### Page

The Page components sets which page of the search results to use.

| Prop | Type | Required | Default | Description |
| :-- | :-: | :-: | :-:  | :-- |
| page | number | Yes | `1` | The page of results to fetch |

```jsx
<Page page={5} />
```

### ResultsPerPage

The number of results to return per page.

| Prop | Type | Required | Default | Description |
| :-- | :-: | :-: | :-:  | :-- |
| results | number | Yes | `10` | The number of results to return per page |

```jsx
<ResultsPerPage results={20} />
```

### Fields

The fields of the document to fetch. Restricting this to only the fields you are using will speed up query and transmission time.

| Prop | Type | Required | Default | Description |
| :-- | :-: | :-: | :-:  | :-- |
| fields | string array | Yes | none | The fields to return for each result |

```jsx
<Fields fields={['_id', 'url', 'description']} />
```

### RegisterNamespace

Registeres your project and collection with a namespace.

| Prop | Type | Required | Default | Description |
| :-- | :-: | :-: | :-:  | :-- |
| project | string | Yes | none | The name of your project |
| collection | string | Yes | none | The name of your collection |
| namespace | string | No | `'default'` | The name to assign to the project-collection pair |

```jsx
<RegisterNamespace project='myproject' collection='mycollection' />
```

### ResultInjector

The result injector listens for results from queries and passes them as props to it's children. Use this component to get the results of queries to your components. It will automaticaly update it's childrens props when new results come in.

| Prop | Type | Required | Default | Description |
| :-- | :-: | :-: | :-:  | :-- |
| namespace | string \| string array | No | `'default'` | The namespace(s) to use as the source of the results |

```jsx
<ResultInjector>
  <MyResultsRenderer />
</ResultInjector>
```

### Filter

The Filter component adds a [filter](https://github.com/sajari/sajari-sdk-js-10#filter) to the query. Filters operate on fields and the values within them, and can be combined to produce complex logic.

| Prop | Type | Required | Default | Description |
| :-- | :-: | :-: | :-:  | :-- |
| data | [filter](https://github.com/sajari/sajari-sdk-js-10#filter) | Yes | none | The filter to be applied |

```jsx
<Filter data={fieldFilter('price', 100, FILTER_OP_LT)} />
```

### Aggregates

Aggregates return data about your query.

#### BucketAggregate

BucketAggregate aggregates into buckets whose values are determined by a filter.

| Prop | Type | Required | Default | Description |
| :-- | :-: | :-: | :-:  | :-- |
| name | string | Yes | none | The name to give the aggregate, this is how you identify it in the results |
| buckets | [bucket array](https://github.com/sajari/sajari-sdk-js-10#bucket-example) | Yes | none | The buckets of data to aggregate

```jsx
<BucketAggregate name='priceGroups' data={[
  bucket('under100', fieldFilter('price', 100, FILTER_OP_LT))
]} />
```

#### CountAggregate

CountAggregate counts all of the unique values for a particular field in a set of query results.

| Prop | Type | Required | Default | Description |
| :-- | :-: | :-: | :-:  | :-- |
| name | string | Yes | none | The name to give the aggregate, this is how you identify it in the results |
| field | string | Yes | none | The field to aggregate the values from |

```jsx
<CountAggregate name='count' field='name' />
```

#### MetricAggregate

MetricAggregate performs metrics over the data in a field. The options are available [here](https://github.com/sajari/sajari-sdk-js-10#aggregates).

| Prop | Type | Required | Default | Description |
| :-- | :-: | :-: | :-:  | :-- |
| name | string | Yes | none | The name to give the aggregate, this is how you identify it in the results |
| field | string | Yes | none | The field to aggregate the values from |
| type | [enum](https://github.com/sajari/sajari-sdk-js-10#aggregates) | Yes | none | The metric to measure |

```jsx
<MetricAggregate name='averagePrice' field='price' type={METRIC_TYPE_AVG} />
```

## UI Components

### BodyInput

The BodyInput component renders an `<input>` html element and a [body](#body) component. The value of the body component is taken from the input element. This is a barebones premade element made to demonstrate how to link html elements and api components. Looking at the code of this example is a good way to learn how to make your own components that combine html and api components.

| Prop | Type | Required | Default | Description |
| :-- | :-: | :-: | :-:  | :-- |
| body | string | No | `''` | The initial value of the input element |
| namespace | string \| string array | No | `'default'` | The namespace(s) to apply the body to |

```jsx
<BodyInput />
```

## License

We use the [MIT license](./LICENSE)

## Browser Support

The browser support is dependent on the React library, which currently supports recent versions of Chrome, Firefox, Sajari, Opera, and IE9+. (17/8/2016)
