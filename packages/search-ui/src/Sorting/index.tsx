/* eslint-disable react/no-array-index-key */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useId } from '@reach/auto-id';
import { Label, Select } from '@sajari/react-components';
import { useSorting } from '@sajari/react-hooks';
import { __DEV__ } from '@sajari/react-sdk-utils';
import { FC } from 'react';
import tw from 'twin.macro';

import { SortingProps, SortOption } from './types';

const defaultOptions: SortOption[] = [{ name: 'Most relevant', value: '' }];

const Sorting: FC<SortingProps> = ({ label = 'Sort', options = defaultOptions }) => {
  const { sorting, setSorting } = useSorting();
  const id = `sorting-${useId()}`;

  return (
    <div css={tw`flex items-center space-x-4`}>
      <Label htmlFor={id} css={tw`text-sm text-gray-500`}>
        {label}
      </Label>
      <Select id={id} value={sorting} onChange={(e) => setSorting(e.target.value)} size="sm">
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
  Sorting.displayName = 'Sorting';
}

export default Sorting;
export type { SortingProps };
