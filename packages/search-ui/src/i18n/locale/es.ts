export default {
  common: {
    result: 'Result',
    results: 'Results',
    items: 'Artículos',
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
    reset: 'Reiniciar',
    select: 'Select a filter',
    selected: '{{count}} filters selected',
    showLess: 'Show less',
    showMore: 'Mostrar más',
  },
  input: {
    placeholder: 'Search',
  },
  resultsPerPage: {
    label: 'Resultados',
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
      title: 'No hay resultados',
      body: 'No se encontraron coincidencias para "{{query}}".',
    },
  },
  result: {
    previewImagesContainer: "{{product}}'s images",
    previewImage: '{{product}} image number {{number}}',
  },
  sorting: {
    label: 'Clasificar',
  },
  summary: {
    results: '{{count}} {{object}} para "{{query}}"',
    noQueryResults: '{{count}} {{object}}',
    latency: '({{time}} secs)',
    alternative: 'Search instead for',
  },
  viewType: {
    label: 'Vista',
    grid: 'Grid',
    list: 'List',
  },
};
