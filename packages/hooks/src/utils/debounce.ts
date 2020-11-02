import { useRef } from 'react';

export default function useDebounce<F extends (...args: any[]) => void>(
  func: F,
  waitMilliseconds = 50,
  options = {
    isImmediate: false,
  },
): F {
  const timeoutIdRef = useRef<ReturnType<typeof setTimeout>>();

  // eslint-disable-next-line func-names
  return function (this: any, ...args: any[]) {
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }
    const context = this;

    const doLater = () => {
      timeoutIdRef.current = undefined;
      if (!options.isImmediate) {
        func.apply(context, args);
      }
    };

    const shouldCallNow = options.isImmediate && timeoutIdRef.current === undefined;

    timeoutIdRef.current = setTimeout(doLater, waitMilliseconds);

    if (shouldCallNow) {
      func.apply(context, args);
    }
  } as any;
}
