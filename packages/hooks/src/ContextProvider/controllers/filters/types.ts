export type OptionsFn = () => string;
export type Options = Record<string, string | OptionsFn>;
export type JoinOperator = 'OR' | 'AND';

export interface FilterOptions {
  /** The name of the filter. This should be unique as it will be used as a key of useFilter hook */
  name: string;
  /** The group for the filter used for array matching */
  group?: string;
  /** Dictionary of name -> filter pairs */
  options?: Options;
  /** List of initially selected items */
  initial?: string | string[];
  /** Map to a field which aims to perform a count aggregate */
  count?: boolean;
  /** A field in schema, used if count = true */
  field?: string;
  /** Whether the response of the field is an array. This setting is only applicable if count is set */
  array?: boolean;
  /** Multiple selections allowed */
  multi?: boolean;
  /** Join operator used if multi = true */
  joinOperator?: 'OR' | 'AND';
}

export type Range = [number, number];

export interface RangeFilterOptions {
  /** The name of the filter. This should be unique as it will be used as a key of useRangeFilter hook */
  name: string;
  /** The group for the filter used for array matching */
  group?: string;
  /** A field in schema, used to perform the filter */
  field: string;
  /** The intial value for the range filter */
  initial?: Range | null;
  /** The min value of the filter */
  min?: number;
  /** The max value of the filter */
  max?: number;
  /** The step to increment values */
  step?: number;
  /** If true, set value for min and max from the backend response */
  aggregate?: boolean;
  /** The function to format the range. For example, format [0.1, 5.5] to [0, 6] */
  formatter?: (value: Range) => Range;
}
