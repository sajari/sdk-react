# Sajari React SDK 
[![npm (scoped)](https://img.shields.io/npm/v/@sajari/sdk-react.svg?style=flat-square)](https://www.npmjs.com/package/@sajari/sdk-react)
[![Travis](https://img.shields.io/travis/sajari/sajari-sdk-react.svg?style=flat-square)](https://travis-ci.org/sajari/sajari-sdk-react)
[![license](https://img.shields.io/npm/l/@sajari/sdk-react.svg?style=flat-square)](./LICENSE)

`@sajari/sdk-react` is a client side javascript library of React Components for the [Sajari](https://www.sajari.com) search platform to help build fast and powerful search interfaces.

React provides a simple and elegant way to structure user interfaces. The Sajari React SDK provides a way to seamlessly integrate the Sajari platform into any web-based app through the use of easily composable Components.

We also provide a vanilla Sajari JS library [here](https://github.com/sajari/sajari-sdk-js/).

<!-- TODO(@benhinchley): take new screenshot -->

# Table of contents

<!-- * [Examples](#examples) -->
* [Setup](#setup)
  * [NPM](#npm)
* [Documentation](#documentation)
* [Quick reference](#quick-reference)
* [License](#license)
* [Browser support](#browser-support)

<!-- 
# Examples

It's easy to get up and running using one of our examples as a starting point.  They're pre-configured with all the correct dependencies, so all you need to do is copy the example directory into your own workspace and you're on your way!

TODO(@benhinchley): build examples in codesandbox

* [Autocomplete](./examples/autocomplete-only/): search box with autocomplete.
* [Autocomplete with suggestions](./examples/autocomplete-suggest/): search box with autocomplete + suggestions.
* [Sliding autocomplete dropdown](./examples/sliding-autocomplete-dropdown): search box enabled by clicking search icon.
* [Simple search](./examples/simple-search/): instant search with autocomplete.
* [Standard search](./examples/standard-search/): instant search with autocomplete + tab filtering.
* [Custom result renderer](./examples/custom-result-renderer/): instant search with autocomplete + custom result renderers.
* [Radio/checkbox](./examples/radio-checkbox/): radio/checkbox filtering.
* [Aggregate](./examples/aggregate/): aggregate filtering.

-->

# Setup

If you want to add the SDK to an existing project, or want to start from scratch, then you can get `@sajari/sdk-react` using NPM.

### NPM

We currently distribute the `@sajari/sdk-react` library through NPM. NPM is only required for downloading the library. The SDK is made to be used from the browser.

```shell
$ npm install --save @sajari/sdk-react
```

# Documentation
To read the documentation, go here [sajari-sdk-react.netlify.com](https://sajari-sdk-react.netlify.com)

# Quick reference

This library includes a standard set of components for building search interfaces.

### Setting up API calls

Before you can use any components, you'll need to initialise a [`Pipeline`](#using-pipeline) for handling search requests to the API:

```javascript
import { Pipeline } from "@sajari/sdk-react";

// Create a pipeline for running searches.
const pipeline = new Pipeline(
  {
    project: "<your-project>", 
    collection: "<your-collection>"
  },
  "website"
);

// Now you're ready to perform a search.
pipeline.search({
  "q": "awesome articles",
});
```

## [Provider](https://sajari-sdk-react.netlify.com/components/provider)
`<Provider />` is the component that maintains the state of the search, does the queries, and provides the response to the other components so that they can update themselves when needed.

```javascript
import { Provider, Pipeline, Values } from "@sajari/sdk-react";

const pipeline = new Pipeline(
  {
    project: "<your-project>", 
    collection: "<your-collection>"
  },
  "website"
);

const values = new Values();


ReactDOM.render(
  <Provider search={{pipeline, values}}>
    {/* Your application code here */}
  </Provider>,
  document.getElementById("root")
)
```

## [Input](https://sajari-sdk-react.netlify.com/components/input)

The `Input` component provides a text-box which performs searches as the user types.
It is customizable through the use of props, to render appropraite autocomplete
suggestions back in the input box, and to also render autocomplete suggestions in
a list underneath.

```javascript
import { Input } from "@sajari/sdk-react";

/* default props */
<Input />

/* typeahead */
<Input inputMode="typeahead" />

/* suggestions */
<Input inputMode="typeahead" dropdownMode="suggestions" />
```

## Handling results

A typical search result UI could includes a summary of the search, maybe with options to change spellings or search for alternatives, and a list of the paginated results.  We include components for all of these pieces so it's easy to get started.

A standard search response handler would look something like this:

```javascript
<Response>
  <Summary />
  <Results />
  <Paginator />
</Response>
```
#### `<Response/>`

The `<Response />` component doesn't render its children if the pipeline `Response` is empty (i.e. the initial pre-search state, or after `pipeline.clearResponse()` has been called).

#### `<Results />`

The `<Results />` component can also take a custom renderer which will be used to render its individual results.  See the [custom result renderer example](./examples/custom-result-renderer) for more details.

## Facets & Filtering
For documentaion on Facets & Filtering, go here [sajari-sdk-react.netlify.com/facets-and-filtering](https://sajari-sdk-react.netlify.com/facets-and-filtering)

# License

We use the [MIT license](./LICENSE)

# Browser support

The browser support is dependent on the React library, which currently supports recent versions of Chrome, Firefox, Sajari, Opera, and IE9+. (17/8/2016)
