export type FunctionArguments<T> = T extends (...args: infer R) => any ? R : never;

export function callAllHandlers<T extends (event: any) => void>(...fns: (T | undefined)[]) {
  return (event: FunctionArguments<T>[0]) => {
    fns.some(fn => {
      if (fn) {
        fn(event);
      }
      return event && event.defaultPrevented;
    });
  };
}
