/* eslint-disable react/no-array-index-key */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useId } from '@reach/auto-id';
import { Label, Select } from '@sajari/react-components';
import { usePageSize } from '@sajari/react-hooks';
import { __DEV__ } from '@sajari/react-sdk-utils';
import React from 'react';
import tw from 'twin.macro';

import { PageSizeProps } from './types';

const defaultSizes = [10, 20, 35, 50, 100];

const PageSize: React.FC<PageSizeProps> = ({ label = 'Size', sizes = defaultSizes }) => {
  const { pageSize, setPageSize } = usePageSize();
  const id = `page-size-${useId()}`;

  return (
    <div css={tw`flex space-x-4`}>
      <Label htmlFor={id}>{label}</Label>
      <Select id={id} value={`${pageSize}`} onChange={(e) => setPageSize(parseInt(e.target.value, 10))}>
        {sizes.map((s, i) => (
          <option key={`${id}-option-${i}`} value={s}>
            {s}
          </option>
        ))}
      </Select>
    </div>
  );
};

if (__DEV__) {
  PageSize.displayName = 'PageSize';
}

export default PageSize;
export type { PageSizeProps };
