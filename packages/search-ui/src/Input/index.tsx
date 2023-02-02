/* eslint-disable @typescript-eslint/no-explicit-any */
import { Combobox } from '@sajari/react-components';
import { useAutocomplete, useQuery, useSearchContext } from '@sajari/react-hooks';
import { __DEV__, arraysEqual, isArray, isEmpty, mergeRefs } from '@sajari/react-sdk-utils';
import classnames from 'classnames';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useSearchUIContext } from '../ContextProvider';
import { ResultValues } from '../Results/types';
import mapResultFields from '../utils/mapResultFields';
import { InputProps } from './types';

const Input = React.forwardRef((props: InputProps<any>, ref: React.ForwardedRef<HTMLInputElement>) => {
  const { t } = useTranslation('input');
  const {
    placeholder = t('placeholder'),
    mode = 'instant',
    onSelect,
    onKeyDown,
    onChange,
    maxSuggestions = mode === 'results' ? 5 : 10,
    disableRedirects = mode === 'results' || mode === 'instant',
    className,
    retainFilters = false,
    minimumCharacters: minimumCharactersProp = 0,
    ...rest
  } = props;
  const minimumCharacters = Math.max(0, minimumCharactersProp);
  const { results: rawResults, search: searchFunc, searching, fields, resetFilters } = useSearchContext();
  const results = React.useMemo(() => mapResultFields<ResultValues>(rawResults ?? [], fields), [rawResults]);
  const {
    search: searchAutocompleteFunc,
    completion,
    suggestions,
    redirects,
    searching: autocompleteSearching,
    response,
  } = useAutocomplete();
  const redirectsRef = useRef(redirects);
  redirectsRef.current = redirects;
  const { customClassNames, disableDefaultStyles = false, tracking } = useSearchUIContext();
  const { query } = useQuery();
  const [internalSuggestions, setInternalSuggestions] = useState<Array<any>>([]);
  const [items, setItems] = useState(internalSuggestions);
  const lastItems = useRef(items);
  const localRef = useRef<HTMLInputElement>(null);
  const inputRef = mergeRefs(ref, localRef);
  const lastValue = useRef(query);
  const searchDebounceRef = useRef(0);
  const qOriginal = response?.getValues()?.get('q.original');
  const responseQuery = useRef(qOriginal);
  responseQuery.current = qOriginal;

  const searchValue = useCallback(
    (value: string, bypass = false) => {
      window.clearTimeout(searchDebounceRef.current);
      if (value.length >= minimumCharacters || isEmpty(value) || bypass) {
        if (!retainFilters) {
          resetFilters();
        }
        // cannot use useDebounce because we want to always clear timeout but not always trigger the debounce function
        // this is to fix the bug where deleting multiple characters and then immediately start typing and the input value got magically removed because the remove debounce function is still running
        // backspace
        if (lastValue.current.length > value.length && !bypass) {
          searchDebounceRef.current = window.setTimeout(() => {
            searchFunc(value);
          }, 300);
        } else {
          searchFunc(value);
        }
        lastValue.current = value;
      }
    },
    [searchFunc, minimumCharacters, retainFilters, resetFilters],
  );

  const searchAutocomplete = useCallback(
    (value: string) => {
      if (value.length >= minimumCharacters) {
        searchAutocompleteFunc(value);
      }
    },
    [searchAutocompleteFunc, minimumCharacters, retainFilters, resetFilters],
  );

  useEffect(() => {
    if (mode === 'suggestions') {
      setInternalSuggestions([...suggestions].splice(0, maxSuggestions));
    } else if (mode === 'results') {
      setInternalSuggestions(
        results.splice(0, maxSuggestions).map((result) => {
          const { values, token } = result;
          const { description, image, title } = values;
          const url = tracking.getResultHref(values, token);
          const onClick = () => tracking.onResultClick(values, token);

          return {
            title,
            url,
            onClick,
            description,
            image: isArray(image) ? image[0] : image,
          };
        }),
      );
    }
  }, [mode, suggestions, maxSuggestions, results, tracking]);

  useEffect(() => {
    if (!arraysEqual(lastItems.current, internalSuggestions)) {
      setItems(internalSuggestions);
      lastItems.current = internalSuggestions;
    } else {
      lastItems.current = items;
    }
  }, [internalSuggestions, minimumCharacters]);

  const onChangeMemoized = useCallback(
    (value: string) => {
      if (onChange) {
        onChange(value);
      }

      if (value.length < minimumCharacters) {
        setItems([]);
      }

      if (mode === 'suggestions' || mode === 'typeahead') {
        if (searchAutocomplete) {
          searchAutocomplete(value);
        }
      } else if (mode === 'instant' || mode === 'results') {
        searchValue(value);
      }
    },
    [onChange, mode, searchValue, minimumCharacters],
  );

  const onVoiceInput = useCallback(
    (value) => {
      if (onChange) {
        onChange(value);
      }

      if (value.length < minimumCharacters) {
        setItems([]);
      }

      searchValue(value);
    },
    [searchValue, onChange],
  );

  const submitForm = useCallback(() => {
    const input = localRef.current;
    if (input) {
      const wrappingForm = input.closest('form');
      if (typeof wrappingForm?.requestSubmit === 'function') {
        wrappingForm.requestSubmit();
        return;
      }
      wrappingForm?.submit();
    }
  }, []);

  const onKeyDownMemoized = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      const input = e.target as HTMLInputElement;
      const { value } = e.currentTarget;
      if (e.key === 'Enter' && !input.hasAttribute('readonly')) {
        const closestForm = input.closest('form');
        // Set input to readonly, but only if the input is not wrapped by any form, otherwise the submit event won't be triggered
        if (closestForm === null) {
          input.setAttribute('readonly', '');
        }
        if (['typeahead', 'suggestions', 'standard'].includes(mode)) {
          if (!retainFilters) {
            resetFilters();
          }
          const redirectValue = redirectsRef.current[responseQuery.current ?? value];
          if (!disableRedirects && redirectValue) {
            tracking.onRedirect(redirectValue);
            window.location.assign(redirectValue.token || redirectValue.target);
            e.preventDefault();
          } else if (!disableRedirects && autocompleteSearching) {
            // If we're performing an autocomplete search, wait a tick to recheck redirects before unloading
            e.preventDefault();
            setTimeout(() => {
              const redirectTarget = redirectsRef.current[responseQuery.current ?? value];
              if (redirectTarget) {
                tracking.onRedirect(redirectTarget);
                window.location.assign(redirectTarget.token || redirectTarget.target);
              } else if (onKeyDown) {
                onKeyDown(e);
                // since we've prevented default above, we should fulfil the default behaviour.
                submitForm();
              }
            }, 400);
          } else if (onKeyDown) {
            onKeyDown(e);
          }
        }
        if (!['results'].includes(mode)) {
          searchValue(value, true);
        }
      }
    },
    [mode, searchValue, onKeyDown, autocompleteSearching, disableRedirects, tracking],
  );

  const onSelectMemoized = useCallback(
    (item) => {
      const redirectValue = redirectsRef.current[item];
      if (!disableRedirects && redirectValue) {
        tracking.onRedirect(redirectValue);
        window.location.assign(redirectValue.token || redirectValue.target);
        return;
      }
      if (onSelect) {
        onSelect(item);
      }
      if (mode === 'suggestions') {
        searchValue(item as string);
      }
    },
    [mode, searchValue, tracking],
  );

  useEffect(() => {
    return () => {
      window.clearTimeout(searchDebounceRef.current);
    };
  }, []);

  useEffect(() => {
    if (!searching && localRef.current) {
      localRef.current.removeAttribute('readonly');
    }
  }, [searching]);

  return (
    <Combobox
      {...rest}
      ref={inputRef}
      placeholder={placeholder}
      mode={mode as Exclude<InputProps<any>['mode'], 'instant'>}
      onVoiceInput={onVoiceInput}
      items={items}
      completion={mode === 'typeahead' ? completion : ''}
      value={query}
      loading={searching}
      onChange={onChangeMemoized}
      onKeyDown={onKeyDownMemoized}
      onSelect={onSelectMemoized}
      className={classnames(customClassNames.input?.container, className)}
      dropdownClassName={customClassNames.input?.dropdown}
      dropdownFooterClassName={customClassNames.input?.dropdownFooter}
      dropdownHighlightItemClassName={customClassNames.input?.dropdownHighlightItem}
      dropdownSelectedItemClassName={customClassNames.input?.dropdownSelectedItem}
      dropdownItemClassName={customClassNames.input?.dropdownItem}
      dropdownListClassName={customClassNames.input?.dropdownList}
      inputClassName={customClassNames.input?.input}
      inputContainerClassName={customClassNames.input?.inputContainer}
      resultClassName={customClassNames.input?.result}
      resultImageContainerClassName={customClassNames.input?.resultImageContainer}
      resultTextContainerClassName={customClassNames.input?.resultTextContainer}
      selectedResultClassName={customClassNames.input?.selectedResult}
      typeaheadClassName={customClassNames.input?.typeahead}
      voiceInputClassName={customClassNames.input?.voiceInput}
      disableDefaultStyles={disableDefaultStyles}
    />
  );
});

if (__DEV__) {
  Input.displayName = 'Input';
}

export default Input;
export type { InputProps };
