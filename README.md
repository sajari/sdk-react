# Sajari React SDK

![npm version](https://img.shields.io/npm/v/sajari-react.svg?style=flat-square) ![license](http://img.shields.io/badge/license-MIT-green.svg?style=flat-square)

**sajari-react** is a library of React Components for the [Sajari](https://www.sajari.com) search platform to help build fast and powerful search interfaces.

React provides a simple and elegant way to structure user interfaces. The Sajari React SDK provides a way to seamlessly integrate the Sajari platform into any React app through the use of easily composable Components.

We also provide a vanilla Sajari JS library [here](https://github.com/sajari/sajari-sdk-js/).

## Awesome Overlay!

<img src="https://www.dropbox.com/s/ybbj5pghjqi1kak/ReactSearchOverlay.png?raw=1" width="600" alt="overlay">

## Table of Contents

* [Setup](#setup)
  * [NPM](#npm)
* [Getting started](#getting-started)
* [Examples](#examples)
  * [Basic Search](#basic-search)
* [UI](#ui)
  * [BodyInput](#bodyinput)
* [Components](#components)
  * [Body](#body)
  * [Pagination](#pagination)
* [API](#api)
  * [Body](#body-api)
  * [Page](#page)
  * [ResultsPerPage](#resultsperpage)
  * [Fields](#fields)
  * [RegisterNamespace](#registernamespace)
  * [ResultInjector](#resultinjector)
  * [Filter](#filter)
  * [Index Boosts](#index-boosts)
    * [FieldInstanceBoost](#fieldinstanceboost)
    * [ScoreInstanceBoost](#scoreinstanceboost)
  * [Field Boosts](#field-boosts)
    * [FilterFieldBoost](#filterfieldboost)
    * [DistanceFieldBoost](#distancefieldboost)
    * [IntervalFieldBoost](#intervalfieldboost)
    * [ElementFieldBoost](#elementfieldboost)
    * [TextFieldBoost](#textfieldboost)
  * [Sort](#sort)
  * [Aggregates](#aggregates)
    * [BucketAggregate](#bucketaggregate)
    * [CountAggregate](#countaggregate)
    * [MetricAggregate](#metricaggregate)
* [License](#license)
* [Browser Support](#browser-support)

## Setup

### NPM

```
npm install --save sajari sajari-react
```

## Getting Started

Here is a barebones use of the library.

- The project and collections is registered to the `default` namespace
- An `<input>` element is rendered, with it's value being linked to the body of the query
- The results of the query are injected into `ResultRenderer`
- `ResultRenderer` renders the results into HTML

```javascript
import { RegisterNamespace, ResultInjector } from 'sajari-react/api-components'
import { BodyInput } from 'sajari-react/ui-components'

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

- `ui`: A selection of pre-defined React components for common search use cases.  We also provide some simple event handling to reduce the amount of code you need to write.  This is a great starting for getting to grips with the search system - you should only need to use a few components to get up and running.

- `components`: A high-level set of React components for building search interfaces.  Most `components` combine a few `api` components and do basic event handling for common search use cases. Ideal for customisation of search parameters using `api` components whilst also using taking care of basic search session life-cycles.

- `api`: A set of React components which correspond directly to query parameters and result handling.  They do not render any HTML directly; including an api-component in a render attaches its corresponding query parameter to the current query.

## Examples

### [Basic search](./examples/basic-search/)

[This example](./examples/basic-search/) showcases a simple web app with instant search.

### [Overlay](./examples/overlay/)

The [Overlay](./examples/overlay/) showcases an overlay interface to search made for inclusion in web pages to get search up and running in the quickest time possible.

## Namespaces

All components are namespaced and each namespace corresponds to a query object (i.e. the query object that is built from components in its namespace).  By default all components are given the `default` namespace.

If you're not using any of the `Default` set-ups you'll need to have a `RegisterNamespace` in your application.

### RegisterNamespace

Registers a project and collection with a namespace.

| Prop       | Type   | Required | Default     | Description                                       |
| :--        | :-:    | :-:      | :-:         | :--                                               |
| project    | string | Yes      | none        | The name of your project                          |
| collection | string | Yes      | none        | The name of your collection                       |
| namespace  | string | No       | `'default'` | The name to assign to the project-collection pair |

```javascript
<RegisterNamespace project='myproject' collection='mycollection' />
```

## Components

***Component** refers to a Sajari Component unless specified otherwise.*

Components are the easiest way to get functionality from the SDK. We recommend using them over the lower level `api-components` unless you need the granularity. If you have a use case that isn't covered by a Component then make an [issue](https://github.com/sajari/sajari-react/issues).

### Body

The Body component is for declaring text you'd like to search for, which is specified via the `text` prop. By default the component won't trigger a search until at least 3 characters of text has been given.

```javascript
<Body text='pumpkin soup' />
```

We normally recommend adding some boosts for text searches, particularly if the content you're searching includes articles/products/events with important text fields that you want to prioritise if matched i.e. titles, descriptions, keywords etc.  Common boosts applied are `prefix`-based (i.e. does a field begin with the search text), and `contains` (i.e. does the field contain the exact search text).  The `Body` component has props to set both of these:

```javascript
<Body
  text='pumpkin soup'
  prefixBoosts={{ 'title': 0.05 }}
  containsBoosts={{ 'title': 0.03 }}
/>
```

#### Definitions

| Prop           | Type   | Required | Default   | Description                                                    |
| :--            | :-:    | :-:      | :-:       | :--                                                            |
| text           | string | Yes      | `''`      | The text to search for. Case in-sensitive                      |
| minLength      | number | No       | `3`       | The minimum length of `text` before a search is performed      |
| prefixBoosts   | object | No       | `{}`      | The dictionary of `field`: `value` to use as `prefix` boosts   |
| containsBoosts | object | No       | `{}`      | The dictionary of `field`: `value` to use as `contains` boosts |
| namespace      | string | No       | `default` | The namespace to operate on                                    |

### Pagination

The Pagination component makes it easy to add pagination to your project. It provides it's children with the current page, and callbacks to trigger page change.

| Prop | Type | Required | Default | Description |
| :-- | :-: | :-: | :-:  | :-- |
| namespace | string | No | `default` | The namespace to operate on |

Props provided to children.

| Prop | Type              | Description                                                               |
| :--  | :-:               | :--                                                                       |
| page | number            | The current page                                                          |
| next | fn () -> ()       | A function that will increment the page and perform a search when called  |
| prev | fn () -> ()       | A function that will decrement the page and perform a search when called  |
| set  | fn (number) -> () | A function that allows you to set the current page                        |
| ...  | any               | Any props that are passed to `Pagination` will be passed to it's children |

## API Components

API Components are easily composable React Components which allow you to configure your search query in a declaritive fashion. They do not render any HTML directly; including an api-component in a render attaches its corresponding query parameter to the current query.  For instance, rendering a `Filter` component (see below) will add a filter to the query.

API components will use the `default` namespace if one is not specified.

### Body (API)

The Body component adds a text body to a search query. It can also take a weighting.

| Prop   | Type   | Required | Default | Description                                                                |
| :--    | :-:    | :-:      | :-:     | :--                                                                        |
| body   | string | Yes      | `''`    | Text (free text)                                                           |
| weight | number | No       | `1`     | Weight (importance) to apply to this text, restricted to 0 <= weight <= 1. |

```javascript
<Body body="pumpkin soup" weight={1} />
```

### Offset

The Offset component sets the offset to use when fetching results.

| Prop   | Type   | Required | Default | Description                   |
| :--    | :-:    | :-:      | :-:     | :--                           |
| offset | number | Yes      | `0`     | Offset to return results from |

```javascript
// Start the results at the 11th (i.e. the second page of 10)
<Offset offset={10} />
```

### Limit

The number of results to return.

| Prop  | Type   | Required | Default | Description                     |
| :--   | :-:    | :-:      | :-:     | :--                             |
| limit | number | Yes      | `10`    | The number of results to return |

```javascript
<Limit limit={20} />
```

### Fields

The fields of result documents to fetch. Restricting this to only the fields you are using will speed up query and transmission time.  If no Fields component is rendered then all document fields are returned.

| Prop   | Type         | Required | Default | Description                          |
| :--    | :-:          | :-:      | :-:     | :--                                  |
| fields | string array | Yes      | none    | The fields to return for each result |

```javascript
<Fields fields={['_id', 'url', 'description']} />
```

### Response

The Response listens for results from queries and passes them as props to it's children. Use this component to get the results of queries to your components.

| Prop      | Type   | Required | Default     | Description                                          |
| :--       | :-:    | :-:      | :-:         | :--                                                  |
| namespace | string | No       | `'default'` | The namespace(s) to use as the source of the results |

```javascript
<Response>
  <MyResultsRenderer />
</Response>
```

### Filter

The Filter component adds a [filter](https://doc.esdoc.org/github.com/sajari/sajari-sdk-js/function/index.html#static-function-fieldFilter) to the query.

| Prop | Type                                                                                                            | Required | Default | Description              |
| :--  | :-:                                                                                                             | :-:      | :-:     | :--                      |
| data | [filter](https://doc.esdoc.org/github.com/sajari/sajari-sdk-js/function/index.html#static-function-fieldFilter) | Yes      | none    | The filter to be applied |

```javascript
<Filter data={fieldFilter('price', '<', 100)} />
```

### Instance Boosts

InstanceBoost represents a boosting which is a applied to instances of terms in the reverse index. This type of boost effectively dynamically ranks documents for a given term.

#### FieldInstanceBoost

Field is an instance boost which is applied to term instances which originate from the given meta field.

| Prop  | Type   | Required | Default | Description        |
| :--   | :-:    | :-:      | :-:     | :--                |
| field | string | Yes      | none    | Field name         |
| value | number | Yes      | none    | Value of the boost |

```javascript
// title field is worth 1.5x
<FieldInstanceBoost field='title' value={1.5} />
```

#### ScoreInstanceBoost

Score is an instance boost that boosts term instances based on their individual scores based on individual interactions.

| Prop      | Type   | Required | Default | Description                                                          |
| :--       | :-:    | :-:      | :-:     | :--                                                                  |
| threshold | number | Yes      | none    | The maximum value to allow, used to scale and cap the computed score |
| minCount  | number | Yes      | none    | The minimum number of interactions before the score is applied       |

```javascript
<ScoreInstanceBoost threshold={1.5} />
```

### Field Boosts

#### FilterFieldBoost

FilterFieldBoost boosts results if they match a specified filter. Filters are defined [here](https://doc.esdoc.org/github.com/sajari/sajari-sdk-js/function/index.html#static-function-fieldFilter).

| Prop | Type | Required | Default | Description |
| :-- | :-: | :-: | :-:  | :-- |
| filter | [filter](https://doc.esdoc.org/github.com/sajari/sajari-sdk-js/function/index.html#static-function-fieldFilter) | Yes | none | The filter to use as the condition for the boost |
| value | number | Yes | none | The value of the boost |

```javascript
<FilterFieldBoost filter={fieldFilter('price', 100, FILTER_OP_LT)} value={1.5} />
```

#### IntervalFieldBoost

Interval is a distance-based boosting for numeric fields. It is comprised of a series of points to represent any linear distribution across a numerical range.

| Prop | Type | Required | Default | Description |
| :-- | :-: | :-: | :-:  | :-- |
| field | string | Yes | none | The field to operate on |
| points | [point](https://doc.esdoc.org/github.com/sajari/sajari-sdk-js/function/index.html#static-function-pointValue) array | Yes | none | The points use as the basis for the boost |

```javascript
<IntervalFieldBoost field='performance' points={[
  pointValue(0, 0.5),
  pointValue(80, 1),
  pointValue(100, 1.5),
]} />
```

#### ElementFieldBoost

Element is an element-based boost for repeated fields. The boost is evaluated as a portion of a list of values which appear in the document field. Boost effect: between 0 and 1.

| Prop   | Type         | Required | Default | Description                                          |
| :--    | :-:          | :-:      | :-:     | :--                                                  |
| field  | string       | Yes      | none    | Field containing string array                        |
| values | string array | Yes      | none    | List of elements to compare against the field values |

```javascript
<ElementFieldBoost field='keywords' value={['sale', 'discount']} />
```

#### TextFieldBoost

Text represents a text-based boosting for string fields. Compares text (using a bag of words model) and applies a boost based on the number of intesecting words. Boost effect: between 0 and 1.

| Prop  | Type   | Required | Default | Description                              |
| :--   | :-:    | :-:      | :-:     | :--                                      |
| field | string | Yes      | none    | Field containing the string data         |
| text  | string | Yes      | none    | Text to compare against the field values |

```javascript
<TextFieldBoost field='description' test='sale' value={1.2} />
```

### Sort

Sort defines the ordering of result documents.  Specifying a sort overrides the default behvaiour which orders documents by score.

| Prop  | Type   | Required | Default | Description                                                       |
| :--   | :-:    | :-:      | :-:     | :--                                                               |
| field | number | Yes      | none    | Field to sort by.  Prefix by '-' to make the sort descending. |

```javascript
// Sort by price descending
<Sort field='-price' />
```

### Aggregates

Aggregate is a statistical query run on the result set of a search.

#### BucketAggregate

BucketAggregate aggregates the documents of a query result into buckets using filters.

| Prop | Type | Required | Default | Description |
| :-- | :-: | :-: | :-:  | :-- |
| name | string | Yes | none | The name to give the aggregate, this is how you identify it in the results |
| buckets | [bucket array](https://doc.esdoc.org/github.com/sajari/sajari-sdk-js/function/index.html#static-function-bucket)                                                       | Yes | none | The buckets of data to aggregate |

```javascript
<BucketAggregate name='priceGroups' data={[
  bucket('under100', fieldFilter('price', '<=', 100))
]} />
```

#### CountAggregate

CountAggregate counts unique field values for documents in a set of query results.

| Prop  | Type   | Required | Default | Description                                                                |
| :--   | :-:    | :-:      | :-:     | :--                                                                        |
| name  | string | Yes      | none    | The name to give the aggregate, this is how you identify it in the results |
| field | string | Yes      | none    | The field to aggregate the values from                                     |

```jsx
<CountAggregate name='count' field='name' />
```

#### MetricAggregate

MetricAggregate performs metrics over the data in a field. The options are available [here](https://github.com/sajari/sajari-sdk-js#aggregates).

| Prop  | Type                                                       | Required | Default | Description                                                                |
| :--   | :-:                                                        | :-:      | :-:     | :--                                                                        |
| name  | string                                                     | Yes      | none    | The name to give the aggregate, this is how you identify it in the results |
| field | string                                                     | Yes      | none    | The field to aggregate the values from                                     |
| type  | [enum](https://doc.esdoc.org/github.com/sajari/sajari-sdk-js/variable/index.html#static-variable-METRIC_TYPE_AVG)                                                   | Yes      | none    | The metric to measure                                                      |

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
