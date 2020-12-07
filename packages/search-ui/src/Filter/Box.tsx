/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Box as CoreBox } from '@sajari/react-components';

import { useSearchUIContext } from '../ContextProvider';
import Header from './Header';
import { BoxProps } from './types';

const Box = ({ children, ...headerProps }: BoxProps) => {
  const { customClassNames } = useSearchUIContext();

  return (
    <CoreBox className={customClassNames.filter?.box}>
      <Header {...headerProps} />
      {children}
    </CoreBox>
  );
};

export default Box;
