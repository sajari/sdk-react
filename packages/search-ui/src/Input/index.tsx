/* eslint-disable @typescript-eslint/naming-convention */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Combobox } from '@sajari/react-components';
import { useQuery, useSearch } from '@sajari/react-hooks';
import { __DEV__ } from '@sajari/react-sdk-utils';
import { Result as ResultResp } from '@sajari/sdk-js';
import React from 'react';

import Result from '../Results/Result';
import useInputStyles from './styles';
import { InputProps } from './types';

const Input = React.forwardRef((props: InputProps<any>, ref: React.Ref<HTMLInputElement>) => {
  const { placeholder = 'Search', mode = 'standard', ...rest } = props;
  const { searchInstant, suggestions = [], results = [], search } = useSearch();
  const { query } = useQuery();

  return (
    <Combobox
      {...rest}
      ref={ref}
      placeholder={placeholder}
      mode={mode}
      items={mode === 'suggestions' ? suggestions : results.splice(0, 5)}
      itemToString={
        mode === 'suggestions' ? (item: string) => item : (item: ResultResp) => item?.values.title.toString()
      }
      value={query}
      onChange={(value) => {
        if (mode === 'suggestions') {
          if (searchInstant) {
            searchInstant(value);
          }
        } else {
          search(value);
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
          ? ({ item, getItemProps, selected }) => {
              const {
                values: { category, description, image, price, rating, title, url },
                token,
              } = item as ResultResp;
              const styles = useInputStyles({ selected });

              return (
                <div {...getItemProps({ item })} css={styles.item}>
                  <Result
                    token={token}
                    title={title.toString()}
                    url={url.toString()}
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
