import { FilterBuilder, ParamValue, RangeFilterBuilder } from '@sajari/react-hooks';

export interface FilterWatcherProps {
  filter: FilterBuilder;
  delay?: number;
  replace?: boolean;
}

export interface RangeFilterWatcherProps {
  filter: RangeFilterBuilder;
  delay?: number;
  replace?: boolean;
}

export interface QueryParam {
  key: string;
  callback?: (value: string) => void;
  defaultValue?: ParamValue;
  value?: ParamValue;
}

export interface ParamWatcherProps {
  queryParam: QueryParam;
  delay?: number;
  replace?: boolean;
}

export interface SyncStateQueryParamsProps {
  delay?: number;
  replace?: boolean;
  extendedParams?: QueryParam[];
}
