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

# Standard Components

This library comes with a standard set of components that will be common for most search interfaces.

## Text Input

### AutocompleteInput

AutocompleteInput provides a text-box which performs live searches as the user types, and also puts autocomplete.

```javascript
<AutocompleteInput values={values} pipeline={pipeline} />
```

| Prop       | Type   | Required | Default     | Description                                       |
| :--        | :-:    | :-:      | :-:         | :--                                               |
| values    | Values | Yes      | N/A        | The values object for the pipeline request.                          |
| pipeline | Pipeline | Yes      | N/A        | The Pipeline object.                       |
| qParam  | string | No       | `q` | The value to set in the pipeline |
| qOverrideParam  | string | No       | `q.override` | The value to set in the pipeline for overriding autocomplete |

### 

# Building Facets

We have built a few helper types to make it quick and easy to get started with facets.

## SingleFacet

A `singleFacet` is used to model a component that can select only one option from a list, i.e. a drop-down box, or group of radio buttons.  For each available option it will set a filter to be added to search requests.

```javascript
const categories = new singleFacet(
  {
    // Name -> Filter
    "all":      "",
    "blog":     "dir1='blog'",     // limit to dir1='blog'
    "articles": "dir1='articles'"  // limit to dir1='articles'
  },
  "all" // The default value
);
```

### Connecting to UI

This can be translated into a group of radio buttons:

```javascript
import RadioFacet from "sajari-react/ui/facets";

<div>
  <h3>Categories</h3>
  <RadioFacet fb={categories} name="all" /><label>All</label>
  <RadioFacet fb={categories} name="blog" /><label>Blog</label>
  <RadioFacet fb={categories} name="articles" /><label>Articles</label>
</div>
```

Or a drop-down select box:

```javascript
// TODO
```

### Including as a Filter

## MultiFacet

A `multiFacet` is used to model a component that can have multiple options selected at once, i.e. a list of check boxes.  For each enabled option it will include a filter.

```javascript
const categories = new multiFacet(
  {
    // Name -> Filter
    "blog":     "dir1='blog'",     // limit to dir1='blog'
    "articles": "dir1='articles'", // limit to dir1='articles'
    "other":    "dir1!='blog' AND dir1!='articles'", // everything else
  },
  ["blog", "articles", "other"] // The default values
);
```

So this can be hooked up to a list of check boxes:

```javascript
import CheckboxFacet from "sajari-react/ui/facets";

<div>
  <h3>Categories</h3>
  <CheckboxFacet fb={categories} name="blog" /><label>Blog</label>
  <CheckboxFacet fb={categories} name="articles" /><label>Articles</label>
  <CheckboxFacet fb={categories} name="other" /><label>Other</label>
</div>
```

## License

We use the [MIT license](./LICENSE)

## Browser Support

The browser support is dependent on the React library, which currently supports recent versions of Chrome, Firefox, Sajari, Opera, and IE9+. (17/8/2016)
