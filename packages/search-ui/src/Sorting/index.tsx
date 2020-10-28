/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import { SortingProps, SortOption } from './types';
import { Select, Label } from '@sajari/react-components';
import { useSorting } from '@sajari/react-hooks';
import { __DEV__ } from 'sajari-react-sdk-utils';
import tw from 'twin.macro';
import { useId } from '@reach/auto-id';

const defaultOptions: SortOption[] = [{ name: 'Most relavant', value: '' }];

// TODO: incorparate search on change with `useQuery` hook
const Sorting: React.FC<SortingProps> = ({ searchOnChange = true, label = 'Sort', options = defaultOptions }) => {
  const { sorting, setSorting } = useSorting();
  const id = `sorting-composition-${useId()}`;

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
