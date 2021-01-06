import { Box as CoreBox } from '@sajari/react-components';
import * as React from 'react';

import { useSearchUIContext } from '../ContextProvider';
import Header from './Header';
import { BoxProps } from './types';

const Box = React.forwardRef(({ children, ...headerProps }: BoxProps, ref: React.Ref<HTMLDivElement>) => {
  const { customClassNames } = useSearchUIContext();

  return (
    <CoreBox ref={ref} className={customClassNames.filter?.box}>
      <Header {...headerProps} />
      {children}
    </CoreBox>
  );
});

export default Box;
