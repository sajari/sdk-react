const coreComponents = [
  'Button',
  'ButtonGroup',
  'Checkbox',
  'Image',
  'Radio',
  'Rating',
  'Combobox',
  'Select',
  'Swatch',
  'Text',
  'Tabs',
  'Pagination',
  'Heading',
  'RangeInput',
].sort();
const searchComponents = [
  'PoweredBy',
  'Filter',
  'Input',
  'PageSize',
  'Pagination',
  'Result',
  'Results',
  'Sorting',
  'ViewType',
].sort();
const hooks = ['useFilter', 'usePageSize', 'usePagination', 'useQuery', 'useSearch', 'useSorting'].sort();

export { coreComponents, searchComponents, hooks };
