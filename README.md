# Sajari React SDK

![npm version](https://img.shields.io/npm/v/sajari-react.svg?style=flat-square) ![license](http://img.shields.io/badge/license-MIT-green.svg?style=flat-square)

**sajari-react** is a client side javascript library of React Components for the [Sajari](https://www.sajari.com) search platform to help build fast and powerful search interfaces.

React provides a simple and elegant way to structure user interfaces. The Sajari React SDK provides a way to seamlessly integrate the Sajari platform into any web-based app through the use of easily composable Components.

We also provide a vanilla Sajari JS library [here](https://github.com/sajari/sajari-sdk-js/).


## Table of Contents

* [Setup](#setup)
  * [NPM](#npm)
* [Getting started](#getting-started)
* [Examples](#examples)
  * [Basic Search](#basic-search)
* [License](#license)
* [Browser Support](#browser-support)

## Setup

### NPM

We currently distribute the `sajari-react` library through npm. Npm is only required for downloading the library. The SDK is made to be used from the browser.

```
npm install --save sajari sajari-react
```

## Getting Started

We recommend that users start with one of our examples (see the `examples` directory).

## Examples

### [Basic search](./examples/basic-search/)

[This example](./examples/basic-search/) showcases a simple web app with instant search.

### [Overlay](./examples/overlay/)

The [Overlay](./examples/overlay/) showcases an overlay interface to search made for inclusion in web pages to get search up and running in the quickest time possible.

# Performing Searches

To perform a search on a collection, you'll need to import a few things:

* `Client`: used to make underlying API calls.
* `Pipeline`: handles pipeline requests/response lifecycle.
* `Values`: key-value pairs used to pass parameters to the search algorithm.

For the mostpart, you'll be using the pre-defined `website` pipeline for searching, which provides a great starting point for website search.

```javascript
import { Client, Tracking } from "sajari";
import { Pipeline, Values } from "sajari-react/controllers";

// Setup your project/collection configuration
const project = "<your-project>";
const collection = "<your-collection>";
const pipelineName = "website";

// Create a client.
const client = new Client(project, collection);

const tracking = new Tracking();
const pipeline = new Pipeline(client, "website");
const values = new Values();

values.set({
  "q": "awesome articles",
  "filter": "category='articles'",
})

// Perform a search
pipeline.search(values, tracking);
```

# Standard UI Components

This library comes with a standard set of components that will be common for most search interfaces.

## Text Input

### AutocompleteInput

AutocompleteInput provides a text-box which performs live searches as the user types and renders appropraite autocomplete suggestions back in the input box.

```javascript
<AutocompleteInput values={values} pipeline={pipeline} />
```

# Building Facets

Use the `Filter` helper-class from `sajari-react/controllers` to integrate facets into UI.  The library provides a standard set of components under `sajari-react/ui/facets` which automatically control/take state from `Filter`, but you can also implement your own.

## Single-select filters

A single-select filter is used to handle state for components that offer multiple filtering options but only allow one option to be enabled at any one time. For example: a drop-down box or group of radio buttons.

```javascript
const categories = new Filter(
  {
    // Name -> Filter to apply
    "all":      "",
    "blog":     "dir1='blog'",     // limit to results with dir1='blog'
    "articles": "dir1='articles'"  // limit to results with dir1='articles'
  },
  // The default value.
  "all"  // default filter will be "".
);
```

Each filter is given a name (in this example: `all`, `blog`, `articles`) which is used to bind them to UI components:

```javascript
import { RadioFacet } from "sajari-react/ui/facets";

<div>
  <h3>Categories</h3>
  <RadioFacet filter={categories} name="all" /><label>All</label>
  <RadioFacet filter={categories} name="blog" /><label>Blog</label>
  <RadioFacet filter={categories} name="articles" /><label>Articles</label>
</div>
```

Or a drop-down select box:

```javascript
import { SelectFacet } from "sajari-react/ui/facets";

<SelectFacet
  filter={categories}
  options={{
    all: "All",
    blog: "Blog",
    articles: "Articles"
  }}
/>
```

## Multi-select filters

A multi-select filter is used to represent state for UI components that can have multiple options selected at once, i.e. a list of check boxes or a multi-select list.

```javascript
const categories = new Filter(
  {
    // Name -> Filter to be applied
    "blog":     "dir1='blog'",     // limit to dir1='blog'
    "articles": "dir1='articles'", // limit to dir1='articles'
    "other":    "dir1!='blog' AND dir1!='articles'", // everything else
  },
  // The default filters to be enabled
  ["blog", "articles"], // default filter will be "dir1='blog' OR dir1='articles'".
  true, // Enable multiple selections.
);
```

So this can be hooked up to a list of check boxes:

```javascript
import { CheckboxFacet } from "sajari-react/ui/facets";

<div>
  <h3>Categories</h3>
  <CheckboxFacet filter={categories} name="blog" /><label>Blog</label>
  <CheckboxFacet filter={categories} name="articles" /><label>Articles</label>
  <CheckboxFacet filter={categories} name="other" /><label>Other</label>
</div>
```

The default operator used to combine selected filters is `OR`, but this can be overriden by the last argument in the `Filter` construtor.  See the full class docs for more details.

## Listening for changes

To listen for changes in the filter state (for instance to trigger searches), register listeners:

```javascript
const unregister = filter.listen(() => {
  console.log("filter changed:", filter.get());
});

// sometime later...
unregister();
```

## Combining multiple filters

To combine multiple `Filter` instances into one, use the `CombineFilters` function.

```javascript
// Define recency filter
const recencyFilter = new Filter(...);

// Define category Filter
const categoryFilter = new Filter(...);

// Combine both recency and category filters.
const filter = CombineFilters([recencyFilter, categoryFilter])

// When either recencyFilter or categoryFilter is updated, they trigger
// an event on the combined filter.
const unregister = filter.listen(() => {
  pipeline.search(values, tracking);
});

// sometime later...
unregister();
```

## Including in a Search

To include a filter in a search, it needs to be registered in the `Values` object:

```javascript
import { Values, Filter } from "sajari-react/controllers";

// Create filter.
const categories = new Filter(...);

// Create a values object for use in pipeline searches.
const values = new Values();

// Set the "filter" value to evaluate our `category` filter whenever
// the Values object is evaluated.
values.set({ filter: () => categories.filter() });
```

## License

We use the [MIT license](./LICENSE)

## Browser Support

The browser support is dependent on the React library, which currently supports recent versions of Chrome, Firefox, Sajari, Opera, and IE9+. (17/8/2016)
