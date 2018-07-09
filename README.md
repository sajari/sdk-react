# Sajari React SDK 
[![npm (scoped)](https://img.shields.io/npm/v/@sajari/sdk-react.svg?style=flat-square)](https://www.npmjs.com/package/@sajari/sdk-react)
[![Travis](https://img.shields.io/travis/sajari/sajari-sdk-react.svg?style=flat-square)](https://travis-ci.org/sajari/sajari-sdk-react)
[![license](https://img.shields.io/npm/l/@sajari/sdk-react.svg?style=flat-square)](./LICENSE)

`@sajari/sdk-react` is a client side javascript library of React Components for the [Sajari](https://www.sajari.com) search platform to help build fast and powerful search interfaces.

React provides a simple and elegant way to structure user interfaces. The Sajari React SDK provides a way to seamlessly integrate the Sajari platform into any web-based app through the use of easily composable Components.

We also provide a vanilla Sajari JS library [here](https://github.com/sajari/sajari-sdk-js/).

<!-- TODO(@benhinchley): take new screenshot of sajari search interface -->

# Table of contents

* [Examples](#examples)
* [Setup](#setup)
  * [NPM](#npm)
* [Documentation](#documentation)
* [Quick reference](#quick-reference)
* [License](#license)
* [Browser support](#browser-support)

# Examples

It's easy to get up and running using one of our examples as a starting point.  They're pre-configured with all the correct dependencies, so all you need to do is copy the example directory into your own workspace and you're on your way!

* [Basic](https://3vy8p6k7z1.codesandbox.io/): basic search box. [Edit](https://codesandbox.io/s/3vy8p6k7z1)
* [Typeahead and Instant Search](https://5zz60m4l0p.codesandbox.io/): search box with autocomplete and instant search. [Edit](https://codesandbox.io/s/5zz60m4l0p)
* [Suggestions Dropdown](https://pvo0pxojx.codesandbox.io/): search box with autocomplete + suggestions. [Edit](https://codesandbox.io/s/pvo0pxojx)
* [Radio/checkbox](https://w64pm94vn8.codesandbox.io/): radio/checkbox filtering. [Edit](https://codesandbox.io/s/w64pm94vn8)


<!-- TODO(@benhinchley): build examples in codesandbox

* [Sliding autocomplete dropdown](./examples/sliding-autocomplete-dropdown): search box enabled by clicking search icon.
* [Standard search](./examples/standard-search/): instant search with autocomplete + tab filtering.
* [Aggregate](./examples/aggregate/): aggregate filtering.

-->

# Setup

### NPM

We distribute the `@sajari/sdk-react` library through NPM (note: NPM is only required for downloading the library). The SDK is made to be used from the browser.

```shell
$ npm install --save @sajari/sdk-react
```

# Documentation
For full documentation, see [sajari-sdk-react.netlify.com](https://sajari-sdk-react.netlify.com).

# Quick reference

This library includes a standard set of components for building search interfaces.

## Setting up API calls

Before you can use any components, you'll need to initialise a `Pipeline` for handling search requests to the API:

```javascript
import { Pipeline } from "@sajari/sdk-react";

// Create a pipeline for running searches.
const pipeline = new Pipeline(
  {
    project: "<your-project>", 
    collection: "<your-collection>"
  },
  "<pipeline-name>" // typically "website"
);

// Now you're ready to perform a search.
pipeline.search({
  "q": "awesome articles",
});
```

## [Provider](https://sajari-sdk-react.netlify.com/components/provider)
`<Provider />` handles the request-response lifecycle for searches.  It performs queries and passes the response to UI components so that they can be updated.

```javascript
import { Provider, Pipeline, Values } from "@sajari/sdk-react";

const pipeline = new Pipeline(
  {
    project: "<your-project>", 
    collection: "<your-collection>"
  },
  "<your-pipeline>"
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

The `Input` component creates a text-box which performs searches as the user types.
It is customizable through the use of props, options include rendering autocomplete
suggestions back in the input box, or rendering autocomplete suggestions in
a drop-down list.

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

A typical search result UI panel includes a summary of the search (i.e. "10 results found for X"), including options to fix spellings or suggested alternatives, and a paginated list of results.  We include components for all of these pieces so it's easy to get started.

A standard search response handler would look something like this:

```javascript
<Response>
  <Summary />
  <Results />
  <Paginator />
</Response>
```
### `<Response/>`

The `<Response />` component acts as a wrapper for components that render response information.  It doesn't render its children if the pipeline `Response` is empty (i.e. the initial pre-search state, or after `pipeline.clearResponse()` has been called).

### `<Results />`

The `<Results />` component can also take a custom renderer which will be used to render its individual results.  See the [custom result renderer example](https://sajari-sdk-react.netlify.com/components/results#with-custom-result-renderer) for more details.

## Facets & Filtering
For documentaion on Facets & Filtering, see [sajari-sdk-react.netlify.com/facets-and-filtering](https://sajari-sdk-react.netlify.com/facets-and-filtering)

# License

We use the [MIT license](./LICENSE)

# Browser support

The browser support is dependent on the React library, which currently supports recent versions of Chrome, Firefox, Sajari, Opera, and IE9+. (17/8/2016)
