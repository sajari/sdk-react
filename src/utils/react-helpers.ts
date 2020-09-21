type ReactRef<T> =
  | React.Ref<T>
  | React.RefObject<T>
  | React.MutableRefObject<T>;

export function setRef<T = any>(ref: React.Ref<T> = null, value: T) {
  if (!ref) {
    return;
  }

  if (typeof ref === "function") {
    ref(value);
  } else {
    // eslint-disable-next-line no-param-reassign
    (ref as React.MutableRefObject<T>).current = value;
  }
}

export function assignRef(ref: React.Ref<HTMLElement>, value: HTMLElement) {
  if (ref == null) {
    return;
  }

  try {
    setRef(ref, value);
  } catch (error) {
    throw new Error(`Cannot assign value "${value}" to ref "${ref}"`);
  }
}

/**
 * Combine multiple React refs into a single ref function.
 * This is used mostly when you need to allow consumers forward refs to
 * internal components
 *
 * @param refs refs to assign to value to
 */
export function mergeRefs<T>(...refs: Array<ReactRef<T> | undefined>) {
  return (value: T) => {
    // @ts-ignore
    refs.forEach(ref => assignRef(ref, value));
  };
}
