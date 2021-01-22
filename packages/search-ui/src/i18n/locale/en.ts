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
    all: 'All',
    rangeOver: 'Over {{value}}',
    rangeUnder: 'Under {{value}}',
    reset: 'Reset',
    select: 'Select a filter',
    selected: '{{count}} filters selected',
    showLess: 'Show less',
    showMore: 'Show more',
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
