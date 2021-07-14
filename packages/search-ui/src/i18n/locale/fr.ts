export default {
  common: {
    result: 'Result',
    results: 'Results',
    items: 'Éléments',
    item: 'Item',
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
    reset: 'Réinitialiser',
    select: 'Select a filter',
    selected: '{{count}} filters selected',
    showLess: 'Show less',
    showMore: 'Montre plus',
  },
  input: {
    placeholder: 'Search',
  },
  resultsPerPage: {
    label: 'Résultats',
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
      title: 'Aucun résultat',
      body: 'Aucune correspondance n\'a été trouvée pour "{{query}}".',
    },
  },
  result: {
    previewImagesContainer: "{{product}}'s images",
    previewImage: '{{product}} image number {{number}}',
  },
  sorting: {
    label: 'Sorte',
  },
  summary: {
    results: '{{count}} {{object}} pour "{{query}}"',
    noQueryResults: '{{count}} {{object}}',
    latency: '({{time}} secs)',
    alternative: 'Search instead for',
  },
  viewType: {
    label: 'Vue',
    grid: 'Grid',
    list: 'List',
  },
};
