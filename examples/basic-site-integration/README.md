# Website Search Interfaces

This example is used in the [Console](https://www.sajari.com/console/collections/install) to auto-generate search interfaces for website integrations.

Our auto-generated search interfaces are a great starting point for getting Sajari website search running on your site.

## Instructions

We're assuming you've already setup an account and have a website collection already indexing.  If not then head over to [https://www.sajari.com/console/sign-up](https://www.sajari.com/console/sign-up) to sign up and create a website collection to get started.

From the [Install tab](https://www.sajari.com/console/collections/install) you can generate a search interface which can be easily cut+pasted into your site.  You can also quickly add further customisations using CSS or by changing the JSON config.  For instance, you can add tabs to limit searches to specific areas of your website:

![Search interface with tabs](https://cloud.githubusercontent.com/assets/2822/25603841/e50022d4-2f42-11e7-9ac0-3968714b9e1d.png)

The configuration required for this example is given below.  For more details, see [Configuration](#configuration).

```javascript
{
   "project": "sajariptyltd",
   "collection": "sajari-com",
   "searchBoxPlaceHolder": "Search",
   "attachTarget": document.getElementById("search-interface"), // Attach to DIV with id search-interface
   "pipeline": "website",
   "tabFilters": {
      "defaultTab": "All",
      "tabs": [
         {"title": "All", "filter": ""},
         {"title": "Blog", "filter": "dir1='blog'"}
      ]
   },
   "showImages": false,
   "values": {
      "resultsPerPage": "10",
      "q": getUrlParam("q"),
   },
}
```

## Configuration

The generated search interfaces are configured using a simple JSON object, which contains attributes to control:

* [Project/Collection](#projectcollection)
* [Pipeline](#pipeline)
* [Attaching to the DOM](#attaching-to-the-dom)
* [Show images](#show-images)
* [Search box place holder text](#search-box-placeholder-text)
* [Algorithm parameters](#algorithm-parameters)
* [Tab filters](#tab-filters)

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

Two attributes control which DOM elements the search box and results components will be rendered in.

```javascript
attachSearchBox: document.getElementById("search-box"),
attachSearchResponse: document.getElementById("search-response"),
```

### Show Images

Show images next to search results.

```javascript
showImages: true|false,
```

### Search box placeholder text

Set the placeholder text in the search box.

```javascript
searchBoxPlaceHolder: "Search",
```

### Algorithm Parameters

The standard website pipeline defines several algorithm parameters.

```javascript
values: {
   q: getUrlParam("q"),  // Takes the initial query from the query param q.
   resultsPerPage: "10", // Shgow 10 results per pae.
},
```

### Tab filters

Create tabs to filter search results.  Tabs are rendered in a UI component when search results are shown.  If a tab is clicked then the algorithm parameter `filter` is set to the tab's `filter` attribute.

```javascript
tabFilters: {
   defaultTab: "All", // The title of the default tab.
   tabs: [
      {title: "All", filter: ""}, // The default tab must have an empty filter.
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

Fields that are based on the URL of the page (ideal for filtering on subsections of a site) are given below.  Examples here assume that the page URL is `https://www.sajari.com/blog`:

* `url` The full page URL, i.e. `https://www.sajari.com/blog`
* `dir1` The first directory of the page URL, i.e. blog if the URL is `https://www.sajari.com/blog/year-in-review`
* `dir2` The second directory of the page URL, i.e. year-in-review if the URL is `https://www.sajari.com/blog/year-in-review`
* `domain` The domain of the page URL, i.e. `www.sajari.com`


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
| Ends With (`$`) | Field begins with a *string* | `dir1$'bl'` |
| Contains (`~`) | Field contains a *string* | `dir1~'blog'` |
| Does Not Contain (`!~`) | Field does not contain a *string* | `dir1!~'blog'` |
