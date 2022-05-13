import { FilterBuilder, RangeFilterBuilder } from '../ContextProvider';
import { ParamValue } from '../useQueryParams';

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

export interface URLStateSyncProps {
  delay?: number;
  replace?: boolean;
  extendedParams?: QueryParam[];
}
