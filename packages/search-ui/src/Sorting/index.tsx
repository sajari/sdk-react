/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useId } from '@reach/auto-id';
import React, { useEffect } from 'react';
import { Select, Label } from '@sajari/react-components';
import { useQuery, useSearchContext, useSorting } from '@sajari/react-hooks';
import { __DEV__ } from 'sajari-react-sdk-utils';
import tw from 'twin.macro';
import { SortingProps, SortOption } from './types';

const defaultOptions: SortOption[] = [{ name: 'Most relavant', value: '' }];

const Sorting: React.FC<SortingProps> = ({ searchOnChange = true, label = 'Sort', options = defaultOptions }) => {
  const { search } = useSearchContext();
  const { query } = useQuery();
  const { sorting, setSorting } = useSorting();
  const id = `sorting-composition-${useId()}`;

  useEffect(() => {
    if (searchOnChange) {
      search(query);
    }
  }, [sorting]);

  return (
    <div css={tw`flex space-x-4`}>
      <Label htmlFor={id}>{label}</Label>
      <Select id={id} value={sorting} onChange={(e) => setSorting(e.target.value)}>
        {options.map((s, i) => (
          <option key={`${id}-option-${i}`} value={s.value}>
            {s.name}
          </option>
        ))}
      </Select>
    </div>
  );
};

if (__DEV__) {
  Sorting.displayName = 'SortingComposition';
}

export default Sorting;
export type { SortingProps };
