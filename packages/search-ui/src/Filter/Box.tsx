/** @jsx jsx */
import { jsx } from '@emotion/core';

import { useSearchUIContext } from '../ContextProvider';
import Header from './Header';
import { BoxProps } from './types';

const Box = ({ children, ...headerProps }: BoxProps) => {
  const { customClassNames } = useSearchUIContext();

  return (
    <div className={customClassNames.filter?.box}>
      <Header {...headerProps} />
      {children}
    </div>
  );
};

export default Box;
