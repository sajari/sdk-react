export default {
  common: {
    result: 'Result',
    results: 'Results',
    loading: 'Loading',
    error: 'Error',
  },
  errors: {
    authorization: 'Authorization for this request failed. Please try again.',
    connection: 'Please check your network connection and try again.',
    generic: 'Something went wrong. Please try again.',
  },
  filter: {
    reset: 'Reset',
    all: 'All',
    showMore: 'Show {{count}} more',
    showLess: 'Show less',
  },
  input: {
    placeholder: 'Search',
  },
  resultsPerPage: {
    label: 'Show',
  },
  pagination: {
    label: 'Pagination',
    previous: 'Previous',
    next: 'Next',
    page: 'Page {{page}}',
    current: 'Page {{page}}, current page',
  },
  results: {
    empty: {
      title: 'No results',
      body: 'No matches were found for "{{query}}".',
    },
  },
  sorting: {
    label: 'Sort',
  },
  summary: {
    results: '{{count}} {{object}} for "{{query}}"',
    latency: '({{time}} secs)',
    alternative: 'Search instead for',
  },
  viewType: {
    label: 'View',
    grid: 'Grid',
    list: 'List',
  },
};
