/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Combobox } from '@sajari/react-components';
import { useAutocomplete, useQuery, useSearchContext } from '@sajari/react-hooks';
import { __DEV__ } from '@sajari/react-sdk-utils';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { ResultValues } from '../Results/types';
import mapResultFields from '../utils/mapResultFields';
import { InputProps } from './types';

const Input = React.forwardRef((props: InputProps<any>, ref: React.Ref<HTMLInputElement>) => {
  const { t } = useTranslation();
  const { placeholder = t('input.placeholder'), mode = 'instant', onChange, ...rest } = props;
  const { results: rawResults, search, searching, fields } = useSearchContext();
  const results = React.useMemo(() => mapResultFields<ResultValues>(rawResults ?? [], fields), [rawResults]);
  const { search: searchInstant, completion, suggestions } = useAutocomplete();
  const { query } = useQuery();
  let items: Array<any> = [];

  if (mode === 'suggestions') {
    items = suggestions;
  } else if (mode === 'results') {
    // only display 5 items
    items = results.splice(0, 5).map((result) => {
      const {
        values: { description, image, title, url },
        token,
      } = result;
      let clickToken: string | undefined;

      if (token && 'click' in token) {
        clickToken = token.click;
      }

      const link = clickToken || url.toString();
      return {
        title,
        url: link,
        description,
        image,
      };
    });
  }

  const onChangeMemoized = useCallback(
    (value) => {
      if (onChange) {
        onChange(value);
      }

      if (mode === 'suggestions' || mode === 'typeahead') {
        if (searchInstant) {
          searchInstant(value);
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
    />
  );
});

if (__DEV__) {
  Input.displayName = 'Input';
}

export default Input;
export type { InputProps };
