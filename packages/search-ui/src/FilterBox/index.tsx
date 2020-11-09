/** @jsx jsx */
import { jsx } from '@emotion/core';
import tw from 'twin.macro';

import Header from './Header';
import { FilterBoxProps } from './types';

const FilterBox = ({ children, ...headerProps }: FilterBoxProps) => {
  return (
    <div css={tw`mb-4`}>
      <Header {...headerProps} />
      {children}
    </div>
  );
};

export default FilterBox;
