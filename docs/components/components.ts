const coreComponents = [
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
const searchComponents = [
  'Filter',
  'Input',
  'PageSize',
  'Pagination',
  'Results',
  'Summary',
  'Sorting',
  'ViewType',
].sort();
const hooks = [
  'useFilter',
  'usePageSize',
  'usePagination',
  'useQuery',
  'useSearch',
  'useSorting',
  'useAutocomplete',
  'useTracking',
  'useVariables',
].sort();
const tracking = ['NoTracking', 'ClickTracking', 'PosNegTracking'];

export { coreComponents, searchComponents, hooks, tracking };
