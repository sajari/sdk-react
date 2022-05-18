import { isArray, isEmpty, isNumber, isSSR } from '@sajari/react-sdk-utils';

import { combineFilters, FilterBuilder, Range, RangeFilterBuilder, Variables } from '../ContextProvider/controllers';
import { ProviderPipelineState, SyncURLState } from '../ContextProvider/types';

export function isRange(value: unknown) {
  return isArray(value) && value.length === 2 && isNumber(value[0]) && isNumber(value[1]);
}

export function rangeToParam(value: Range) {
  return value.join(':');
}

export function paramToRange(value: string) {
  return value.split(':').map(Number);
}

export function getSearchParams() {
  if (isSSR()) {
    return {};
  }
  const search: Record<string, string> = {};
  new URLSearchParams(window.location.search).forEach((value, key) => {
    search[key] = value;
  });
  return search;
}

export const initParam = ({
  filters,
  variables,
  searchState,
  autocompleteState,
  defaultFilter,
  syncURLState,
}: {
  filters: (FilterBuilder | RangeFilterBuilder)[];
  variables: Variables;
  searchState: ProviderPipelineState;
  autocompleteState: ProviderPipelineState;
  defaultFilter?: string;
  syncURLState?: SyncURLState;
}) => {
  const params = getSearchParams();

  if (syncURLState) {
    filters.forEach((filter) => {
      if (filter instanceof FilterBuilder) {
        const key = filter.getField() || filter.getName();
        const value = params[key] || '';
        filter.set(value ? value.split(',') : []);
      } else if (filter instanceof RangeFilterBuilder) {
        const key = filter.getField() || filter.getName();
        const value = params[key] || '';
        const initialRange = paramToRange(value);
        const limit = (params[`${key}_min_max`] || '').split(':').map(Number) as Range;
        if (isRange(initialRange)) {
          filter.set(initialRange as Range);
        }
        if (isRange(limit)) {
          filter.setMin(limit[0]);
          filter.setMax(limit[1]);
          // Freeze the state of the filterBuilder to avoid the UI from being overridden at the first response
          filter.setFrozen(true);
        }
      }
    });
  }

  const filter = combineFilters(filters ?? []);
  const variablesFilterString = variables.get().filter ?? '';
  const defaultFilterString = defaultFilter?.toString() ?? '';

  variables.set({
    filter: () => {
      const expression = filter.filter();
      return [defaultFilterString, variablesFilterString, isEmpty(expression) ? '_id != ""' : expression]
        .filter(Boolean)
        .join(' AND ');
    },
    countFilters: () => filter.countFilters(),
    buckets: () => filter.buckets(),
    count: () => filter.count(),
    min: () => filter.min(),
    max: () => filter.max(),
    ...(syncURLState
      ? {
          ...(params.show ? { resultsPerPage: params.show } : {}),
          ...(params.sort ? { sort: params.sort } : {}),
          ...(params[autocompleteState.config.qParam]
            ? { [autocompleteState.config.qParam]: params[autocompleteState.config.qParam] }
            : {}),
          ...(params[searchState.config.qParam]
            ? { [searchState.config.qParam]: params[searchState.config.qParam] }
            : {}),
        }
      : {}),
  });
};
