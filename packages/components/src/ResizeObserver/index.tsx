import { __DEV__, noop } from '@sajari/react-sdk-utils';
import * as React from 'react';

import Box from '../Box';
import { useResizeObserver } from '../hooks';
import { ResizeObserverProps } from './types';

const ResizeObserver = (props: ResizeObserverProps) => {
  const { onResize = noop, children, ...rest } = props;
  const { ref } = useResizeObserver({ onResize });

  return (
    <Box ref={ref} {...rest}>
      {children}
    </Box>
  );
};

if (__DEV__) {
  ResizeObserver.displayName = 'ResizeObserver';
}

export default ResizeObserver;
export type { ResizeObserverProps };
