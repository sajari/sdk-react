import { isSSR } from '@sajari/react-sdk-utils';
import * as React from 'react';
import ResizeObserver from 'resize-observer-polyfill';

interface Size {
  width?: number;
  height?: number;
}

export default function useResizeObserver<T extends HTMLElement>(params: {
  ref: React.RefObject<T>;
  onResize?: (rect: DOMRectReadOnly) => void;
}) {
  const { onResize, ref } = params;
  const resizeObserverRef = React.useRef<ResizeObserver>();
  const didUnmount = React.useRef(false);
  const [size, setSize] = React.useState<Size>({});

  React.useEffect(() => {
    if (!isSSR() && ref.current) {
      // Initialising the RO instance
      if (!resizeObserverRef.current) {
        // Saving a single instance, used by the hook from this point on.
        resizeObserverRef.current = new ResizeObserver((entries) => {
          if (!Array.isArray(entries)) {
            return;
          }

          // Since we only observe the one element, we don't need to loop over the array
          if (!entries.length) {
            return;
          }

          const entry = entries[0];
          const contentRect = entry.contentRect as DOMRectReadOnly;

          if (onResize) {
            onResize(contentRect);
          } else {
            const { height, width } = contentRect;
            setSize({ height, width });
          }
        });
      }

      resizeObserverRef.current.observe(ref.current);
    }

    return () => {
      didUnmount.current = true;

      if (ref.current && resizeObserverRef.current) {
        resizeObserverRef.current.unobserve(ref.current);
      }
    };
  }, []);

  return React.useMemo(() => size, [JSON.stringify(size)]);
}
