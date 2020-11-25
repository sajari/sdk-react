/** @jsx jsx */
import { jsx } from '@emotion/core';

import Header from './Header';
import { BoxProps } from './types';

const Box = ({ children, ...headerProps }: BoxProps) => {
  return (
    <div>
      <Header {...headerProps} />
      {children}
    </div>
  );
};

export default Box;
