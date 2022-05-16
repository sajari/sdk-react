export type ParamValue = string | number | boolean | string[] | number[] | boolean[];

export interface UseQueryParamParams {
  callback?: (value: string) => void;
  debounce?: number;
  replace?: boolean;
  defaultValue?: ParamValue;
}
