const components = [
  'AspectRatio',
  'Button',
  'ButtonGroup',
  'Checkbox',
  'Heading',
  'Image',
  'Radio',
  'Rating',
  'Combobox',
  'Select',
  'Swatch',
  'Text',
  'Tabs',
  'Pagination',
  'PoweredBy',
  'RangeInput',
  'ResizeObserver',
].sort();

const hooks = [
  'useFilter',
  'usePagination',
  'useQuery',
  'useResultsPerPage',
  'useSearch',
  'useSorting',
  'useAutocomplete',
  'useTracking',
  'useVariables',
].sort();

const searchComponents = [
  'Filter',
  'Input',
  'Pagination',
  'Results',
  'ResultsPerPage',
  'Summary',
  'Sorting',
  'ViewType',
].sort();

const tracking = ['NoTracking', 'ClickTracking', 'PosNegTracking'];

export { components, searchComponents, hooks, tracking };
