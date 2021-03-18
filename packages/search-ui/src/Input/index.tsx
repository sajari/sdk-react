/* eslint-disable @typescript-eslint/no-explicit-any */
import { Combobox } from '@sajari/react-components';
import { useAutocomplete, useQuery, useSearchContext } from '@sajari/react-hooks';
import { __DEV__, isArray } from '@sajari/react-sdk-utils';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { useSearchUIContext } from '../ContextProvider';
import { useClickTracking } from '../hooks';
import { ResultValues } from '../Results/types';
import mapResultFields from '../utils/mapResultFields';
import { InputProps } from './types';

const Input = React.forwardRef((props: InputProps<any>, ref: React.Ref<HTMLInputElement>) => {
  const { t } = useTranslation('input');
  const { placeholder = t('placeholder'), mode = 'instant', onSelect, onChange, maxSuggestions = 5, ...rest } = props;
  const { results: rawResults, search, searching, fields } = useSearchContext();
  const results = React.useMemo(() => mapResultFields<ResultValues>(rawResults ?? [], fields), [rawResults]);
  const { search: searchAutocomplete, completion, suggestions } = useAutocomplete();
  const { customClassNames, disableDefaultStyles = false, tracking } = useSearchUIContext();
  const { query } = useQuery();
  let items: Array<any> = [];

  if (mode === 'suggestions') {
    items = suggestions;
  } else if (mode === 'results') {
    items = results.splice(0, maxSuggestions).map((result) => {
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
    });
  }

  const onChangeMemoized = useCallback(
    (value) => {
      if (onChange) {
        onChange(value);
      }

      if (mode === 'suggestions' || mode === 'typeahead') {
        if (searchAutocomplete) {
          searchAutocomplete(value);
        }
      } else if (mode === 'instant' || mode === 'results') {
        search(value);
      }
    },
    [onChange, mode, search],
  );

  const onKeyDownMemoized = useCallback(
    (e) => {
      if (e.key === 'Enter' && (mode === 'typeahead' || mode === 'suggestions' || mode === 'standard')) {
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
      items={items}
      completion={mode === 'typeahead' ? completion : ''}
      value={query}
      loading={searching}
      onChange={onChangeMemoized}
      onKeyDown={onKeyDownMemoized}
      onSelect={onSelectMemoized}
      className={customClassNames.input?.container}
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
