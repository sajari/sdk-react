# Sajari React SDK

![npm](https://npmjs.org/package/sajari-sdk-react) ![license](http://img.shields.io/badge/license-MIT-green.svg?style=flat-square)

**sajari-react-sdk** is a library of React Components for the [Sajari](https://www.sajari.com) search platform that helps you build fast and powerful search interfaces.

React provides a simple and elegant way to structure user interfaces. The Sajari React SDK provides a way to seemlessly integrate the Sajari platform into any React app through the use of easily composable Components.

We also provide a vanilla Sajari JS library [here](https://github.com/sajari/sajari-sdk-js/).


## Table of Contents

* [Setup](#setup)
  * [NPM](#npm)
* [Getting started](#getting-started)
* [Components](#components)
  * [Body](#body)
* [API Components](#api-components)
  * [Body](#api-body)
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
  * [Index Boosts](#index-boosts)
    * [FieldInstanceBoost](#fieldinstanceboost)
    * [ScoreInstanceBoost](#scoreinstanceboost)
  * [Meta Boosts](#meta-boosts)
    * [FilterFieldBoost](#filterfieldboost)
    * [TextFieldBoost](#textfieldboost)
    * [IntervalFieldBoost](#intervalfieldboost)
    * [GeoMetaBoost](#geometaboost)
    * [ElementFieldBoost](#elementfieldboost)
    * [DistanceFieldBoost](#distancefieldboost)
  * [Sort](#sort)
* [UI Components](#ui-components)
  * [BodyInput](#bodyinput)
* [License](#license)
* [Browser Support](#browser-support)

## Setup

### NPM

```
npm install --save sajari sajari-sdk-react
```

## Getting Started

Here is a barebones use of the library.

- The project and collections is registered to the `default` namespace
- An `<input>` element is rendered, with it's value being linked to the body of the query
- The results of the query are injected into `ResultRenderer`
- `ResultRenderer` renders the results into HTML

```javascript
import { RegisterNamespace, ResultInjector } from 'sajari-sdk-react/api-components'
import { BodyInput } from 'sajari-sdk-react/ui-components'

const App = () => (
  <div>
    <RegisterNamespace project='bobstools' collection='inventory' />
    <BodyInput />
    <ResultInjector>
      <YourResultRenderer />
    </ResultInjector>
  </div>
)
```

##

The library is split into 3 main parts:

- `ui-components`: A selection of pre-defined React components for common search use cases.  We also provide some simple event handling to reduce the amount of code you need to write.  This is a great starting point for someone getting to grips with the search system - you should only need to use a few components to get up and running.

- `components`: A high-level set of React components for building search interface, with some event-handling to avoid boilerplate.  Most `components` combine a few `api-components` and do basic event handling for common search use cases. Ideal for customisation of search parameters using `api-components`, whilst also using taking care of basic search session life-cycles.

- `api-components`: A set of React components which correspond directly to query parameters and result handling.  They do not render any HTML directly; including an api-component in a render attaches its corresponding query parameter to the current query.

## Namespaces

All components are namespaced, and each namespace corresponds to a query object (i.e. the query object that is built from components in its namespace).  By default all components are given the `default` namespace.

Every application must render the `<RegisterNamespace>` component to set the `project` and `collection` for that namespace.

### RegisterNamespace

Registers a project and collection with a namespace.

| Prop | Type | Required | Default | Description |
| :-- | :-: | :-: | :-:  | :-- |
| project | string | Yes | none | The name of your project |
| collection | string | Yes | none | The name of your collection |
| namespace | string | No | `'default'` | The name to assign to the project-collection pair |

```jsx
<RegisterNamespace project='myproject' collection='mycollection' />
```


## Components

***Component** refers to a Sajari Component unless specified otherwise.*

Components are the easiest way to get functionality from the SDK. We recommend using them over the lower level API-Components unless you need the granularity. If you have a use case that isn't covered by a Component you can make an [issue](https://github.com/sajari/sajari-sdk-react/issues).

### Body

The Body component is for declaring text you'd like to search for, which is specified via the `text` prop. By default the component won't trigger a search until at least 3 characters of text has been given.

```javascript
<Body text='pumpkin' />
```

We normally recommend adding some boosts for text searches, particularly if the content you're searching includes articles/products/events with important text fields that you want to prioritise if matched i.e. titles, descriptions, keywords etc.  Common boosts applied are `prefix`-based (i.e. does a field begin with the search phrase), and `contains` (i.e. does the field contain the exact search phrase).  The `Body` component has props to set both of these:

```javascript
const prefixBoosts = { 'title': 1.2 }
const containsBoosts = { 'title': 1.1 }
<Body
  text='pumpkin soup'
  prefixBoosts={prefixBoosts}
  containsBoosts={containsBoosts}
/>
```

Other props for `Body` are:

| Prop | Type | Required | Default | Description |
| :-- | :-: | :-: | :-:  | :-- |
| text | string | Yes | `''` | The text to search for. Non case sensitive |
| minLength | number | No | `3` | The minimum length of `text` before a search is performed |
| prefixBoosts | object | No | `{}` | The dictionary of `field`: `value` to use as `prefix` boosts |
| containsBoosts | object | No | `{}` | The dictionary of `field`: `value` to use as `contains` boosts |
| namespace | string \| string array | No | `default` | The namespace to operate on |

## API Components

API Components are easily composable React Components which allow you to configure your search query in a declaritive fashion. They do not render any HTML directly; including an api-component in a render attaches its corresponding query parameter to the current query.  For instance, rendering a `Filter` component (see below) will add a filter to the query.

If no namespace is specified, all API components will use the `default` namespace.

### API Body

The Body component adds a text body to a search query. It can also take a weighting.

| Prop | Type | Required | Default | Description |
| :-- | :-: | :-: | :-:  | :-- |
| body | string | Yes | `''` | The text to search for |
| weight | number | No | `1` | The weighting to give the body in the query |

```jsx
<Body body="red computer parts" weight={1} />
```

### Page

The Page components sets which page of the search results to fetch.

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

### Index Boosts

Index boosts apply to indexed fields.

#### FieldInstanceBoost

FieldInstanceBoost increases the value of a match in a certain field. This is commonly used make things like a title have more weight than a description.

| Prop | Type | Required | Default | Description |
| :-- | :-: | :-: | :-:  | :-- |
| field | string | Yes | none | The field boost |
| value | number | Yes | none | The value of the boost |

```jsx
<FieldInstanceBoost field='title' value={1.5} />
```

#### ScoreInstanceBoost

ScoreInstanceBoost  boosts term instances based on their individual scoring values.

| Prop | Type | Required | Default | Description |
| :-- | :-: | :-: | :-:  | :-- |
| threshold | number | Yes | none | The maximum value to allow, used to scale and cap the computed score |

```jsx
<ScoreInstanceBoost threshold={1.5} />
```

### Meta Boosts

#### FilterFieldBoost

FilterFieldBoost boosts results if they match a specified filter. Filters are defined [here](https://github.com/sajari/sajari-sdk-js/tree/v2#filter).

| Prop | Type | Required | Default | Description |
| :-- | :-: | :-: | :-:  | :-- |
| filter | [filter](https://github.com/sajari/sajari-sdk-js/tree/v2#filter) | Yes | none | The filter to use as the condition for the boost |
| value | number | Yes | none | The value of the boost |

```jsx
<FilterFieldBoost filter={fieldFilter('price', 100, FILTER_OP_LT)} value={1.5} />
```

#### TextFieldBoost

TextFieldBoost represents a text-based boosting for search result meta data which compares the text word-by-word and applies a boost based on the number of common words.

| Prop | Type | Required | Default | Description |
| :-- | :-: | :-: | :-:  | :-- |
| field | string | Yes | none | The field to operate on |
| text | string | Yes | none | The text to compare against |
| value | number | Yes | none | The value of the boost |

```jsx
<TextFieldBoost field='description' test='sale' value={1.2} />
```

#### IntervalFieldBoost

IntervalFieldBoost represents distance based boosting that blends between the two points containing the value in the meta field. This uses the [`pointValue`](https://github.com/sajari/sajari-sdk-js/tree/v2#interval-meta-boost-example) function found in [sajari-sdk-js](https://github.com/sajari/sajari-sdk-js/tree/v2).

| Prop | Type | Required | Default | Description |
| :-- | :-: | :-: | :-:  | :-- |
| field | string | Yes | none | The field to operate on |
| points | [point](https://github.com/sajari/sajari-sdk-js/tree/v2#interval-meta-boost-example) array | Yes | none | The points use as the basis for the boost |

```jsx
<IntervalFieldBoost field='performance' points={[
  pointValue(0, 0.5),
  pointValue(80, 1),
  pointValue(100, 1.5),
]} />
```

#### GeoMetaBoost

GeoMetaBoost boosts results based off of distance from lat-lng coordinates. Lat and lng are interpreted as degrees.

| Prop | Type | Required | Default | Description |
| :-- | :-: | :-: | :-:  | :-- |
| fieldLat | string | Yes | none | The field containing the latitude value |
| fieldLng | string | Yes | none | The field containing the longitude value |
| lat | number | Yes | none | The latitude value to compare against |
| lng | number | Yes | none | The longitude value to compare against |
| radius | number | Yes | none | The radius around the lat-lng to boost (km) |
| region | [enum](https://github.com/sajari/sajari-sdk-js/blob/v2/README.md#geo-meta-boost-example) | Yes | none | The region to apply the boost to |
| value | number | Yes | none | The value of the boost |

```jsx
<GeoMetaBoost
  fieldLat='lat'
  fieldLng='lng'
  lat={-33.8688}
  lng={151.2093}
  radius={50}
  region={GEO_META_BOOST_REGION_INSIDE}
  value={1.5}
/>
```

#### ElementFieldBoost

ElementFieldBoost applies a boost based on the number of elements in the meta field that match the supplied elements.

| Prop | Type | Required | Default | Description |
| :-- | :-: | :-: | :-:  | :-- |
| field | string | Yes | none | The field to operate on |
| values | string array | Yes | none | The values to compare against |

```jsx
<ElementFieldBoost field='keywords' value={['sale', 'discount']} />
```

#### DistanceFieldBoost

DistanceFieldBoost boosts based off of distance from a particular numeric point

| Prop | Type | Required | Default | Description |
| :-- | :-: | :-: | :-:  | :-- |
| field | string | Yes | none | The field to operate on |
| min | number | Yes | none | The minimum distance from ref to apply the boost |
| max | number | Yes | none | The maximum distance from ref to apply the boost |
| ref | number | Yes | none | The reference point of the boost |
| value | number | Yes | none | The value of the boost |

```jsx
// Boost values that are within 20 of 50 (30..70)
<DistanceFieldBoost field='price' min={0} max={20} ref={50} value={1.5} />
```

### Sort

Sort defines the ordering of result documents.  Specifying a sort overrides the default behvaiour which orders documents by score.

| Prop | Type | Required | Default | Description |
| :-- | :-: | :-: | :-:  | :-- |
| field | number | Yes | none | The minimum distance from ref to apply the boost |
| ord | [enum](https://github.com/sajari/sajari-sdk-js/blob/v2/README.md#sorting) | Yes | none | The ordering of the sort |


```jsx
<Sort field='price' ord={SORT_ASCENDING} />
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
