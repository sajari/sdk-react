# Sajari React SDK

![npm version](https://img.shields.io/npm/v/sajari-react.svg?style=flat-square) ![license](http://img.shields.io/badge/license-MIT-green.svg?style=flat-square)

**sajari-react** is a client side javascript library of React Components for the [Sajari](https://www.sajari.com) search platform to help build fast and powerful search interfaces.

React provides a simple and elegant way to structure user interfaces. The Sajari React SDK provides a way to seamlessly integrate the Sajari platform into any web-based app through the use of easily composable Components.

We also provide a vanilla Sajari JS library [here](https://github.com/sajari/sajari-sdk-js/).

<img width="1060" alt="screen shot 2017-07-26 at 8 42 16 pm" src="https://user-images.githubusercontent.com/2822/28617328-4ce241aa-7243-11e7-8d0e-47fdde1867e6.png">

# Table of contents

* [Examples](#examples)
* [Setup](#setup)
  * [NPM](#npm)
* [Getting started](#getting-started)
* [License](#license)
* [Browser Support](#browser-support)

# Examples

It's easy to get up and running using one of our examples as a starting point.  They're pre-configured with all the correct dependencies, so all you need to do is copy the example directory into your own workspace and you're on your way!

* [Autocomplete](./examples/autocomplete-only/): search box with autocomplete.
* [Autocomplete with suggestions](./examples/autocomplete-suggest/): search box with autocomplete + suggestions.
* [Simple search](./examples/simple-search/): instant search with autocomplete.
* [Standard search](./examples/standard-search/): instant search with autocomplete + tab filtering.
* [Custom result renderer](./examples/custom-result-renderer/): instant search with autocomplete + custom result renderers.
* [Radio/checkbox](./examples/radio-checkbox/): radio/checkbox filtering.
* [Aggregate](./examples/aggregate/): aggregate filtering.

# Setup

Check out our [examples](./examples) for the best way to get started.

If you want to add the SDK to an existing project, or want to start from scratch, then you can get `sajari-react` using NPM.

### NPM

We currently distribute the `sajari-react` library through NPM. NPM is only required for downloading the library. The SDK is made to be used from the browser.

```shell
$ npm install --save sajari sajari-react
```

# Quick reference

This library includes a standard set of components for building search interfaces.

### Setting up API calls

Before you can use any components, you'll need to initialise a [`Pipeline`](#using-pipeline) and [`Values`](#using-values) parameter mapping for handling search requests to the API:

```javascript
import { Pipeline, Values } from "sajari-react/controllers";

// Create a pipeline for running searches.
const pipeline = new Pipeline("<your-project>", "<your-collection>", "website");

// Pipeline parameters are defined in values.
const values = new Values();
values.set({
  "q": "awesome articles",
  "filter": "category='articles'",
})

// Perform a search.
pipeline.search(values);
```

## AutocompleteInput

![autocomplete](https://media.giphy.com/media/26zyVB5UcumOfOInu/giphy.gif)

`AutocompleteInput` provides a text-box which performs searches as the user types and renders appropraite autocomplete suggestions back in the input box.

```javascript
import { AutocompleteInput } from "sajari-react/ui/text";

<AutocompleteInput values={values} pipeline={pipeline} />
```

## Input

`Input` is a plain search box which does not show autocomplete suggestions.

```javascript
import { Input } from "sajari-react/ui/text";

<Input values={values} pipeline={pipeline} />
```

## Building facets

Use the `Filter` helper-class from `sajari-react/controllers` to integrate facets into UI.  The library provides a standard set of components under `sajari-react/ui/facets` which can automatically bind state to `Filter` instances.  For more details, see the [full documentation](./src/controllers/filter.js).

### Single-select filters

A single-select filter is used to handle state for components that offer multiple filtering options but only allow one option to be enabled at any one time. For example: a drop-down box or group of radio buttons.

```javascript
import { Filter } from "sajari-react/controllers";

const categories = new Filter(
  {
    // Options: Name -> Filter
    "all":      "",
    "blog":     "dir1='blog'",     // limit to results with dir1='blog'
    "articles": "dir1='articles'"  // limit to results with dir1='articles'
  },
  // The default option.
  "all"
);
```

Each filter is given a name (in this example: `all`, `blog`, `articles`) which can then be used to bind them to UI components:

<img width="136" alt="screen shot 2017-07-31 at 11 44 33 am" src="https://user-images.githubusercontent.com/2822/28759899-b1da1c36-75e5-11e7-969c-ab865642ea78.png">

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

<img width="90" alt="screen shot 2017-07-31 at 11 46 57 am" src="https://user-images.githubusercontent.com/2822/28759924-03bbcff4-75e6-11e7-95eb-770bf36ee2f1.png">

```javascript
import { SelectFacet } from "sajari-react/ui/facets";

<SelectFacet
  filter={categories}
  options={{
    // Options: Name -> Display Name
    all: "All",
    blog: "Blog",
    articles: "Articles"
  }}
/>
```

To include the filter in a search it needs to be attached to the `Values` instance used by `Pipeline`:

```javascript
import { selectionUpdatedEvent } from "sajari-react/controllers";

// Add the filter to `values`.  Note category.filter() will be
// evaluated every time `values` is used in `pipeline.search`.
values.set({ filter: () => categories.filter() }); 

// Trigger a search every time the filter selection changes.
categories.listen(selectionUpdatedEvent, () => pipeline.search(values));
```

## Multi-select filters

A multi-select filter is used to represent state for UI components that can have multiple options selected at once, i.e. a list of check boxes or a multi-select list.

```javascript
const categories = new Filter(
  {
    // Options: Name -> Filter
    "blog":     "dir1='blog'",     // limit to dir1='blog'
    "articles": "dir1='articles'", // limit to dir1='articles'
    "other":    "dir1!='blog' AND dir1!='articles'", // everything else
  },
  // The default filters to be enabled
  ["blog", "articles"], // default filter will be "dir1='blog' OR dir1='articles'"
  true, // Allow multiple selections
);
```

This can be hooked up to a list of checkboxes:

<img width="140" alt="screen shot 2017-07-31 at 11 42 16 am" src="https://user-images.githubusercontent.com/2822/28759868-5bf0ac7c-75e5-11e7-8a52-ceb190be7279.png">

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

To include the filter in a search it needs to be attached to the `Values` instance used by `Pipeline`:

```javascript
import { selectionUpdatedEvent } from "sajari-react/controllers";

// Add the filter to `values`.  Note category.filter() will be
// evaluated every time `values` is used in `pipeline.search`.
values.set({ filter: () => categories.filter() }); 

// Trigger a search every time the filter selection changes.
categories.listen(selectionUpdatedEvent, () => pipeline.search(values));
```

### Tidying up filter listeners

The `listen` method returns a closure that will unregister the new listener:

```javascript
const unregister = filter.listen(selectionUpdatedEvent, () => {
  console.log("filter changed:", filter.filter());
});

// sometime later...
unregister();
```

### Combining multiple filters

To combine multiple `Filter` instances into one, use the `CombineFilters` function.

```javascript
import { selectionUpdatedEvent } from "sajari-react/controllers";

// Define recency filter...
const recencyFilter = new Filter(...);

// Define category Filter...
const categoryFilter = new Filter(...);

// Combine both recency and category filters.
const filter = CombineFilters([recencyFilter, categoryFilter])

// Set value to evaluate filter every time it is used.
values.set({ filter: () => filter.filter() })

// When either recencyFilter or categoryFilter is updated, they trigger
// an event on the combined filter.
const unregister = filter.listen(selectionUpdatedEvent, () => {
  pipeline.search(values);
});

// Sometime later...
unregister();
```

## Using `Values`

The `Values` controller is used to manage parameters for running searches.

```javascript
import { Values } from "sajari-react/controllers";

const values = new Values();
```

### Setting values

Use to the `set` method to set values in an instance of `Values`:

```javascript
values.set({ "q": "search query" });
```

It's also possible to assign closures to value keys, these will be evaluated whenever `Values.get()` is called (i.e. from within `pipeline.search(values)`).

```javascript
values.set({ hello: () => "Hello" })
```

### Listening for changes

Register listeners to be notified of changes to a `Values` instance:

```javascript
import { valuesUpdatedEvent } from "sajari-react/controllers";

const unregister = values.listen(valuesUpdatedEvent, () => {
  console.log("values: ", values.get());
});

// Sometime later...
unregister();
```

Note: this event is only triggered by calls to `Values.set`.

## Using `Pipeline`

The `Pipeline` controller handles all the search request/response lifecycle.

```javascript
import { Pipeline } from "sajari-react/controllers";

const pipeline = new Pipeline("<your-project>", "<your-collection>", "website");
```

### Performing searches

To perform a search you need to first setup a [`Values`](#using-values) instance to handle the search parameters.

```javascript
import { Values } from "sajari-react/controllers";

const values = new Values();
values.set({
  q: "search keywords",
  filter: "dir1='articles'"
});

pipeline.search(values);
```

### Listening for responses

Register listeners to be notified when search responses come back from the server, or are cleared by UI events.  Every listener is passed a `Response` which wraps the server response with convenience methods:

* `isEmpty()`: returns `true` if the response is empty (i.e. as a result of a call to `Pipeline.clearResponse()`)
* `isError()`: returns `true` if the response is an error response.
* `getError()`: returns the underlying error.
* `getResponse()`: returns the full search response.
* `getResults()`: returns the search results from the response.
* `getTotalResults()`: returns the total results found.
* `getTime()`: returns the total query time.
* `getAggregates()`: returns aggregate data attached to response.

```javascript
import { responseUpdatedEvent } from "sajari-react/controllers";

const unregister = pipeline.listen(responseUpdatedEvent, (response) => {
  if (response.isEmpty()) {
    // Empty response, could have been cleared via pipeline.clearResponse()
    console.log("empty response");
    return;
  }

  if (response.isError()) {
    // Error response, normally due to incorrect project/collection/pipeline
    // or transient errors contacting the server.
    console.error("error response:", response.getError());
    return;
  }

  response.getResults().forEach((result) => {
    console.log(result);
  })
});
```

# License

We use the [MIT license](./LICENSE)

# Browser support

The browser support is dependent on the React library, which currently supports recent versions of Chrome, Firefox, Sajari, Opera, and IE9+. (17/8/2016)
