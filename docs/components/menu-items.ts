// Pin !important items to the top of the menu since they're ... important
const comparer = (a: string, b: string) => {
  if (a.toLowerCase().startsWith('!')) {
    return -1;
  }

  return a.localeCompare(b);
};

const components = [
  'AspectRatio',
  'Button',
  'ButtonGroup',
  'Checkbox',
  'Combobox',
  'Heading',
  'Image',
  'Pagination',
  'PoweredBy',
  'Radio',
  'Modal',
  'RangeInput',
  'Rating',
  'ResizeObserver',
  'Select',
  'Swatch',
  'Tabs',
  'Text',
].sort(comparer);

const hooks = [
  '!SearchProvider',
  'SyncStateQueryParams',
  'useAutocomplete',
  'useFilter',
  'useRangeFilter',
  'usePagination',
  'useQuery',
  'useResultsPerPage',
  'useSearch',
  'useSearchContext',
  'useSorting',
  'useTracking',
  'useVariables',
].sort(comparer);

const searchComponents = [
  '!SearchProvider',
  'Filter',
  'Input',
  'Pagination',
  'Results',
  'ResultsPerPage',
  'Summary',
  'Sorting',
  'ViewType',
].sort(comparer);

const classes = [
  'FieldDictionary',
  'FilterBuilder',
  'Pipeline',
  'RangeFilterBuilder',
  'Response',
  'Variables',
  'Config',
  'PosNegLocalStorageManager',
].sort();

const tracking = ['ClickTracking', 'PosNegTracking', 'Advanced'];

export { classes, components, searchComponents, hooks, tracking };
