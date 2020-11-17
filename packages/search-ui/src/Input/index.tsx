/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Combobox } from '@sajari/react-components';
import { useAutocomplete, useQuery, useSearch, useTracking } from '@sajari/react-hooks';
import { __DEV__ } from '@sajari/react-sdk-utils';
import { Result as ResultResp } from '@sajari/sdk-js';
import React from 'react';

import { ResultView } from '../Results/Result';
import useInputStyles from './styles';
import { InputProps } from './types';

const Input = React.forwardRef((props: InputProps<any>, ref: React.Ref<HTMLInputElement>) => {
  const { placeholder = 'Search', mode = 'standard', onChange, ...rest } = props;
  const { results = [], search } = useSearch({ allowEmptySearch: false });
  const { search: searchInstant, completion, suggestions } = useAutocomplete();
  const { query } = useQuery();
  let items: Array<any> = [];

  if (mode === 'suggestions') {
    items = suggestions;
  } else if (mode !== 'typeahead') {
    // only display 5 items
    items = results.splice(0, 5);
  }

  const { handleResultClicked } = useTracking();

  return (
    <Combobox
      {...rest}
      ref={ref}
      placeholder={placeholder}
      mode={mode}
      items={items}
      itemToString={
        mode === 'suggestions' ? (item: string) => item : (item: ResultResp) => item?.values.title.toString()
      }
      completion={mode === 'typeahead' ? completion : ''}
      value={query}
      onChange={(value) => {
        if (onChange) {
          onChange(value);
        }

        if (!value) {
          return;
        }
        if (mode === 'suggestions' || mode === 'typeahead') {
          if (searchInstant) {
            searchInstant(value);
          }
        } else {
          search(value);
        }
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && mode === 'typeahead') {
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
      itemToUrl={(item: ResultResp) => item.values.url.toString()}
      renderItem={
        mode === 'results'
          ? ({ item, getItemProps, selected, index }) => {
              const {
                values: { category, description, image, price, rating, title, url },
                token,
              } = item as ResultResp;
              const styles = useInputStyles({ selected });
              let clickToken: string | undefined;
              if (token && 'click' in token) {
                clickToken = token.click;
              }

              return (
                <div
                  {...getItemProps({
                    item,
                    index,
                    onKeyDown: (e) => {
                      if (e.key === 'Enter' && url) {
                        window.location.href = url.toString();
                      }
                    },
                    onClick: () => {
                      const link = clickToken || url.toString();
                      if (link) {
                        handleResultClicked(link);
                        window.location.href = url.toString();
                      }
                    },
                  })}
                  css={styles.item}
                >
                  <ResultView
                    title={title.toString()}
                    url={clickToken || url.toString()}
                    category={category?.toString()}
                    description={description.toString()}
                    image={image.toString()}
                    price={price?.toString()}
                    rating={Number(rating)}
                  />
                </div>
              );
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
