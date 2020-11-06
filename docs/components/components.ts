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
const hooks = ['useFilter', 'usePageSize', 'usePagination', 'useQuery', 'useSearch', 'useSorting'].sort();

export { coreComponents, searchComponents, hooks };
