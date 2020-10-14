const coreComponents = [
  'Button',
  'ButtonGroup',
  'Checkbox',
  'Image',
  'Radio',
  'Rating',
  'Select',
  'Swatch',
  'Text',
  'TextInput',
  'Tabs',
  'Pagination',
].sort();
const searchComponents = [
  'PoweredBy',
  'Filter',
  'PageSize',
  'Pagination',
  'Result',
  'Results',
  'SearchInput',
  'Sorting',
  'ViewType',
].sort();
const hooks = ['useFilter', 'usePageSize', 'usePagination', 'useQuery', 'useSorting'].sort();

export { coreComponents, searchComponents, hooks };
