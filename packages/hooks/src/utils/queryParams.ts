import { isArray, isNumber, isSSR } from '@sajari/react-sdk-utils';

import { FilterBuilder, Range, RangeFilterBuilder, Variables } from '../ContextProvider/controllers';

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

export const initFiltersFromURLState = ({
  filters,
  params,
}: {
  filters: (FilterBuilder | RangeFilterBuilder)[];
  params: Record<string, string>;
}) => {
  filters.forEach((filter) => {
    if (filter instanceof FilterBuilder) {
      const key = filter.getField() || filter.getName();
      const value = params[key];
      if (value) {
        filter.set(value.split(','));
      }
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
};

export const initVariableFromURLState = ({
  variables,
  mappingKeys,
  params,
}: {
  variables: Variables;
  mappingKeys: { paramKey: string; variableKey: string; defaultValue?: string }[];
  params: Record<string, string>;
}) => {
  const variableObj = {};
  mappingKeys.forEach(({ paramKey, variableKey, defaultValue }) => {
    if (params[paramKey]) {
      variableObj[variableKey] = params[paramKey] || defaultValue;
    }
  });
  variables.set(variableObj);
};
