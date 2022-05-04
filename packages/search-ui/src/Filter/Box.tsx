import { Box as CoreBox } from '@sajari/react-components';
import classnames from 'classnames';
import * as React from 'react';

import { useSearchUIContext } from '../ContextProvider';
import Header from './Header';
import { BoxProps } from './types';

const Box = React.forwardRef(
  ({ children, name, onReset, showReset, title, className, ...rest }: BoxProps, ref: React.Ref<HTMLDivElement>) => {
    const { customClassNames } = useSearchUIContext();

    return (
      <CoreBox ref={ref} className={classnames(customClassNames.filter?.box, className)} {...rest}>
        <Header name={name} onReset={onReset} showReset={showReset} title={title} />
        {children}
      </CoreBox>
    );
  },
);

export default Box;
