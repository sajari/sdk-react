export type OptionsFn = () => string;
export type Options = Record<string, string | OptionsFn>;
export type JoinOperator = 'OR' | 'AND';

export interface FilterOptions {
  /** The name of the filter. This should be unique as it will be used as a key of useFilter hook */
  name: string;
  /** Dictionary of name -> filter pairs */
  options?: Options;
  /** List of initially selected items */
  initial?: string | string[];
  /** Map to a field which aims to perform a count aggregate */
  count?: boolean;
  /** A field in schema, used if count = true */
  field?: string;
  /** Whether the response of the field is an array. This setting is only applicable if count is set */
  repeated?: boolean;
  /** Multiple selections allowed */
  multi?: boolean;
  /** Join operator used if multi = true */
  joinOperator?: 'OR' | 'AND';
}
