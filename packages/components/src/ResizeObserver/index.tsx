import { __DEV__, noop } from '@sajari/react-sdk-utils';
import * as React from 'react';

import Box from '../Box';
import { useResizeObserver } from '../hooks';
import { ResizeObserverProps } from './types';

const ResizeObserver = (props: ResizeObserverProps) => {
  const { onReady = noop, onResize = noop, children, ...rest } = props;
  const ref = React.useRef<HTMLDivElement>(null);

  const resizeHandler = (rect: DOMRectReadOnly) => {
    if (ref.current) {
      onResize(rect, ref.current);
    }
  };

  React.useEffect(() => {
    if (ref.current) {
      onReady(ref.current);
    }
  }, []);

  useResizeObserver({ ref, onResize: resizeHandler });

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
