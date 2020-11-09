/** @jsx jsx */
import { jsx } from '@emotion/core';
import tw from 'twin.macro';

import Header from './Header';
import { BoxProps } from './types';

const Box = ({ children, ...headerProps }: BoxProps) => {
  return (
    <div css={tw`mb-4`}>
      <Header {...headerProps} />
      {children}
    </div>
  );
};

export default Box;
