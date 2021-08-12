export type Locale = {
  common: {
    /** Shown in Summary component e.g 1 result for "television"  */
    result: string;
    /** Shown in Summary component e.g 4 results for "television"  */
    results: string;
    /** Shown when query is empty e.g 4 item  */
    item: string;
    /** Shown when query is empty e.g 4 items */
    items: string;
    /** Shown when performing search */
    loading: string;
    /** Fallback error title when no specific error title is found */
    error: string;
  };
  errors: {
    /** Shown when a search request can't be made due to incorrect pipeline or domain configuration */
    authorization: string;
    /** Shown when there is no network connection */
    connection: string;
    /** Shown when there is an error parsing the result template */
    template: {
      title: string;
      body: string;
    };
    /** Fallback error message when no specific error message is found */
    generic: string;
  };
  filter: {
    /** Shown in TabFilter component as the first tab */
    all: string;
    /** Shown when formatting price */
    rangeOver: string;
    /** Shown when formatting price */
    rangeUnder: string;
    /** Shown as the reset button of a filter */
    reset: string;
    /** Used in SelectFilter, shown as a placeholder when no item is selected */
    select: string;
    /** Used in SelectFilter, show how many items are selected (>= 2) */
    selected: string;
    /** Text to indicate collapsing the filter list */
    showLess: string;
    /** Text to indicate expanding the filter list */
    showMore: string;
    /** Text in button to show filters sidebar  */
    show: string;
    /** Text in button to hide filters sidebar  */
    hide: string;
  };
  input: {
    /** Placeholder for search input */
    placeholder: string;
  };
  resultsPerPage: {
    /** Used in the ResultsPerPage component */
    label: string;
  };
  pagination: {
    /** Used in the Pagination component */
    label: string;
    /** Text used as label for the previous page button */
    previous: string;
    /** Text used as label for the next page button */
    next: string;
    /** Text used as label for a page button */
    page: string;
    /** Text used as label for the current page button */
    current: string;
  };
  results: {
    empty: {
      /** Title shown when no results are found */
      title: string;
      /** Message shown when no results are found */
      body: string;
    };
  };
  result: {
    status: {
      /** The text to show when an product is on sale */
      onSale: string;
      /** The text to show when an product is out of stock */
      outOfStock: string;
      /** The text to show when an product is a new product (within 30 days) */
      newArrival: string;
    };
    /** Label for product's preview image container */
    previewImagesContainer: string;
    /** Label for product's preview image */
    previewImage: string;
  };
  sorting: {
    /** Used in the Sorting component */
    label: string;
    /** "Most Relevant" option */
    mostRelevantOption: string;
  };
  summary: {
    /** The full sentence: {{count}} {{object}} for "{{query}}" */
    results: string;
    /** The full sentence: {{count}} {{object}}  */
    noQueryResults: string;
    /** In seconds */
    latency: string;
    /** Used when completion is enabled in Summary component, the full sentence: Search instead for "{{completion}}" */
    alternative: string;
  };
  viewType: {
    /** Label for ViewType component */
    label: string;
    /** Grid view type */
    grid: string;
    /** List view type */
    list: string;
  };
};
