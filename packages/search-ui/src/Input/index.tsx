/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Combobox } from '@sajari/react-components';
import { useAutocomplete, useQuery, useSearch, useSearchContext } from '@sajari/react-hooks';
import { __DEV__ } from '@sajari/react-sdk-utils';
import React from 'react';

import { ResultValues } from '../Results/types';
import mapResultFields from '../utils/mapResultFields';
import { InputProps } from './types';

const Input = React.forwardRef((props: InputProps<any>, ref: React.Ref<HTMLInputElement>) => {
  const { placeholder = 'Search', mode = 'instant', onChange, ...rest } = props;
  const { fields } = useSearchContext();
  const { results: rawResults, search, searching } = useSearch({ allowEmptySearch: false });
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
      onChange={(value) => {
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
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && (mode === 'typeahead' || mode === 'suggestions' || mode === 'standard')) {
          search((e.target as HTMLInputElement).value);
        }
      }}
      onSelect={
        mode === 'suggestions'
          ? (item) => {
              search(item as string);
            }
          : undefined
      }
    />
  );
});

if (__DEV__) {
  Input.displayName = 'Input';
}

export default Input;
export type { InputProps };
