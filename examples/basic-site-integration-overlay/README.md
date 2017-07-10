# Website Search Interfaces

This repository is used in the [Console](https://www.sajari.com/console/collections/install) to auto-generate search interfaces for website integrations.

Our auto-generated search interfaces are a great starting point for getting Sajari website search running on your site.

## Instructions

We're assuming you've already setup an account and have a website collection already indexing. If not then head over to [https://www.sajari.com/console/sign-up](https://www.sajari.com/console/sign-up) to sign up and create a website collection to get started.

From the [Install tab](https://www.sajari.com/console/collections/install) you can generate a search interface which can be easily copy+pasted into your site.  It's easy to add further customisations using CSS (see [Styling](#styling)), or by changing the JSON config (see [Configuration](#configuration)).

![Search interface with tabs](https://cloud.githubusercontent.com/assets/2822/25603841/e50022d4-2f42-11e7-9ac0-3968714b9e1d.png)

The configuration required for this example is given below.  For more details, see [Configuration](#configuration).

```javascript
{
  "project": "your-project",
  "collection": "your-collection",
  "searchBoxPlaceHolder": "Search",
  "attachSearchBox": document.getElementById("search-box"),
  "attachSearchResponse": document.getElementById("search-response"),
  "pipeline": "website",
  "tabFilters": {
    "defaultTab": "All",
    "tabs": [
      {"title": "All", "filter": ""},
      {"title": "Blog", "filter": "dir1='blog'"}
    ]
  },
  "results": {
    "showImages": false
  },
  "values": {
    "resultsPerPage": "10"
  },
  "initialValues": {
    "q": getUrlParam("q")
  },
  "overlay": false
}
```

## Styling

The generated interface can be easily styled to fit your website's look and feel, it's also designed to be responsive by default.

Here are a few examples of common css changes.


### Brand colors

Set the color of links and tabs and set a font. Source: [orange.css](./sample-styles/orange.css)

![Orange](./sample-styles/orange.png)

### Brand image and colors, hiding elements

Set a brand image and color and fonts. Hide links. Source: [light.css](./sample-styles/light.css)

![Light](./sample-styles/light.png)

### Responsive layout with brand image.

Set up a layout to work better on smaller screens. Source: [sajari.css](./sample-styles/sajari.css)

![Sajari](./sample-styles/sajari.png)

## Configuration

The generated search interfaces are configured using a simple JSON object, which contains attributes to control:

* [Project/Collection](#projectcollection)
* [Pipeline](#pipeline)
* [Attaching to the DOM](#attaching-to-the-dom)
* [Result Config](#result-config)
* [Search box place holder text](#search-box-placeholder-text)
* [Algorithm parameters](#algorithm-parameters)
* [Initial Values](#initial-values)
* [Tab filters](#tab-filters)

You'll find the configuration object in the snippet generated from the [install page](https://www.sajari.com/console/collections/install).

### Project/Collection

The `project` and `collection` attributes set which project/collection combo to query.  These can be found in the Console.

```javascript
project: "your-project",
collection: "your-collection",
```

### Pipeline

Pipeline sets the query pipeline to use for the search interface.  The default pipeline for website search is `website`.

```javascript
pipeline: "website",
```

### Attaching to the DOM

The interface can be displayed in two ways, in page or as an overlay.

To display in page, set the `attachSearchBox` and `attachSearchResponse` values.
These two attributes control which DOM elements the search box and results components will be rendered in.

```javascript
attachSearchBox: document.getElementById("search-box"),
attachSearchResponse: document.getElementById("search-response"),
```

To display as an overlay, set the `overlay` value.

```javascript
overlay: true
```

To open the overlay, call the show method from javascript.

```javascript
window._sjui.overlay.show();
```

For example, launching the overlay when a button is clicked

```html
<button onclick="window._sjui.overlay.show()">Search</button>
```

### Result Config

Result config allows you to modify the result rendering.

Show images next to search results.

```javascript
results: {
  showImages: false
},
```

### Search box placeholder text

Set the placeholder text in the search box.

```javascript
searchBoxPlaceHolder: "Search",
```

### Algorithm Parameters

The standard website pipeline defines several algorithm parameters. For example, `resultsPerPage`.

```javascript
values: {
   resultsPerPage: "10", // Show 10 results per page.
},
```

### Initial Values

These values described in this section are only added to the value map when the app starts.
If the overlay is closed or the query is cleared, these values will be removed.

```javascript
initialValues: {
  q: getUrlParam("q") // The initial search query will be the value of the query param "q".
}
```

### Tab filters

Create tabs to filter search results.  Tabs are rendered in a UI component when search results are shown.  If a tab is clicked then the algorithm parameter `filter` is set to the tab's `filter` attribute.

```javascript
tabFilters: {
   defaultTab: "All", // The title of the default tab.
   tabs: [
      {title: "All", filter: ""},
      {title: "Blog", filter: "dir1='blog'"}, // First directory in URL is 'blog'.
      {title: "Not Blog", filter: "dir1!='blog'"} // First directory in URL is not 'blog'.
   ],
}
```

#### Constructing Filters

Our crawler extracts common fields when it parses web pages (such as the first and second directories of URLs), which make filtering much easier.  It's well worth taking a look at all the extracted fields before you start building filters, as most use cases are quick and easy to get running.

Here is a list of the most commonly used fields.

* `title` The page title.
* `description` The page description.
* `image` The URL of an image which corresponds to the page.

Fields that are based on the URL of the page (ideal for filtering on subsections of a site) are given below.  Examples here assume that the page URL is `https://www.sajari.com/blog/year-in-review`:

* `url` The full page URL: `https://www.sajari.com/blog/year-in-review`
* `dir1` The first directory of the page URL: `blog`
* `dir2` The second directory of the page URL: `year-in-review`
* `domain` The domain of the page URL: `www.sajari.com`


#### Using Operators

When querying a field, there are a few operators that can be used. Note, all values must be enclosed in single quotation marks, i.e. "field *boost* must be greater than 10" is written as `boost>'10'`.

| Operator | Description | Example |
| --- | --- | --- |
| Equal To (`=`) | Field is equal to a value (*numeric* or *string*) | `dir1='blog'` |
| Not Equal To (`!=`) | Field is not equal to a value (*numeric* or *string*) | `dir1!='blog'` |
| Greater Than (`>`) | Field is greater than a *numeric* value | `boost>'10'` |
| Greater Than Or Equal To (`>=`) | Field is greater than or equal to a *numeric* value | `boost>='10'` |
| Less Than (`<`) | Field is less than a given *numeric* value | `boost<'50'` |
| Less Than Or Equal To (`<=`) | Field is less than or equal to a given *numeric* value | `boost<'50'` |
| Begins With (`^`) | Field begins with a *string* | `dir1^'bl'` |
| Ends With (`$`) | Field ends with a *string* | `dir1$'og'` |
| Contains (`~`) | Field contains a *string* | `dir1~'blog'` |
| Does Not Contain (`!~`) | Field does not contain a *string* | `dir1!~'blog'` |

### OnReady

Often you'll want to perform actions once the search interface has been initialised. For this, the `onReady` value in the config map can be used. The function you provide will be called once the search interface initialisation stage is complete.

```javascript
onReady: function onReady() { console.log("Done!"); }
```

### State

The state of the interface is exposed through the `window._sjui.state` object. It is available once the search interface has been initialised. Use the [OnReady](#onready) method to be nofitied when the state object is available.

#### Listeners

To hook into events happening in the interface, push your callback onto the `listeners` array. When an event happens your callback will be called with the type of the event and the event data if there is any.

```javascript
var onEvent = function onEvent(event, data) {
  console.log("Received event", event, "with data", data);
}
state.listeners.push(onEvent);
```

#### SetValues

To set values in the state, use the `setValues` method. It takes a object containing values to set and a boolean of whether to perform a search.

```javascript
state.setValues({ q: "faq" }, true);
```

#### GetValues

To get values in state such as the `q` parameter, call the `getValues` method.

```javascript
var values = state.getValues();
```

#### GetResults

To get results from the search, call the `getResults` method.

```javascript
var results = state.getResults();
```

#### GetError

To get the error from the search, call the `getError` method.

```javascript
var error = state.getError();
```

#### GetResponseValues

To get values in the response such as autocomplete values, call the `getResponseValues` method.

```javascript
var responseValues = state.getResponseValues();
```

