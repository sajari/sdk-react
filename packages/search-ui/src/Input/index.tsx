/* eslint-disable @typescript-eslint/no-explicit-any */
import { Combobox } from '@sajari/react-components';
import { useAutocomplete, useQuery, useSearchContext } from '@sajari/react-hooks';
import { __DEV__, arraysEqual, isArray } from '@sajari/react-sdk-utils';
import classnames from 'classnames';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useSearchUIContext } from '../ContextProvider';
import { useClickTracking } from '../hooks';
import { ResultValues } from '../Results/types';
import mapResultFields from '../utils/mapResultFields';
import { InputProps } from './types';

const Input = React.forwardRef((props: InputProps<any>, ref: React.Ref<HTMLInputElement>) => {
  const { t } = useTranslation('input');
  const {
    placeholder = t('placeholder'),
    mode = 'instant',
    onSelect,
    onChange,
    maxSuggestions = mode === 'results' ? 5 : 10,
    className,
    retainFilters = false,
    minimumCharacters: minimumCharactersProp = 0,
    ...rest
  } = props;
  const minimumCharacters = Math.max(0, minimumCharactersProp);
  const { results: rawResults, search: searchFunc, searching, fields, resetFilters } = useSearchContext();
  const results = React.useMemo(() => mapResultFields<ResultValues>(rawResults ?? [], fields), [rawResults]);
  const { search: searchAutocompleteFunc, completion, suggestions } = useAutocomplete();
  const { customClassNames, disableDefaultStyles = false, tracking } = useSearchUIContext();
  const { query } = useQuery();
  const [internalSuggestions, setInternalSuggestions] = useState<Array<any>>([]);
  const [items, setItems] = useState(internalSuggestions);
  const lastItems = useRef(items);

  const search = useCallback(
    (value: string) => {
      if (value.length >= minimumCharacters) {
        if (!retainFilters) {
          resetFilters();
        }

        searchFunc(value);
      }
    },
    [searchFunc, minimumCharacters, retainFilters, resetFilters],
  );

  const searchAutocomplete = useCallback(
    (value: string) => {
      if (value.length >= minimumCharacters) {
        if (!retainFilters) {
          resetFilters();
        }

        searchAutocompleteFunc(value);
      }
    },
    [searchAutocompleteFunc, minimumCharacters, retainFilters, resetFilters],
  );

  useEffect(() => {
    if (mode === 'suggestions') {
      setInternalSuggestions(suggestions.splice(0, maxSuggestions));
    } else if (mode === 'results') {
      setInternalSuggestions(
        results.splice(0, maxSuggestions).map((result) => {
          const { values, token } = result;
          const { description, image, title } = values;
          const { href, onClick } = useClickTracking({ tracking, values, token });

          return {
            title,
            url: href,
            onClick,
            description,
            image: isArray(image) ? image[0] : image,
          };
        }),
      );
    }
  }, [mode, suggestions, maxSuggestions, results, useClickTracking, tracking]);

  useEffect(() => {
    if (!arraysEqual(lastItems.current, internalSuggestions)) {
      setItems(internalSuggestions);
      lastItems.current = internalSuggestions;
    } else {
      lastItems.current = items;
    }
  }, [internalSuggestions, minimumCharacters]);

  const onChangeMemoized = useCallback(
    (value) => {
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
        search(value);
      }
    },
    [onChange, mode, search, minimumCharacters],
  );

  const onVoiceInput = useCallback(
    (value) => {
      if (onChange) {
        onChange(value);
      }

      if (value.length < minimumCharacters) {
        setItems([]);
      }

      search(value);
    },
    [search, onChange],
  );

  const onKeyDownMemoized = useCallback(
    (e) => {
      if (e.key === 'Enter' && (mode === 'typeahead' || mode === 'suggestions' || mode === 'standard')) {
        if (!retainFilters) {
          resetFilters();
        }
        search((e.target as HTMLInputElement).value);
      }
    },
    [mode, search],
  );

  const onSelectMemoized = useCallback(
    (item) => {
      if (onSelect) {
        onSelect(item);
      }
      if (mode === 'suggestions') {
        search(item as string);
      }
    },
    [mode, search],
  );

  return (
    <Combobox
      {...rest}
      ref={ref}
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
