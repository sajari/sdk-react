# Website Search Integration

This integration is a great starting point for getting Sajari website search running on your site.

## Instructions

We're assuming that you've already setup an account and have a website collection already indexing.  If not then head over to [https://www.sajari.com/console/sign-up](https://www.sajari.com/console/sign-up) to sign up and create a website collection to get started.

In the [Install tab](https://www.sajari.com/console/collections/install) of the Sajari Console, you can create an initial search interface template:

## Configuration

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

Two attributes control which DOM elements the search and results components will be rendered in.

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
	resultsPerPage: "10", // Show 10 results per page.
},
```

### Tab filters

Create tabs to filter search results.  Tabs are rendered in UI component when search results are shown.  If a tab is clicked then the algorithm parameter `filter` is set to the tab;s `filter` attribute.

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
