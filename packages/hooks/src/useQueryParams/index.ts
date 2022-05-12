import { isSSR } from '@sajari/react-sdk-utils';
import { useCallback, useEffect, useState } from 'react';

import useDebounce from '../useDebounce';
import { ParamValue, UseQueryParamParams } from './types';

function useQueryParams(key: string, options?: UseQueryParamParams) {
  const { callback, defaultValue, debounce, replace = false } = options ?? {};
  const [internalValue, setInternalValue] = useState<ParamValue | undefined>(undefined);
  const debouncedValue = debounce ? useDebounce(internalValue, debounce) : internalValue;
  const getValue = () => (!isSSR() ? new URLSearchParams(window.location.search).get(key) ?? '' : '');

  const setInternalParam = (val?: ParamValue) => {
    if (typeof val === 'undefined') {
      return;
    }

    const url = new URL(window.location.href);
    const prevSearch = url.search;

    if ((!Array.isArray(val) && val && val !== defaultValue) || (Array.isArray(val) && val.length > 0)) {
      url.searchParams.set(key, val.toString());
    } else if (val?.toString().length === 0 || val === defaultValue || (Array.isArray(val) && val.length === 0)) {
      url.searchParams.delete(key);
    }

    if (prevSearch === url.search) {
      return;
    }

    if (replace) {
      window.history.replaceState(null, '', url.toString());
    } else {
      window.history.pushState(null, '', url.toString());
    }
  };

  // Handle new state
  const handler = () => {
    if (typeof callback === 'function') {
      callback(getValue());
    }
  };

  useEffect(() => {
    // Listen for popstate changes
    window.addEventListener('popstate', handler);

    // Clean up the event binding
    return () => {
      window.removeEventListener('popstate', handler);
    };
  }, []);

  useEffect(() => {
    setInternalParam(debouncedValue);
  }, [debouncedValue]);

  const setParam = useCallback((val?: ParamValue) => {
    setInternalValue(val);
  }, []);

  return setParam;
}

export default useQueryParams;
export * from './types';
