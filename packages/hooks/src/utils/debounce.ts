export default function debounce<F extends (...args: any[]) => void>(
  func: F,
  waitMilliseconds = 50,
  options = {
    isImmediate: false,
  },
): F {
  let timeoutId: number | undefined;

  // eslint-disable-next-line func-names
  return function (this: any, ...args: any[]) {
    const context = this;

    const doLater = () => {
      timeoutId = undefined;
      if (!options.isImmediate) {
        func.apply(context, args);
      }
    };

    const shouldCallNow = options.isImmediate && timeoutId === undefined;

    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }

    // @ts-ignore
    timeoutId = setTimeout(doLater, waitMilliseconds);

    if (shouldCallNow) {
      func.apply(context, args);
    }
  } as any;
}
