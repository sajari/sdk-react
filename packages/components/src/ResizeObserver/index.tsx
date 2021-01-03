import { __DEV__, isSSR, noop } from '@sajari/react-sdk-utils';
import * as React from 'react';
import Observer from 'resize-observer-polyfill';

import Box from '../Box';
import { ResizeObserverProps } from './types';

const ResizeObserver = (props: ResizeObserverProps) => {
  const { onReady = noop, onResize = noop, children, ...rest } = props;
  const ref = React.useRef<HTMLDivElement>(null);
  const observer = React.useRef<Observer>();
  const animationFrameIds: ReturnType<typeof requestAnimationFrame>[] = [];

  React.useEffect(() => {
    if (!isSSR() && Observer && ref.current) {
      const target = ref.current;

      onReady(target);

      observer.current = new Observer((entries: ResizeObserverEntry[]) => {
        entries.forEach((entry) => {
          animationFrameIds.push(
            requestAnimationFrame(() => onResize(entry.contentRect as DOMRectReadOnly, entries, target)),
          );
        });
      });

      observer.current.observe(target);
    }

    return () => {
      observer.current?.disconnect();
    };
  }, []);

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
