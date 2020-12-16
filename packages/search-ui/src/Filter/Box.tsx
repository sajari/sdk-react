import { Box as CoreBox } from '@sajari/react-components';
import * as React from 'react';

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
